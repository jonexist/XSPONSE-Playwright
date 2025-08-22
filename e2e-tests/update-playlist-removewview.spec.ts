import { test, expect } from '@playwright/test';

test.describe('impersonate Customer and update playlist remove view', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('should able to impersonate customer and update playlist', async ({ page }) => {
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
  await page.locator('tr').filter({ hasText: 'new playlist' }).locator('button').nth(0).click();
  await page.getByText('Next').click();

  //select views to remove
  await page.locator('tr').filter({ hasText: 'view 1' }).locator('button').nth(1).click();
  await page.getByText('Save').click();

  // Verify that the playlist was updated successfully
    await expect(page.getByText('Your playlist has been updated.')).toBeVisible();
    


}) });