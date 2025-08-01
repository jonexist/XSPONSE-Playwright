import { test, expect } from '@playwright/test';

test.describe('Search Customer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('should able to search for a cutomer', async ({ page }) => {
    // Fill the search input with a customer name
    const customerName = 'Updated Nexus Innovations Inc.';
    const searchInput = page.getByRole('textbox', { name: 'Search Customer' });

    // Verify search input is empty initially
    await expect(searchInput).toHaveValue('');

    // Perform search
    // Fill the search input with the customer name
    await searchInput.fill(customerName);

    // Verify search results
    //searchInput should be visible and contain the customer name
    await expect(page.getByText(customerName)).toBeVisible();

    // Clear search and verify it's empty
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
})
  });
