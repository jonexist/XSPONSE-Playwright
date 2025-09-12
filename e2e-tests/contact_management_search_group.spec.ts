import { test, expect } from '@playwright/test';


test.describe('impersonate Customer and navigate to Contact Management', () => {
  let firstName: string;
  let lastName: string;
  let email: string;
  let phone: string;

  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');

    // Click the row to select the customer
    await page.getByTestId('customer-search-input').type('tech innovators llc', {delay:20});
    await page.getByTestId('customer-search-input').press('Enter');
    await page.locator('#impersonate-user-222').click();
    await page.getByRole('button', { name: 'Impersonate' }).click();
    await page.getByRole('button', { name: 'Confirm Impersonate' }).click();

    // Verify that the user is impersonated successfully
    await expect(page.getByText("User impersonated successfully")).toBeVisible();

    // Go to contact management page
    await page.locator('span').filter({ hasText: 'Administration' }).click();
    await page.locator('a').filter({ hasText: 'Contacts' }).click();
   });

    test('Contact Management - Group Search', async ({ page }) => {
     
      // Navigate to Group tab
      await page.locator('button[role="tab"]').filter({ hasText: 'Group' }).first().click();

      // Search terms you want to test
      const searchTerms = ['regine', 'test', 'sample'];

      for (const term of searchTerms) {
        const searchBox = page.getByPlaceholder('Search Group Name');
        await searchBox.click();
        await searchBox.fill(term);
        await page.waitForTimeout(5000); // small wait for results 
        await searchBox.fill(''); // Clear the search box for the next term

      }
    });
});