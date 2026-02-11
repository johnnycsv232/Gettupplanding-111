import { test, expect } from '@playwright/test';

test.describe('Zenith Conversion Funnel', () => {
  test('should render hero and handle exit-intent modal interaction', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /we capture/i })).toBeVisible();
    await expect(page.getByPlaceholder('Your City')).toBeVisible();
    await expect(page.getByPlaceholder('Email Address')).toBeVisible();

    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('mouseleave', { clientY: 0 }));
    });

    await expect(page.getByRole('heading', { name: /the vip entrance/i })).toBeVisible();
    await expect(page.getByPlaceholder('Enter your email')).toBeVisible();

    await page.getByRole('button', { name: /continue browsing for now/i }).click();

    await expect(page.getByRole('heading', { name: /the vip entrance/i })).not.toBeVisible();
  });
});
