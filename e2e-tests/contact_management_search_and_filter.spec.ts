import { test, expect } from '@playwright/test';


test.describe('impersonate Customer and check search and filters in contact management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test.only('should able to impersonate Customer and check search and filters in contact management', async ({ page }) => {
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
    
    // Verify search function by contact name
    await page.getByPlaceholder('Search Contact Name').type('john', {delay:20});
    await page.keyboard.press('Enter');

    // Assert search results contain "john"
    const contacts = page.locator('tr', { hasText: 'john' });
    await expect(contacts.first()).toBeVisible();
    await page.waitForTimeout(2000);

    await page.getByPlaceholder('Search Contact Name').click();
    await page.getByPlaceholder('Search Contact Name').fill('');
    await page.getByPlaceholder('Search Contact Name').press('Enter');
    
    //verify if it can filter by group
    await page.locator('div').filter({ hasText: /^Filter By GroupAll Groups$/ }).locator('svg').click();
    await page.locator('li').filter({ hasText: 'Contact Group' }).click();
    await page.waitForTimeout(3000);
    await page.locator('.grow').click();
    await page.getByText('All Groups').click();
    await page.waitForTimeout(2000);


})
});