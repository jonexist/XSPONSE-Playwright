import { test, expect } from '@playwright/test';


test.describe('impersonate Customer and remove view', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('should be able to impersonate customer and delete playlist(s)', async ({ page }) => {
    // Locate the customer row for Nexus Tech LLC
    const nexusRow = page.locator('tr', { hasText: 'Nexus Tech LLC' });

    // Start impersonation flow
    await page.getByTestId('customer-search-input').fill('nexus tech llc');
    await page.getByTestId('customer-search-input').press('Enter');
    await page.locator('#impersonate-user-245').click();
    await page.getByRole('button', { name: 'Impersonate' }).click();
    await page.getByRole('button', { name: 'Confirm Impersonate' }).click();

    // Verify impersonation success
    await expect(page.getByText('User impersonated successfully')).toBeVisible();

    // Navigate to playlist page
    await page.goto('/administration/playlist');
    await expect(page).toHaveURL('/administration/playlist');

    //search view
  await page.getByPlaceholder('Search Name').click();
  await page.getByPlaceholder('Search Name').fill('sample playlist test 1');
  await page.locator('tbody button').last().click();
  await page.getByRole('button', { name: 'Confirm Delete?' }).click();
  

})
});