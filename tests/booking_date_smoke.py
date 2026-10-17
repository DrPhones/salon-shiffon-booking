"""Verify tomorrow-only booking against Riyadh midnight, regardless of device timezone."""
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
import os
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('SMOKE_BASE_URL', 'http://127.0.0.1:4173').rstrip('/')
BEFORE_MIDNIGHT = datetime(2026, 10, 31, 20, 59, 50, tzinfo=timezone.utc)
AFTER_MIDNIGHT = datetime(2026, 10, 31, 21, 0, 10, tzinfo=timezone.utc)

with sync_playwright() as p:
    options = {'headless': True}
    if Path('/usr/bin/chromium').exists():
        options.update(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    browser = p.chromium.launch(**options)
    for timezone_id in ('Asia/Riyadh', 'America/Los_Angeles', 'Asia/Tokyo'):
        context = browser.new_context(timezone_id=timezone_id, viewport={'width':390,'height':844}, reduced_motion='reduce')
        context.route('**/*', lambda r: r.continue_() if urlparse(r.request.url).hostname == urlparse(BASE).hostname else r.abort())
        page = context.new_page()
        page.clock.set_fixed_time(BEFORE_MIDNIGHT)
        page.add_init_script('window.opened=[]; window.open=url=>{window.opened.push(url);return {opener:null}};')
        page.goto(BASE+'/', wait_until='networkidle')
        expect(page.locator('#day')).to_have_attribute('min','2026-11-01')
        page.locator('#search').fill('قص غرة تحديد')
        page.get_by_role('button',name='إضافة قص غرة تحديد',exact=True).click()
        page.locator('#go').click()
        page.locator('#customer').fill('اختبار التاريخ')
        page.locator('#mobile').fill('0500000000')
        page.locator('#day').fill('2026-11-01')
        page.locator('#time').select_option('10:00')
        page.locator('#customer').focus()
        # An open tab survives the month boundary; the next picker interaction must refresh its minimum.
        page.clock.set_fixed_time(AFTER_MIDNIGHT)
        page.locator('#day').focus()
        expect(page.locator('#day')).to_have_attribute('min','2026-11-02')
        assert page.locator('#day').evaluate('e=>e.validity.rangeUnderflow')
        page.locator('#send').click()
        expect(page.locator('#err')).to_contain_text('الحجز لنفس اليوم غير متاح')
        assert page.evaluate('window.opened.length')==0
        # A saved request whose date has become today must not restore that date.
        page.reload(wait_until='networkidle')
        expect(page.locator('#day')).to_have_value('')
        expect(page.locator('#day')).to_have_attribute('min','2026-11-02')
        page.locator('#go').click()
        page.locator('#day').fill('2026-11-02')
        page.locator('#time').select_option('10:00')
        page.locator('#send').click()
        assert page.evaluate('window.opened.length')==1
        assert urlparse(page.evaluate('window.opened[0]')).hostname=='wa.me'
        print(f'PASS {timezone_id}: tomorrow minimum, month rollover, same-day rejection, stale draft, future date accepted',flush=True)
        context.close()
    browser.close()
print('3/3 Riyadh booking-date scenarios passed; no external messages sent.')
