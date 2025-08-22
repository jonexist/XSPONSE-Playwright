 import { test, expect } from '@playwright/test';
 
 
 test.describe('impersonate Customer and add views on playlist', () => {
   test.beforeEach(async ({ page }) => {
     await page.goto('/account-management/customer');
   });
 
 test.only('should able to impersonate customer and add website views on playlist', async ({ page }) => {
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
 await page.locator('div').filter({ hasText: /^Website$/ }).locator('svg').click();
  await page.getByPlaceholder('Enter Name').click();
  await page.getByPlaceholder('Enter Name').fill('test 7');
  await page.getByPlaceholder('Ex. https://google.com').click();
  await page.getByPlaceholder('Ex. https://google.com').fill('https://www.google.com/');
  await page.getByText('Save Changes').click();
 
 
   //verify that the view is added
     await expect(page.getByText('View created successfully')).toBeVisible();
 
 
 })
 });
