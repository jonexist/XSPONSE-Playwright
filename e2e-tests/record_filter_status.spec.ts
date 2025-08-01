import { test, expect } from '@playwright/test';


test.describe('Filter by Status', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('filter by status', async ({ page }) => {
  await page.locator('div:nth-child(3) > .relative > div > .grow').click();
  await page.getByRole('option', { name: 'Enabled' }).click();
});});