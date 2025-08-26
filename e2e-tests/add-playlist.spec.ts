import { test, expect } from '@playwright/test';

test.describe('impersonate Customer and search playlist by name on playlist', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test('should able to impersonate customer and add playlist', async ({ page }) => {
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
  await page.getByRole('button', { name: 'Add Playlist' }).click();

// Fill in the playlist name
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('new playlist');
  await page.locator('textarea[name="details"]').click();
  await page.locator('textarea[name="details"]').fill('this is a Newplaylist');
  await page.getByText('Next').click();

//2nd step of adding playlist
 await page.getByText('Add View', { exact: true }).click();
 await page.getByRole('checkbox', { name: 'Select view sample playlist' }).nth(2).click();
 await page.getByRole('button', { name: 'Add' }).click();
 await page.getByText('Save').click();

 // Verify that the playlist was added successfully
    await expect(page.getByText('Your playlist has been created')).toBeVisible();

}) });