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
        page.wait_for_timeout(500)
        page.evaluate('window.loss.restoreContext()')
        expect(page.locator('#hero-art')).to_have_attribute('data-scene','ready',timeout=15000)
        page.emulate_media(reduced_motion='reduce')
        expect(page.locator('#hero-art canvas')).to_have_count(0)
        expect(page.locator('#motion-toggle')).to_be_hidden()
        page.emulate_media(reduced_motion='no-preference')
        expect(page.locator('#hero-art')).to_have_attribute('data-scene','ready',timeout=15000)
        assert errors==[], errors
        print(f'PASS {"mobile" if mobile else "desktop"}: real WebGL2, animation, pause, offscreen suspension, context loss/restore, motion preference'+(', keyboard viewport' if mobile else ''),flush=True)
        page.close()

    for mode in ('unsupported','module-failure'):
        page=browser.new_page(viewport={'width':375,'height':667},is_mobile=True,has_touch=True)
        if mode=='unsupported':
            page.add_init_script("const ctx=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:ctx.call(this,type,...args)}")
        else:
            page.route('**/hero-3d.js',lambda r:r.abort())
        page.goto(BASE+'/',wait_until='networkidle')
        expect(page.locator('#hero-art')).to_have_attribute('data-scene','fallback',timeout=10000)
        expect(page.locator('#list .row')).to_have_count(103)
        page.locator('.hero-cta').click()
        page.locator('#search').fill('قص غرة تحديد')
        page.get_by_role('button',name='إضافة قص غرة تحديد',exact=True).click()
        page.locator('#go').click()
        expect(page.locator('#tServices')).to_have_text('11 ر.س')
        page.set_viewport_size({'width':844,'height':390})
        page.wait_for_function("Math.abs(document.getElementById('sheet').getBoundingClientRect().bottom - innerHeight) < 1")
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        box=page.locator('#sheet').bounding_box()
        assert box['height']<=390 and abs(box['y']+box['height']-390)<2
        print(f'PASS {mode}: local poster, usable booking, landscape layout',flush=True)
        page.close()
    browser.close()
print('4/4 hero and resilience scenarios passed.')
