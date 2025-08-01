import { test, expect } from '@playwright/test';

test.describe('Customer Status Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
    await page.waitForLoadState('networkidle');
  });

  test('should filter and display all customers with Disabled status', async ({ page }) => {
    const targetStatus = 'Disabled';

    // 1. Open and interact with status filter dropdown
    await page.locator('.grow').last().click();
    const searchInput = page.getByPlaceholder('Search...');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(targetStatus);

    // 2. Select the status option
    const statusOption = page.getByRole('option', { name: targetStatus, exact: true });
    await expect(statusOption).toBeVisible();
    await statusOption.click();

    // 3. Wait for results to load
    await page.waitForSelector('tbody tr:has(div.text-sm.font-bold.uppercase)');

    // 4. Get all matching results
    const statusBadges = page.locator('div.text-sm.font-bold.uppercase.text-destructive');
    const resultCount = await statusBadges.count();

    // 5. Verify all results show the correct status
    await expect(statusBadges).not.toHaveCount(0);
    
    for (let i = 0; i < resultCount; i++) {
      await expect(statusBadges.nth(i)).toHaveText(targetStatus);
    }

  });
});