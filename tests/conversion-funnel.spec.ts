import { test, expect } from '@playwright/test';

test.describe('Zenith Conversion Funnel', () => {
  test('should navigate through the hero and submit lead form', async ({ page }) => {
    await page.goto('/');

    // Verify Hero Section
    await expect(
      page
        .locator('section')
        .filter({ hasText: /Zenith/i })
        .first()
    ).toBeVisible();

    // Trigger Lead Form (assuming it's in the Agent or a CTA)
    const cta = page
      .getByRole('button', { name: /Start/i })
      .or(page.getByRole('button', { name: /Apply/i }));
    if ((await cta.count()) > 0) {
      await cta.first().click();
    }

    // Wait for Lead Form or Agent
    await expect(
      page.locator('input[name="email"]').or(page.locator('input[type="email"]'))
    ).toBeVisible({ timeout: 10000 });

    // Submit Lead
    await page.fill('input[name="email"]', 'test@example.com');
    await page.press('input[name="email"]', 'Enter');

    // Success State
    await expect(
      page.locator('text=/Success/i').or(page.locator('text=/Thank you/i'))
    ).toBeVisible();
  });
});
