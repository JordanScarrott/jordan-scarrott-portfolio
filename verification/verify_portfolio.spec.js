import { test, expect } from '@playwright/test';

test('portfolio loads and icons render', async ({ page }) => {
  // Go to the app
  await page.goto('http://localhost:5173');

  // Check for title
  await expect(page).toHaveTitle(/Jordan Scarrott/);

  // Check for Social Links (Header) - verifying icons rendered
  const headerSocials = page.locator('nav a[aria-label="GitHub"]');
  await expect(headerSocials).toBeVisible();

  // Check for Metric Items (About section) - verifying icons rendered
  // Scroll to about section to ensure visibility (though playwright auto-waits/scrolls usually)
  const skillsSection = page.locator('#about');
  await expect(skillsSection).toBeVisible();

  // Check if "Microservices" skill is visible (it uses MetricItem)
  // Using exact: true to avoid matching the description paragraph
  await expect(page.getByText('Microservices', { exact: true })).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: 'verification/portfolio_verification.png', fullPage: true });
});
