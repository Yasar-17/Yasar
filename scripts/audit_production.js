import { spawn } from 'child_process';

async function runProductionAudit() {
  console.log('================================================================');
  console.log('       YASAR.DEV PORTFOLIO — PHASE 7 FULL PRODUCTION AUDIT       ');
  console.log('================================================================');

  const previewPort = 4173;
  const targetUrl = `http://localhost:${previewPort}`;
  console.log(`[Target URL] ${targetUrl}`);

  // Launch Headless Firefox with remote debugging
  const ff = spawn('firefox', ['--headless', '--remote-debugging-port=9222', targetUrl]);
  await new Promise((r) => setTimeout(r, 2200));

  const results = {
    hardware3D: {},
    interactions: {},
    content: {},
    performance: {},
    accessibility: {},
    errors: [],
  };

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

    // 1. Session Init
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

    console.log('\n--- 1. PERFORMANCE PROFILING ---');
    const perfTiming = await evalCode(`(() => {
      const timing = performance.getEntriesByType('navigation')[0] || {};
      const paintEntries = performance.getEntriesByType('paint') || [];
      const fcp = paintEntries.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
      
      const resources = performance.getEntriesByType('resource') || [];
      const glbResource = resources.find(r => r.name.includes('.glb'));
      const jsResources = resources.filter(r => r.name.endsWith('.js'));
      const cssResources = resources.filter(r => r.name.endsWith('.css'));

      return {
        dns: Math.round(timing.domainLookupEnd - timing.domainLookupStart),
        ttfb: Math.round(timing.responseStart - timing.requestStart),
        domLoaded: Math.round(timing.domContentLoadedEventEnd - timing.startTime),
        complete: Math.round(timing.loadEventEnd - timing.startTime),
        fcp: Math.round(fcp),
        totalResources: resources.length,
        glbDuration: glbResource ? Math.round(glbResource.duration) : null,
        glbSize: glbResource ? glbResource.transferSize : null,
        jsBundlesCount: jsResources.length,
        cssBundlesCount: cssResources.length
      };
    })()`);

    console.log('Navigation Timing:', JSON.stringify(perfTiming, null, 2));
    results.performance = perfTiming;

    console.log('\n--- 2. 3D HARDWARE AUDIT ---');
    const hardwareCheck = await evalCode(`(() => {
      const canvas = document.querySelector('canvas.phone-canvas');
      const css3d = document.querySelector('.phone-html');
      const surface = document.querySelector('.phone-surface');
      const gl = canvas ? (canvas.getContext('webgl2') || canvas.getContext('webgl')) : null;
      
      return {
        canvasFound: !!canvas,
        canvasDimensions: canvas ? { width: canvas.width, height: canvas.height } : null,
        webglContextCreated: !!gl,
        rendererVendor: gl ? gl.getParameter(gl.RENDERER) : null,
        css3dRendererActive: !!css3d,
        surfacePositioned: !!surface,
        surfaceDimensions: surface ? { width: surface.style.width, height: surface.style.height } : null,
      };
    })()`);
    console.log('3D Hardware Setup:', JSON.stringify(hardwareCheck, null, 2));
    results.hardware3D = hardwareCheck;

    console.log('\n--- 3. ACCESSIBILITY & CONTRAST AUDIT ---');
    const a11yCheck = await evalCode(`(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const unlabeledButtons = buttons.filter(b => !b.innerText.trim() && !b.getAttribute('aria-label') && !b.getAttribute('title'));
      const links = Array.from(document.querySelectorAll('a'));
      const missingHrefLinks = links.filter(a => !a.getAttribute('href'));
      
      const lockScreen = document.getElementById('lockScreen');
      const lockAria = lockScreen ? lockScreen.getAttribute('aria-label') : null;

      return {
        totalButtons: buttons.length,
        unlabeledButtonsCount: unlabeledButtons.length,
        unlabeledButtonNames: unlabeledButtons.map(b => b.className),
        totalLinks: links.length,
        missingHrefCount: missingHrefLinks.length,
        lockScreenAccessible: !!lockAria,
        lockScreenLabel: lockAria
      };
    })()`);
    console.log('Accessibility Metrics:', JSON.stringify(a11yCheck, null, 2));
    results.accessibility = a11yCheck;

    console.log('\n--- 4. INTERACTION & ALL APPS AUDIT ---');
    // A. Unlock phone
    console.log('[Interaction 1/11] Unlocking phone via Enter key press on lock screen...');
    await evalCode(`(() => {
      const ls = document.getElementById('lockScreen');
      if (ls) {
        ls.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      }
    })()`);
    await new Promise((r) => setTimeout(r, 1000));

    const isUnlocked = await evalCode(`!document.getElementById('lockScreen') && document.body.innerText.includes('Projects')`);
    console.log('  -> Unlocked to Home Screen:', isUnlocked ? 'PASS' : 'FAIL');
    results.interactions.unlock = isUnlocked;

    // Helper to open an app by label and verify its loaded content
    async function testApp(appId, appName, verificationText) {
      console.log(`[App Test] Opening ${appName}...`);
      await evalCode(`(() => {
        const btn = document.querySelector('button[aria-label="Open ${appName}"]');
        if (btn) btn.click();
      })()`);
      await new Promise((r) => setTimeout(r, 900));

      const found = await evalCode(`document.body.innerText.toUpperCase().includes(${JSON.stringify(verificationText.toUpperCase())})`);
      console.log(`  -> ${appName} App (${appId}):`, found ? 'PASS' : 'FAIL');

      // Test back navigation
      await evalCode(`(() => {
        const back = document.querySelector('button[aria-label="Back to home screen"]') || 
                     document.querySelector('button[aria-label="Return to Home Screen"]');
        if (back) back.click();
      })()`);
      await new Promise((r) => setTimeout(r, 900));

      return found;
    }

    results.interactions.apps = {
      about: await testApp('about', 'About', 'Yasar Mohammed'),
      projects: await testApp('projects', 'Projects', 'CARDIA'),
      skills: await testApp('skills', 'Skills', 'Python'),
      experience: await testApp('experience', 'Timeline', 'Hackulus'),
      caseStudies: await testApp('case-studies', 'Studies', 'Wildfire'),
      github: await testApp('github', 'GitHub', 'Yasar-17'),
      terminal: await testApp('terminal', 'Terminal', 'Yasar OS Shell'),
      resume: await testApp('resume', 'Resume', 'Curriculum Vitae'),
      contact: await testApp('contact', 'Contact', 'mohammedyasar990@gmail.com'),
      settings: await testApp('settings', 'Settings', 'Wallpaper'),
    };

    console.log('\n--- 5. TERMINAL COMMAND INTERACTION AUDIT ---');
    // Open terminal and run 'help'
    await evalCode(`(() => {
      const btn = document.querySelector('button[aria-label="Open Terminal"]');
      if (btn) btn.click();
    })()`);
    await new Promise((r) => setTimeout(r, 900));

    const terminalWorks = await evalCode(`(() => {
      const input = document.querySelector('input[type="text"]');
      if (!input) return false;
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeSetter.call(input, 'help');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      const form = input.closest('form');
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      return true;
    })()`);
    await new Promise((r) => setTimeout(r, 900));
    const termOutput = await evalCode(`document.body.innerText.includes('Available commands:')`);
    console.log('  -> Terminal Executed `help` command:', termOutput ? 'PASS' : 'FAIL');
    results.interactions.terminalCommand = termOutput;

    // Close terminal via Escape key
    await evalCode(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))`);
    await new Promise((r) => setTimeout(r, 800));

    console.log('\n--- 6. 3D STUDIO CONTROLS (FINISH & FLIP) AUDIT ---');
    // Test Studio Finish Switch to Space Black (Obsidian)
    console.log('[Studio] Switching finish to Obsidian...');
    await evalCode(`(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const obsBtn = buttons.find(b => b.innerText.includes('Obsidian') || b.getAttribute('title')?.includes('Obsidian'));
      if (obsBtn) obsBtn.click();
    })()`);
    await new Promise((r) => setTimeout(r, 500));

    // Test Flip Button (inspect rear and front)
    console.log('[Studio] Inspecting Rear Chassis via Flip Button...');
    await evalCode(`(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const flipBtn = buttons.find(b => b.innerText.includes('Rear') || b.innerText.includes('Front'));
      if (flipBtn) flipBtn.click();
    })()`);
    await new Promise((r) => setTimeout(r, 800));
    const flippedState = await evalCode(`document.body.innerText.includes('Front')`);
    console.log('  -> Rear Inspection Triggered:', flippedState ? 'PASS' : 'FAIL');
    results.interactions.flipControl = flippedState;

    // Flip back
    await evalCode(`(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const flipBtn = buttons.find(b => b.innerText.includes('Front'));
      if (flipBtn) flipBtn.click();
    })()`);
    await new Promise((r) => setTimeout(r, 600));

    console.log('\n--- 7. MOBILE EXPERIENCE AUDIT (375x812) ---');
    await send('browsingContext.setViewport', {
      context: contextId,
      viewport: { width: 375, height: 812 },
      devicePixelRatio: 2,
    });
    await new Promise((r) => setTimeout(r, 800));

    const mobileCheck = await evalCode(`(() => {
      const isFull = document.querySelector('.mobile-viewport');
      const inspect3dBtn = document.querySelector('button[aria-label="Inspect physical 3D phone model"]');
      return {
        fullViewportActive: !!isFull,
        inspect3dBtnAvailable: !!inspect3dBtn
      };
    })()`);
    console.log('Mobile Edge-to-Edge Verification:', JSON.stringify(mobileCheck, null, 2));
    results.interactions.mobile = mobileCheck;

    console.log('\n================================================================');
    console.log('                    AUDIT SUITE COMPLETE                        ');
    console.log('================================================================');
    ws.close();
  } catch (err) {
    console.error('Audit execution error:', err);
    results.errors.push(err.message || String(err));
  } finally {
    ff.kill();
  }

  return results;
}

runProductionAudit().then((r) => {
  console.log('\n[SUMMARY RESULT OBJECT]:\n', JSON.stringify(r, null, 2));
  process.exit(0);
});
