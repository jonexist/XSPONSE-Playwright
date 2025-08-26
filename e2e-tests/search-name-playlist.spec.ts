import { test, expect } from '@playwright/test';

test.describe('impersonate Customer and search playlist by name on playlist', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('should able to impersonate customer and search playlist by name', async ({ page }) => {
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

//go to playlist page
await page.getByText('Playlist', { exact: true }).click();
//search for a playlist by name
  await page.getByRole('textbox', { name: 'Search' }).fill('new playlist');

// Get all matching elements
const allTest2Elements = await page.getByText('new playlist').all();
for (const element of allTest2Elements) {
  await expect(element).toBeVisible();

}
}) });