import { spawn } from 'child_process';
import fs from 'fs';

async function main() {
  console.log('--- Capturing Current Views from dev server (5173) ---');
  const targetDir = '/home/yasar/.gemini/antigravity/brain/ac810cd6-f39e-4da6-9062-69ba66975d2a/debug_views';
  fs.mkdirSync(targetDir, { recursive: true });

  const profileDir = `/tmp/ff_capture_${Date.now()}`;
  fs.mkdirSync(profileDir, { recursive: true });
  const ff = spawn('firefox', [
    '--no-remote',
    '--headless',
    '--profile', profileDir,
    '--remote-debugging-port=9229',
    'http://localhost:5173'
  ]);
  await new Promise((r) => setTimeout(r, 2500));

  let ws;
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      ws = new WebSocket('ws://127.0.0.1:9229/session');
      await new Promise((res, rej) => {
        ws.onopen = res;
        ws.onerror = rej;
      });
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  try {
    let msgId = 1;
    const pending = new Map();

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(data);
        else resolve(data.result);
      }
    };

    await send('session.new', { capabilities: {} });
    const tree = await send('browsingContext.getTree', {});
    const contextId = tree.contexts[0].context;

    async function evalCode(expression) {
      const res = await send('script.evaluate', {
        expression,
        target: { context: contextId },
        awaitPromise: true,
        returnByValue: true,
      });
      return res.result?.value;
    }

    await send('browsingContext.setViewport', {
      context: contextId,
      viewport: { width: 1440, height: 900 },
      devicePixelRatio: 2,
    });
    await new Promise((r) => setTimeout(r, 2200));

    // 1. Capture Front Lock View
    console.log('Capturing Front Lock View...');
    const ssLock = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync(`${targetDir}/current_lock.png`, Buffer.from(ssLock.data, 'base64'));

    // 2. Unlock Phone
    console.log('Unlocking Phone...');
    await evalCode(`(() => {
      const ls = document.getElementById('lockScreen');
      if (ls) ls.click();
    })()`);
    await new Promise((r) => setTimeout(r, 1200));

    // 3. Capture Front Home View Unlocked
    console.log('Capturing Front Home View...');
    const ssHome = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync(`${targetDir}/current_home.png`, Buffer.from(ssHome.data, 'base64'));

    // 4. Click Inspect Rear
    console.log('Clicking Inspect Rear...');
    await evalCode(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const flipBtn = btns.find(b => b.innerText && b.innerText.includes('Inspect rear'));
      if (flipBtn) flipBtn.click();
    })()`);
    await new Promise((r) => setTimeout(r, 1500));

    // 5. Capture Rear View
    console.log('Capturing Rear View...');
    const ssRear = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync(`${targetDir}/current_rear.png`, Buffer.from(ssRear.data, 'base64'));

    console.log('All views saved in', targetDir);
    ws.close();
  } finally {
    ff.kill();
  }
}

main().catch(console.error);
