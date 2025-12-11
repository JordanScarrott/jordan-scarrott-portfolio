from playwright.sync_api import sync_playwright

def verify_skip_link(page):
    page.goto("http://localhost:3000")

    # 1. Verify Skip Link exists
    skip_link = page.get_by_role("link", name="Skip to Content")

    # 2. Focus the skip link (simulate Tab)
    page.keyboard.press("Tab")

    # 3. Take screenshot of focused skip link
    page.screenshot(path="verification/skip_link_focused.png")

    # 4. Click the link and verify navigation
    page.keyboard.press("Enter")

    # Check if URL hash changed
    assert "#main-content" in page.url

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
        verify_skip_link(page)
    finally:
        browser.close()
