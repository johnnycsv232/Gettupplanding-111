import { expect, test } from '@playwright/test';

test.describe('Landing Visual Artifacts', () => {
  test('captures hero, pricing, and exit-intent states', async ({ page }, testInfo) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /we capture/i })).toBeVisible();
    await page.screenshot({
      path: testInfo.outputPath('hero-state.png'),
      fullPage: false,
    });

    await page.locator('#pricing').scrollIntoViewIfNeeded();
    await expect(page.locator('#pricing')).toBeVisible();
    await page.screenshot({
      path: testInfo.outputPath('pricing-state.png'),
      fullPage: false,
    });

    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('mouseleave', { clientY: 0 }));
    });

    await expect(page.getByRole('heading', { name: /the vip entrance/i })).toBeVisible();
    await page.screenshot({
      path: testInfo.outputPath('exit-intent-state.png'),
      fullPage: false,
    });
  });
});
