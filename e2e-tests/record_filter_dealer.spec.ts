import { test, expect } from '@playwright/test';

test.describe('Filter by Dealer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('filter by dealer', async ({ page }) => {
  // Click the Dealer filter dropdown
  await page.locator('.grow').first().click();
  await page.getByRole('option', { name: 'AbaloneTech' }).click();
    const dealerName = 'AbaloneTech';   
await expect(page.getByText(dealerName, { exact: false })).toBeVisible();
}); });