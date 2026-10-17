from pathlib import Path
import os
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from urllib.parse import urlparse, parse_qs
import json, re
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('SMOKE_BASE_URL', 'http://127.0.0.1:4173').rstrip('/')
BROWSER = os.environ.get('SMOKE_BROWSER', 'chromium')
catalog = [
    {'name': 'قص غرة تحديد', 'price': 11, 'bookable': False, 'kind': 'خدمة'},
    {'name': 'تسريحة شعر قصير', 'price': 138, 'bookable': True, 'kind': 'خدمة'},
]
today = datetime.now(ZoneInfo('Asia/Riyadh')).date()
with sync_playwright() as p:
    browser_type = getattr(p, BROWSER)
    options = {'headless': True}
    if BROWSER == 'chromium' and Path('/usr/bin/chromium').exists():
        options.update(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    browser = browser_type.launch(**options)
    for mobile in (False, True):
        for fee in (False, True):
            context = browser.new_context(viewport={'width':390 if mobile else 1440, 'height':844 if mobile else 1000}, timezone_id='Asia/Riyadh', reduced_motion='reduce')
            # Exercise local application only; never contact WhatsApp or external services.
            context.route('**/*', lambda r: r.continue_() if urlparse(r.request.url).hostname == urlparse(BASE).hostname else r.abort())
            page = context.new_page()
            errors=[]
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.add_init_script('window.opened=[]; window.open=(url)=>{window.opened.push(url); return {opener:null}};')
            response=page.goto(BASE+'/', wait_until='networkidle')
            assert response.status==200
            expect(page.locator('#hero-title')).to_have_text('تفاصيلكِتزهر هنا.')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            assert page.locator('#hero-art canvas').count()==0, 'Reduced motion should not allocate WebGL'
            expect(page.locator('.hero-cta')).to_be_visible()
            expect(page.locator('#list .row')).to_have_count(103)
            for asset in ['assets/site.css','assets/booking.js','assets/hero-3d.js','assets/hero-poster.webp','assets/vendor/three.module.min.js','assets/vendor/three.core.min.js','hero-salon.jpg','legacy/index.html']:
                assert context.request.get(BASE+'/'+asset).status==200, asset
            item=next(x for x in catalog if bool(x.get('bookable'))==fee and x.get('kind')!='منتج')
            page.locator('#search').fill(item['name'])
            page.get_by_role('button', name='إضافة '+item['name'], exact=True).click()
            if mobile:
                page.locator('#go').click()
            expect(page.locator('#tFee')).to_have_text(('20' if fee else '0')+' ر.س')
            expect(page.locator('#tServices')).to_have_text(str(item['price'])+' ر.س')
            page.locator('#send').click()
            expect(page.locator('#customer')).to_have_attribute('aria-invalid','true')
            page.locator('#customer').fill('اختبار البيئة')
            page.locator('#mobile').fill('0500000000')
            page.locator('#day').fill(today.isoformat())
            page.locator('#time').select_option('10:00')
            page.locator('#send').click()
            expect(page.locator('#err')).to_contain_text('الحجز لنفس اليوم غير متاح')
            assert page.evaluate('window.opened.length')==0
            page.locator('#day').fill((today+timedelta(days=1)).isoformat())
            # The invalid same-day attempt may clear an elapsed time; complete the valid request again.
            page.locator('#time').select_option('10:00')
            page.locator('#send').click()
            urls=page.evaluate('window.opened')
            assert len(urls)==1
            assert urlparse(urls[0]).hostname=='wa.me'
            message=parse_qs(urlparse(urls[0]).query)['text'][0]
            assert item['name'] in message and 'اختبار البيئة' in message
            assert ('بيانات التحويل' in message)==fee
            if fee:
                assert 'لا تحولي رسوم التأكيد الآن.' in message
            event=page.evaluate('window.dataLayer.at(-1)')
            assert event['event']=='booking_whatsapp_click'
            assert event['confirmation_fee']==(20 if fee else 0)
            assert event['items_value']==item['price']
            assert 'اختبار البيئة' not in json.dumps(event, ensure_ascii=False)
            page.reload(wait_until='networkidle')
            assert page.locator('#customer').input_value()=='اختبار البيئة'
            expect(page.locator('#tFee')).to_have_text(('20' if fee else '0')+' ر.س')
            assert not errors, errors
            print(f'PASS: {"mobile" if mobile else "desktop"}, {"fee" if fee else "no fee"}: catalog, assets, search, totals, validation, WhatsApp text, analytics, draft restore')
            context.close()
    browser.close()
print('4/4 browser scenarios passed; no external messages sent. All runtime scripts, fonts and artwork served locally.')
