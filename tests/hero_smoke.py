"""Real WebGL, fallback, motion, viewport and booking-panel regression checks.

Start the static server on 4173, then run: python3 tests/hero_smoke.py
Requires Python Playwright and Chromium. No external messages are sent.
"""
from pathlib import Path
import os
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('SMOKE_BASE_URL', 'http://127.0.0.1:4173').rstrip('/')
with sync_playwright() as p:
    options = {'headless': True, 'args': ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader']}
    if Path('/usr/bin/chromium').exists():
        options['executable_path'] = '/usr/bin/chromium'
    browser = p.chromium.launch(**options)
    for mobile in (False, True):
        page = browser.new_page(viewport={'width':390 if mobile else 1487, 'height':844 if mobile else 1058}, is_mobile=mobile, has_touch=mobile)
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('console', lambda e: errors.append(e.text) if e.type=='error' else None)
        page.add_init_script('''window.rafCount=0; const raf=window.requestAnimationFrame.bind(window); window.requestAnimationFrame=fn=>raf(t=>{window.rafCount++;fn(t)});''')
        page.goto(BASE+'/', wait_until='networkidle')
        expect(page.locator('#hero-art')).to_have_attribute('data-scene', 'ready', timeout=30000)
        assert page.locator('#hero-art canvas').evaluate("c=>c.getContext('webgl2').getParameter(c.getContext('webgl2').VERSION)").startswith('WebGL 2')
        # Wait beyond the crossfade so changing opacity cannot masquerade as motion.
        page.wait_for_timeout(1500)
        before = page.locator('#hero-art canvas').screenshot()
        page.wait_for_timeout(300)
        after = page.locator('#hero-art canvas').screenshot()
        assert before != after, 'Scene must actually animate'
        page.locator('#motion-toggle').click()
        expect(page.locator('#motion-toggle')).to_have_attribute('aria-pressed','true')
        page.wait_for_timeout(200)
        paused = page.locator('#hero-art canvas').screenshot()
        page.wait_for_timeout(300)
        assert paused == page.locator('#hero-art canvas').screenshot(), 'Pause must stop rendering'
        page.locator('#motion-toggle').click()
        page.locator('.hero-cta').click()
        page.wait_for_function("document.getElementById('hero-art').getBoundingClientRect().bottom < 0")
        page.wait_for_timeout(150)
        count = page.evaluate('window.rafCount')
        page.wait_for_timeout(400)
        assert page.evaluate('window.rafCount')==count, 'Offscreen hero must stop consuming frames'
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.locator('#search').fill('قص غرة تحديد')
        page.get_by_role('button',name='إضافة قص غرة تحديد',exact=True).click()
        if mobile:
            page.locator('#go').click()
            page.wait_for_function("Math.abs(document.getElementById('sheet').getBoundingClientRect().bottom - innerHeight) < 1")
            box = page.locator('#sheet').bounding_box()
            assert abs(box['y']+box['height']-844)<2, 'Sheet must be anchored to viewport bottom'
            # Model Safari's layout/visual viewport split when the software keyboard opens.
            page.evaluate('''Object.defineProperty(visualViewport,'height',{configurable:true,value:410}); Object.defineProperty(visualViewport,'offsetTop',{configurable:true,value:0}); visualViewport.dispatchEvent(new Event('resize'));''')
            box = page.locator('#sheet').bounding_box()
            assert abs(box['y']+box['height']-410)<2
            assert page.locator('#send').bounding_box()['y'] < 410
            page.evaluate("delete visualViewport.height;delete visualViewport.offsetTop;visualViewport.dispatchEvent(new Event('resize'));document.getElementById('toggle').click()")
        # Back to the hero; loss and restoration must preserve the local fallback.
        page.evaluate('window.scrollTo(0,0)')
        page.wait_for_timeout(900)
        page.locator('#hero-art canvas').evaluate("c=>{window.loss=c.getContext('webgl2').getExtension('WEBGL_lose_context'); window.loss.loseContext()}")
        expect(page.locator('#hero-art')).to_have_attribute('data-scene','fallback')
        assert page.locator('.hero-poster').evaluate('i=>i.complete && i.naturalWidth>0')
        expect(page.locator('#motion-toggle')).to_be_visible()
        page.wait_for_function("document.querySelector('.hero-poster').getAnimations().some(a=>a.playState==='running')")
        page.wait_for_timeout(500)
        page.evaluate('window.loss.restoreContext()')
        expect(page.locator('#hero-art')).to_have_attribute('data-scene','ready',timeout=15000)
        page.emulate_media(reduced_motion='reduce')
        expect(page.locator('#hero-art canvas')).to_have_count(0)
        expect(page.locator('#motion-toggle')).to_have_text('تشغيل الحركة')
        assert page.locator('.hero-poster').evaluate("e=>e.getAnimations().every(a=>a.playState!=='running')")
        # An explicit choice can enable motion without changing iPhone settings.
        page.locator('#motion-toggle').click()
        expect(page.locator('#hero-art')).to_have_attribute('data-scene','ready',timeout=15000)
        expect(page.locator('#hero-art canvas')).to_be_visible()
        page.locator('#motion-toggle').click()
        expect(page.locator('#motion-toggle')).to_have_text('تشغيل الحركة')
        # Visibility and bfcache events must not override the user's pause.
        page.evaluate("document.dispatchEvent(new Event('visibilitychange'));window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}))")
        page.wait_for_timeout(150)
        count = page.evaluate('window.rafCount')
        page.wait_for_timeout(350)
        assert page.evaluate('window.rafCount')==count
        page.emulate_media(reduced_motion='no-preference')
        expect(page.locator('#hero-art')).to_have_attribute('data-scene','ready',timeout=15000)
        assert errors==[], errors
        print(f'PASS {"mobile" if mobile else "desktop"}: real WebGL2, animation, pause, offscreen suspension, context loss/restore, motion preference'+(', keyboard viewport' if mobile else ''),flush=True)
        page.close()

    for mode in ('unsupported','module-failure','shader-failure'):
        page=browser.new_page(viewport={'width':375,'height':667},is_mobile=True,has_touch=True)
        if mode=='unsupported':
            page.add_init_script("const ctx=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:ctx.call(this,type,...args)}")
        elif mode=='module-failure':
            page.route('**/hero-3d.js*',lambda r:r.abort())
        else:
            page.add_init_script("const check=WebGL2RenderingContext.prototype.getProgramParameter;WebGL2RenderingContext.prototype.getProgramParameter=function(program,pname){return pname===this.LINK_STATUS?false:check.call(this,program,pname)}")
        page.goto(BASE+'/',wait_until='networkidle')
        expect(page.locator('#hero-art')).to_have_attribute('data-scene','fallback',timeout=10000)
        expect(page.locator('#list .row')).to_have_count(103)
        expect(page.locator('#hero-art canvas')).to_have_count(0)
        page.locator('#hero-art').scroll_into_view_if_needed()
        page.wait_for_timeout(1500)
        before=page.locator('#hero-art').screenshot()
        page.wait_for_timeout(700)
        assert before!=page.locator('#hero-art').screenshot(), 'Fallback must visibly animate'
        page.locator('#motion-toggle').click()
        page.wait_for_timeout(200)
        paused=page.locator('#hero-art').screenshot()
        page.wait_for_timeout(350)
        assert paused==page.locator('#hero-art').screenshot(), 'Fallback must respect pause'
        page.locator('#motion-toggle').click()
        page.locator('.hero-cta').click()
        page.wait_for_function("document.querySelector('.hero-poster').getAnimations().every(a=>a.playState==='paused')")
        page.locator('#search').fill('قص غرة تحديد')
        page.get_by_role('button',name='إضافة قص غرة تحديد',exact=True).click()
        page.locator('#go').click()
        expect(page.locator('#tServices')).to_have_text('11 ر.س')
        page.set_viewport_size({'width':844,'height':390})
        page.wait_for_function("Math.abs(document.getElementById('sheet').getBoundingClientRect().bottom - innerHeight) < 1")
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        box=page.locator('#sheet').bounding_box()
        assert box['height']<=390 and abs(box['y']+box['height']-390)<2
        print(f'PASS {mode}: animated fallback, pause/resume, offscreen suspension, usable booking, landscape layout',flush=True)
        page.close()

    for mode in ('reduced-motion','save-data','idle-starved','slow-frames'):
        page=browser.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce' if mode=='reduced-motion' else 'no-preference')
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        if mode=='save-data':
            page.add_init_script("Object.defineProperty(navigator,'connection',{value:{saveData:true}})")
        elif mode=='idle-starved':
            page.add_init_script("window.requestIdleCallback=()=>42;window.cancelIdleCallback=()=>{}")
        elif mode=='slow-frames':
            # Throttle native frames, retaining the browser's GPU backpressure.
            # A timer-only rAF replacement can flood a software GPU with draws.
            page.add_init_script('''
                const request=window.requestAnimationFrame.bind(window),cancel=window.cancelAnimationFrame.bind(window);
                const pending=new Map();let nextId=0;
                window.requestAnimationFrame=fn=>{
                    const id=++nextId,start=performance.now();
                    const tick=now=>{
                        if(now-start>=100){pending.delete(id);fn(now)}
                        else pending.set(id,request(tick));
                    };
                    pending.set(id,request(tick));return id;
                };
                window.cancelAnimationFrame=id=>{cancel(pending.get(id));pending.delete(id)};
            ''')
        page.goto(BASE+'/',wait_until='networkidle')
        if mode in ('reduced-motion','save-data'):
            page.wait_for_timeout(1400)
            expect(page.locator('#hero-art canvas')).to_have_count(0)
            assert page.locator('.hero-poster').evaluate('e=>e.getAnimations().length')==0
            expect(page.locator('#motion-toggle')).to_have_text('تشغيل الحركة')
            page.locator('#motion-toggle').click()
        expect(page.locator('#hero-art')).to_have_attribute('data-scene','ready',timeout=15000)
        page.locator('#hero-art').scroll_into_view_if_needed()
        page.wait_for_timeout(1500)
        # Capture the viewport region directly: the throttled rAF harness also
        # delays Playwright's locator-stability polling, unrelated to rendering.
        clip=page.locator('#hero-art').bounding_box()
        before=page.screenshot(clip=clip)
        page.wait_for_timeout(1000)
        assert before!=page.screenshot(clip=clip), mode+' must animate after crossfade'
        # Returning from a cached page must resume the user's active animation.
        page.evaluate("window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}))")
        page.wait_for_timeout(200)
        before=page.screenshot(clip=clip)
        page.wait_for_timeout(500)
        assert before!=page.screenshot(clip=clip), 'Motion must resume after bfcache'
        assert errors==[],errors
        print(f'PASS {mode}: initial policy, visible motion, bfcache resume',flush=True)
        page.close()
    browser.close()
print('9/9 hero and resilience scenarios passed.')
