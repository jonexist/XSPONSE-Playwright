 import { test, expect } from '@playwright/test';
 
 
 test.describe('impersonate Customer and add views on playlist', () => {
   test.beforeEach(async ({ page }) => {
     await page.goto('/account-management/customer');
   });
 
 test.only('should able to impersonate customer and add message views on playlist', async ({ page }) => {
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
 
 
   //add views
   await page.getByRole('button', { name: 'Add View' }).click();
   //fill infomation
 await page.locator('div').filter({ hasText: /^Message$/ }).click();
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('test 7');
  await page.locator('select[name="message_type"]').selectOption('clear');
  await page.locator('input[name="title"]').click();
  await page.locator('input[name="title"]').fill('test 7');
  await page.locator('input[name="message"]').click();
  await page.locator('input[name="message"]').fill('this is a test 7');
  await page.locator('input[name="color"]').click();
  await page.locator('input[name="color"]').fill('#4023d1');
  await page.locator('input[name="icon"]').click();
  await page.locator('input[name="icon"]').fill('testing');
  await page.getByText('Save Changes').click();
 
   //verify that the view is added
     await expect(page.getByText('View created successfully')).toBeVisible();
 
 
 })
 });
