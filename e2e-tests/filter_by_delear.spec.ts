import { test, expect } from '@playwright/test';

test.describe('Filter by Dealer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

  test('should be able to filter customer by dealer', async ({ page }) => {
    const dealerName = 'AbaloneTech';

    // Click the Dealer filter dropdown
    await page.locator('.grow').first().click();

    // Fill in dealer name in search input
    const searchInput = page.getByPlaceholder('Search...');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(dealerName);

    // Wait for dropdown option to appear and click
    const dealerOption = page.getByText(dealerName, { exact: true });
    await expect(dealerOption).toBeVisible({ timeout: 10000 });
    await dealerOption.click();

     // Verify filtered result in table (type-safe strict locator)
      const filteredResult = page.locator('div.text-sm.capitalize.text-default-600')
        .filter({ hasText: dealerName });
      await expect(filteredResult).toBeVisible();
      
    // Optionally pause to inspect
    // await page.pause();
  });
});
