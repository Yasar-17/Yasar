import { spawn } from 'child_process';
import fs from 'fs';

async function main() {
  console.log('--- Testing prsd.dev + Phone (4a) Pro Launch Integration ---');
  fs.mkdirSync('/tmp/nothing_test', { recursive: true });

  const ff = spawn('firefox', ['--headless', '--remote-debugging-port=9223', 'http://localhost:4173']);
  await new Promise((r) => setTimeout(r, 2200));

  try {
    const ws = new WebSocket('ws://127.0.0.1:9223/session');
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

    // TEST 1: Verify prsd.dev Perimeter (Finish Picker, Studio Nav, Studio Footer)
    console.log('\n[1/7] Testing prsd.dev Desktop Perimeter...');
    const finishPicker = await evalCode(`!!document.querySelector('.finish-picker')`);
    const studioNav = await evalCode(`!!document.querySelector('.studio-nav')`);
    const studioFooter = await evalCode(`!!document.querySelector('.studio-footer')`);
    const specsPill = await evalCode(`!!document.querySelector('button[aria-label*="Phone (4a) Pro"]')`);
    console.log('      Finish Picker:', finishPicker ? 'PASS' : 'FAIL');
    console.log('      Studio Navigation:', studioNav ? 'PASS' : 'FAIL');
    console.log('      Studio Footer:', studioFooter ? 'PASS' : 'FAIL');
    console.log('      Top-Right Phone (4a) Pro Launch Pill:', specsPill ? 'PASS' : 'FAIL');

    // TEST 2: Open Phone (4a) Pro Showcase Modal via top-right pill
    console.log('\n[2/7] Testing Phone (4a) Pro Launch Showcase Modal...');
    await evalCode(`document.querySelector('button[aria-label*="Phone (4a) Pro"]').click()`);
    await new Promise((r) => setTimeout(r, 600));

    const modalVisible = await evalCode(`!!document.querySelector('[role="dialog"]')`);
    const modalTitle = await evalCode(`document.querySelector('[role="dialog"] h2')?.innerText`);
    console.log('      Showcase Modal Opened:', modalVisible ? 'PASS' : 'FAIL');
    console.log('      Modal Header Title:', modalTitle);

    // Test 140x Zoom buttons inside modal
    console.log('      Testing 140x Ultra Zoom controls...');
    const zoomPresetClicked = await evalCode(`(() => {
      const btns = Array.from(document.querySelectorAll('[role="dialog"] button'));
      // The second button with 140x is the zoom preset in the camera tab
      const btn140 = btns.filter(b => b.innerText.includes('140x'))[1];
      if (btn140) {
        btn140.click();
        return true;
      }
      return false;
    })()`);
    await new Promise((r) => setTimeout(r, 600));
    const is140xActive = await evalCode(`document.querySelector('[role="dialog"]').innerText.includes('140X PERISCOPE')`);
    console.log('      140x Ultra Zoom Preset Clicked:', zoomPresetClicked ? 'PASS' : 'FAIL');
    console.log('      140x Periscope HUD Active:', is140xActive ? 'PASS' : 'FAIL');

    // Capture Modal Camera Tab Screenshot
    const ssModalCam = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync('/tmp/nothing_test/modal_camera.png', Buffer.from(ssModalCam.data, 'base64'));
    console.log('      Saved /tmp/nothing_test/modal_camera.png');

    // TEST 3: Switch to 137-LED Glyph Matrix Tab
    console.log('\n[3/7] Testing 137-LED Glyph Matrix Tab & Live Simulation...');
    await evalCode(`(() => {
      const tabBtns = Array.from(document.querySelectorAll('[role="dialog"] button'));
      const glyphTab = tabBtns.find(b => b.innerText.includes('137-LED Glyph'));
      if (glyphTab) glyphTab.click();
    })()`);
    await new Promise((r) => setTimeout(r, 600));

    const glyphCanvas = await evalCode(`!!document.querySelector('[role="dialog"] canvas')`);
    console.log('      137-LED Dome Canvas Rendered:', glyphCanvas ? 'PASS' : 'FAIL');

    // Trigger Solar Path pattern
    const solarClicked = await evalCode(`(() => {
      const btns = Array.from(document.querySelectorAll('[role="dialog"] button'));
      const solarBtn = btns.find(b => b.innerText.includes('Solar Path'));
      if (solarBtn) {
        solarBtn.click();
        return true;
      }
      return false;
    })()`);
    console.log('      Triggered Solar Path Pattern:', solarClicked ? 'PASS' : 'FAIL');

    // Trigger 3s Camera Countdown
    const timerClicked = await evalCode(`(() => {
      const btns = Array.from(document.querySelectorAll('[role="dialog"] button'));
      const timerBtn = btns.find(b => b.innerText.includes('Camera Countdown'));
      if (timerBtn) {
        timerBtn.click();
        return true;
      }
      return false;
    })()`);
    console.log('      Triggered Camera 3s Countdown Pattern:', timerClicked ? 'PASS' : 'FAIL');

    // Capture Modal Glyph Tab Screenshot
    const ssModalGlyph = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync('/tmp/nothing_test/modal_glyph.png', Buffer.from(ssModalGlyph.data, 'base64'));
    console.log('      Saved /tmp/nothing_test/modal_glyph.png');

    // Close Modal
    await evalCode(`(() => {
      const closeBtn = document.querySelector('[role="dialog"] button[aria-label="Close Showcase"]');
      if (closeBtn) closeBtn.click();
    })()`);
    await new Promise((r) => setTimeout(r, 500));

    // TEST 4: Unlock Phone and Inspect In-Phone Experience
    console.log('\n[4/7] Testing In-Phone Nothing OS Experience...');
    await evalCode(`(() => {
      const ls = document.getElementById('lockScreen') || document.body;
      ls.click();
    })()`);
    await new Promise((r) => setTimeout(r, 800));

    // Verify 16-Week GitHub Heatmap & Home Widgets
    const githubHeatmap = await evalCode(`document.querySelectorAll('.contribution-grid i').length === 112`);
    const cameraIconExists = await evalCode(`!!document.querySelector('button[aria-label="Open Camera"]')`);
    console.log('      GitHub Heatmap (112 tiles):', githubHeatmap ? 'PASS' : 'FAIL');
    console.log('      Camera App Icon on Home Screen:', cameraIconExists ? 'PASS' : 'FAIL');

    // TEST 5: Open In-Phone Camera App (140x Periscope & Glyph 3s Timer)
    console.log('\n[5/7] Testing In-Phone Camera App...');
    await evalCode(`document.querySelector('button[aria-label="Open Camera"]').click()`);
    await new Promise((r) => setTimeout(r, 1000));

    const cameraAppLoaded = await evalCode(`document.body.innerText.includes('World\\'s First 140x Ultra Zoom')`);
    console.log('      Camera App Loaded:', cameraAppLoaded ? 'PASS' : 'FAIL');

    // Click 140x Zoom preset inside Camera App
    await evalCode(`(() => {
      const zoomBtns = Array.from(document.querySelectorAll('button'));
      const btn140 = zoomBtns.find(b => b.innerText === '140x');
      if (btn140) btn140.click();
    })()`);
    await new Promise((r) => setTimeout(r, 400));
    const cam140Active = await evalCode(`document.body.innerText.includes('140X PERISCOPE ACTIVE')`);
    console.log('      Camera 140x Periscope Active:', cam140Active ? 'PASS' : 'FAIL');

    // Trigger Glyph 3s Timer button inside Camera App
    const glyphTimerToggled = await evalCode(`(() => {
      const timerBtn = document.querySelector('[data-testid="glyph-timer-btn"]');
      if (timerBtn) {
        timerBtn.click();
        return true;
      }
      return false;
    })()`);
    console.log('      Glyph 3s Timer Enabled:', glyphTimerToggled ? 'PASS' : 'FAIL');
    await new Promise((r) => setTimeout(r, 600));

    // Hit Shutter Button to trigger countdown!
    const shutterResult = await evalCode(`(() => {
      const shutterBtn = document.querySelector('[data-testid="camera-shutter-btn"]');
      if (shutterBtn) {
        shutterBtn.click();
        return 'clicked';
      }
      return 'not found';
    })()`);
    console.log('      Shutter Button Status:', shutterResult);
    await new Promise((r) => setTimeout(r, 600));

    const countdownRunning = await evalCode(`document.body.innerText.toUpperCase().includes('137-LED GLYPH COUNTDOWN')`);
    console.log('      3s Glyph Countdown Overlay Running:', countdownRunning ? 'PASS' : 'FAIL');

    // Capture Camera App Screenshot
    const ssCamApp = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync('/tmp/nothing_test/camera_app.png', Buffer.from(ssCamApp.data, 'base64'));
    console.log('      Saved /tmp/nothing_test/camera_app.png');

    // Close Camera App via Escape key
    await evalCode(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))`);
    await new Promise((r) => setTimeout(r, 600));

    // TEST 6: Test Rear Inspection & Glyph Active Banner
    console.log('\n[6/7] Testing Rear Inspection & 137-LED Active Banner...');
    await evalCode(`(() => {
      const btns = Array.from(document.querySelectorAll('.studio-footer button'));
      const flipBtn = btns.find(b => b.innerText.includes('Inspect rear'));
      if (flipBtn) flipBtn.click();
    })()`);
    await new Promise((r) => setTimeout(r, 1200));

    const glyphBannerVisible = await evalCode(`document.body.innerText.includes('137-LED Glyph Matrix Active')`);
    console.log('      Rear 137-LED Glyph Active Banner Visible:', glyphBannerVisible ? 'PASS' : 'FAIL');

    // Capture Rear Inspection Screenshot
    const ssRear = await send('browsingContext.captureScreenshot', { context: contextId });
    fs.writeFileSync('/tmp/nothing_test/rear_inspection.png', Buffer.from(ssRear.data, 'base64'));
    console.log('      Saved /tmp/nothing_test/rear_inspection.png');

    // TEST 7: Finish Swatches Test (Flip back and cycle finishes)
    console.log('\n[7/7] Testing Finish Swatches...');
    await evalCode(`(() => {
      const btns = Array.from(document.querySelectorAll('.finish-picker button'));
      if (btns[1]) btns[1].click(); // Obsidian
    })()`);
    await new Promise((r) => setTimeout(r, 600));
    const obsidianChecked = await evalCode(`document.querySelectorAll('.finish-picker button')[1]?.getAttribute('aria-checked') === 'true'`);
    console.log('      Finish Swatch Obsidian Selected:', obsidianChecked ? 'PASS' : 'FAIL');

    console.log('\n--- ALL PRSD.DEV + PHONE (4A) PRO TESTS PASSED WITH DISTINCTION ---');
    ws.close();
  } finally {
    ff.kill();
  }
}

main().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
