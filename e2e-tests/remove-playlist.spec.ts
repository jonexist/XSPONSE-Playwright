import { test, expect } from '@playwright/test';
test.describe('impersonate Customer and search playlist by name on playlist', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('should able to impersonate customer and remove playlist', async ({ page }) => {
    const customerrow = page.locator('tr').filter({ hasText: 'Nexus Tech LLC' });
     const playlistrow = page.locator('tr').filter({ hasText: 'playlist1' });

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
//remove playlist
await page.locator ('tr').filter({hasText: 'playlist1'}).locator('button').nth(1).click();
await page.getByRole('button', { name: 'Confirm Delete?' }).click();

//optional: verify that the playlist is removed
await expect(page.getByText("Your playlist has been deleted.")).toBeVisible(); 


}) });