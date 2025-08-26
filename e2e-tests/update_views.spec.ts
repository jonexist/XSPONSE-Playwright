import { test, expect } from '@playwright/test';

test.describe('impersonate Customer and update view', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('should able to impersonate customer and update views', async ({ page }) => {
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


  //search view
  await page.getByPlaceholder('Search Name').click();
  await page.getByPlaceholder('Search Name').fill('sample playlist test 1')

  await page.locator('tbody button').first().click();

  const targetStatus = 'Alaska Time';

 //filter for a playlist by type
    await page.locator('.grow').filter().click();
    const searchInput = page.getByPlaceholder('Search...');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(targetStatus);

//  await page.getByText('Alaska Time').click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('update view');
  await page.getByPlaceholder('Custom Label').click();
  await page.getByPlaceholder('Custom Label').fill('view update');
  await page.getByText('Save Changes').click();

  //verify that the view is updated
    await expect(page.getByText('View has been updated successfully.')).toBeVisible();

}) });
