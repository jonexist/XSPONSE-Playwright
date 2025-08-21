import { test, expect } from '@playwright/test';

test.describe('impersonate Customer and filter by type on playlist', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('should able to impersonate customer and filter by type on playlist', async ({ page }) => {
    const row = page.locator('tr').filter({ hasText: 'Nexus Tech LLC' });

    // Click the row to select the customer
  await page.getByTestId('customer-search-input').fill('nexus tech llc');
  await page.getByTestId('customer-search-input').press('Enter');
  await page.locator('#impersonate-user-245').click();
  await page.getByRole('button', { name: 'Impersonate' }).click();
  await page.getByRole('button', { name: 'Confirm Impersonate' }).click();

  // Verify that the user is impersonated successfully
    await expect(page.getByText("User impersonated successfully")).toBeVisible();

  //navigate to /administration/playlist
  await page.goto('/administration/playlist');

  // Verify that the page has loaded
  await expect(page).toHaveURL('/administration/playlist');
  const targetStatus = 'Digital Clock';

 //filter for a playlist by type
    await page.locator('.grow').last().click();
    const searchInput = page.getByPlaceholder('Search...');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(targetStatus);

    const statusOption = page.getByRole('option', { name: targetStatus, exact: true });
    await expect(statusOption).toBeVisible();
    await statusOption.click();
  
})
 });