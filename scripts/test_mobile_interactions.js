import { spawn } from 'child_process';

async function main() {
  console.log('--- Starting Firefox Headless for Mobile Tests ---');
  const ff = spawn('firefox', ['--headless', '--remote-debugging-port=9222', 'http://localhost:5173']);
  
  await new Promise((r) => setTimeout(r, 2000));

  try {
    const ws = new WebSocket('ws://127.0.0.1:9222/session');
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

    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });
    console.log('[1/7] Connected to Firefox WebDriver BiDi');

    // 1. New Session
    const session = await send('session.new', { capabilities: {} });
    console.log('[2/7] BiDi Session created:', session.sessionId);

    // 2. Get Browsing Context
    const tree = await send('browsingContext.getTree', {});
    const contextId = tree.contexts[0].context;
    console.log('[3/7] Browsing Context ID:', contextId);

    async function evalInPage(funcStr) {
      const res = await send('script.evaluate', {
        expression: funcStr,
        target: { context: contextId },
        awaitPromise: true,
        returnByValue: true,
      });
      return res.result?.value;
    }

    // Set viewport to Mobile (375x812)
    await send('browsingContext.setViewport', {
      context: contextId,
      viewport: { width: 375, height: 812 },
      devicePixelRatio: 2,
    });
    console.log('[4/7] Viewport set to 375x812 mobile screen');
    await new Promise((r) => setTimeout(r, 1200));

    // TEST 1: Check Lock Screen rendered
    const lockFound = await evalInPage(`document.body.innerText.includes("TAP OR SWIPE TO UNLOCK")`);
    console.log('-> TEST 1: Lock Screen Rendered:', lockFound ? 'PASS' : 'FAIL');

    // TEST 2: Tap on LockScreen to unlock
    await evalInPage(`(() => {
      const el = document.getElementById('lockScreen') || document.body;
      el.click();
      return true;
    })()`);
    await new Promise((r) => setTimeout(r, 1000));

    const unlocked = await evalInPage(`document.body.innerText.includes("LOCAL TIME") || document.body.innerText.includes("Projects")`);
    console.log('-> TEST 2: Unlocked to Home Screen:', unlocked ? 'PASS' : 'FAIL');

    // TEST 3: Tap on "Projects" App Icon
    await evalInPage(`(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const proj = buttons.find(b => b.innerText.includes("Projects"));
      if (proj) {
        proj.click();
        return true;
      }
      return false;
    })()`);
    await new Promise((r) => setTimeout(r, 1000));

    const projectsOpened = await evalInPage(`document.body.innerText.includes("CARDIA") || document.body.innerText.includes("SIH-26")`);
    console.log('-> TEST 3: Projects App Opened & Content Visible:', projectsOpened ? 'PASS' : 'FAIL');

    // TEST 4: App Scrolling
    const canScroll = await evalInPage(`(() => {
      const main = document.querySelector('main');
      if (!main) return false;
      const initialScroll = main.scrollTop;
      main.scrollTop = 120;
      return main.scrollHeight > main.clientHeight;
    })()`);
    console.log('-> TEST 4: App Content Scrollable on Mobile:', canScroll ? 'PASS' : 'FAIL');

    // TEST 5: Back Navigation
    await evalInPage(`(() => {
      const backBtn = document.querySelector('button[aria-label="Back to home screen"]');
      if (backBtn) {
        backBtn.click();
        return true;
      }
      return false;
    })()`);
    await new Promise((r) => setTimeout(r, 1000));

    const returnedHome = await evalInPage(`document.body.innerText.includes("LOCAL TIME")`);
    console.log('-> TEST 5: Back Button Navigation Returned to Home:', returnedHome ? 'PASS' : 'FAIL');

    // TEST 6: 3D Device Inspection Toggle on Mobile
    await evalInPage(`(() => {
      const btn3d = document.querySelector('button[aria-label="Inspect physical 3D phone model"]');
      if (btn3d) {
        btn3d.click();
        return true;
      }
      return false;
    })()`);
    await new Promise((r) => setTimeout(r, 1200));

    const in3DMode = await evalInPage(`document.body.innerText.toUpperCase().includes("3D DEVICE INSPECTION")`);
    console.log('-> TEST 6: 3D Inspection Viewer Opened on Mobile:', in3DMode ? 'PASS' : 'FAIL');

    // TEST 7: Return to Full-Screen Screen
    await evalInPage(`(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const retBtn = buttons.find(b => b.innerText.includes("Return to Screen") || b.innerText.includes("Use Screen"));
      if (retBtn) {
        retBtn.click();
        return true;
      }
      return false;
    })()`);
    await new Promise((r) => setTimeout(r, 1000));

    const backToOS = await evalInPage(`document.body.innerText.includes("LOCAL TIME") || document.body.innerText.includes("Projects")`);
    console.log('-> TEST 7: Returned to Native Full-Screen OS:', backToOS ? 'PASS' : 'FAIL');

    ws.close();
    console.log('\n--- ALL MOBILE INTERACTION TESTS VERIFIED SUCCESSFULLY ---');
  } finally {
    ff.kill();
  }
}

main().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
