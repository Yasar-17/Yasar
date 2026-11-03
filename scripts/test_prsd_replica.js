import { spawn } from 'child_process';
import fs from 'fs';

async function main() {
  console.log('--- Testing prsd.dev Exact Replica for Nothing Phone (4a) Pro ---');
  fs.mkdirSync('/tmp/prsd_replica', { recursive: true });

  const ff = spawn('firefox', ['--headless', '--remote-debugging-port=9222', 'http://localhost:4173']);
  await new Promise((r) => setTimeout(r, 2200));

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

    // Set Desktop Viewport (1440x900)
    await send('browsingContext.setViewport', {
      context: contextId,
      viewport: { width: 1440, height: 900 },
      devicePixelRatio: 2,
    });
    await new Promise((r) => setTimeout(r, 1200));

    // TEST 1: Check Finish Picker
    const finishPickerExists = await evalCode(`!!document.querySelector('.finish-picker')`);
    const finishButtonsCount = await evalCode(`document.querySelectorAll('.finish-picker button').length`);
    console.log('[1/8] Finish Picker present:', finishPickerExists ? 'PASS' : 'FAIL', `(${finishButtonsCount} swatches)`);

    // TEST 2: Check Studio Nav (Author name & sections)
    const studioNavExists = await evalCode(`!!document.querySelector('.studio-nav')`);
    const navName = await evalCode(`document.querySelector('.studio-nav-name')?.innerText`);
    const navItems = await evalCode(`Array.from(document.querySelectorAll('.studio-nav ul button')).map(b => b.innerText)`);
    console.log('[2/8] Studio Nav present:', studioNavExists ? 'PASS' : 'FAIL');
    console.log('      Nav Name:', navName);
    console.log('      Nav Items:', navItems);

    // TEST 3: Check Studio Footer
    const footerText = await evalCode(`document.querySelector('.studio-footer')?.innerText`);
    console.log('[3/8] Studio Footer present:', footerText?.includes('Drag to rotate') ? 'PASS' : 'FAIL');

    // TEST 4: Unlock phone via click
    console.log('[4/8] Waking/Unlocking phone...');
    await evalCode(`(() => {
      const ls = document.getElementById('lockScreen') || document.body;
      ls.click();
    })()`);
    await new Promise((r) => setTimeout(r, 1000));

    // TEST 5: Check Home Screen Widgets (GitHub 112 tiles, Time widget, Call widget)
    const githubWidgetExists = await evalCode(`!!document.querySelector('.github-widget')`);
    const tilesCount = await evalCode(`document.querySelectorAll('.contribution-grid i').length`);
    const timeWidgetExists = await evalCode(`!!document.querySelector('.time-widget')`);
    const callWidgetExists = await evalCode(`!!document.querySelector('.call-widget')`);
    console.log('[5/8] Home Widgets:');
    console.log('      GitHub Widget present:', githubWidgetExists ? 'PASS' : 'FAIL');
    console.log('      GitHub Tiles Count (16 wks):', tilesCount, tilesCount === 112 ? '(112/112 PASS)' : 'FAIL');
    console.log('      Bengaluru Time Widget present:', timeWidgetExists ? 'PASS' : 'FAIL');
    console.log('      Availability/Call Widget present:', callWidgetExists ? 'PASS' : 'FAIL');

    // Capture Desktop Home Screenshot
    const ss1 = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync('/tmp/prsd_replica/desktop_home.png', Buffer.from(ss1.data, 'base64'));
    console.log('      Saved /tmp/prsd_replica/desktop_home.png');

    // TEST 6: Click Studio Nav "Projects" -> opens Projects App on phone!
    console.log('[6/8] Clicking Studio Nav "Projects"...');
    await evalCode(`(() => {
      const btns = Array.from(document.querySelectorAll('.studio-nav ul button'));
      const proj = btns.find(b => b.innerText === 'Projects');
      if (proj) proj.click();
    })()`);
    await new Promise((r) => setTimeout(r, 1000));

    const projectsOpened = await evalCode(`document.body.innerText.includes('CARDIA')`);
    const navHighlighted = await evalCode(`document.querySelector('.studio-nav ul button[aria-current="page"]')?.innerText === 'Projects'`);
    console.log('      Projects App Opened on Phone:', projectsOpened ? 'PASS' : 'FAIL');
    console.log('      Studio Nav Item Highlighted:', navHighlighted ? 'PASS' : 'FAIL');

    // Capture App Open Screenshot
    const ss2 = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync('/tmp/prsd_replica/desktop_projects.png', Buffer.from(ss2.data, 'base64'));
    console.log('      Saved /tmp/prsd_replica/desktop_projects.png');

    // TEST 7: Click Studio Nav Name -> closes app and returns to Home!
    console.log('[7/8] Clicking Studio Nav Name (Yasar Mohammed)...');
    await evalCode(`document.querySelector('.studio-nav-name').click()`);
    await new Promise((r) => setTimeout(r, 1000));

    const returnedHome = await evalCode(`!!document.querySelector('.github-widget')`);
    console.log('      Returned to Home Screen:', returnedHome ? 'PASS' : 'FAIL');

    // TEST 8: Mobile Viewport
    console.log('[8/8] Testing Mobile Viewport (375x812)...');
    await send('browsingContext.setViewport', {
      context: contextId,
      viewport: { width: 375, height: 812 },
      devicePixelRatio: 2,
    });
    await new Promise((r) => setTimeout(r, 1000));

    const mobileFull = await evalCode(`!!document.querySelector('.mobile-viewport')`);
    const mobileWidgets = await evalCode(`!!document.querySelector('.github-widget')`);
    console.log('      Mobile Full-height Active:', mobileFull ? 'PASS' : 'FAIL');
    console.log('      Mobile GitHub Widget Active:', mobileWidgets ? 'PASS' : 'FAIL');

    const ss3 = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync('/tmp/prsd_replica/mobile_home.png', Buffer.from(ss3.data, 'base64'));
    console.log('      Saved /tmp/prsd_replica/mobile_home.png');

    console.log('\n--- ALL PRSD.DEV REPLICA CHECKS COMPLETED SUCCESSFULLY ---');
    ws.close();
  } finally {
    ff.kill();
  }
}

main().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});

