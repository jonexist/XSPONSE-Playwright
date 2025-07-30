import { test, expect } from '@playwright/test';

test.describe('Search Customer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
    //await page.waitForLoadState('networkidle');
  });

test('should able to search for a cutomer', async ({ page }) => {
    // Fill the search input with a customer name
    const customerName = 'Nexus Innovations Inc.';
    const searchInput = page.getByRole('textbox', { name: 'Search Customer' });

    // Verify search input is empty initially
    await expect(searchInput).toHaveValue('');

    // Perform search
    await searchInput.fill(customerName);

    // Verify search results
    await expect(page.getByText(customerName)).toBeVisible();

    // Clear search and verify it's empty
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
})
  });