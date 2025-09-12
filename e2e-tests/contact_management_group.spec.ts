import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


test.describe('impersonate Customer and navigate to Contact Management', () => {
  let groupName: string;
  let updatedName: string;

  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');

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
   });

   // Create Group and edit its group name, doesn't include the edit and add another contact to that group.
   //Also did not include the delet group part as it currently delete all the associated contact to it.
  test('Contact Management - Create Group and edit its group name.', async ({ page }) => {
    groupName = 'Group1';

    // Navigate to Group tab
    await test.step('Contact list- add new contact with wearable access without profile picture.', async () => {
      await page.locator('button[role="tab"]').filter({ hasText: 'Group' }).first().click();
      await page.getByText('Add New Group').click();

      //create group name and add at least one contact.
      await page.getByRole('textbox', { name: 'Enter Group Name' }).click();
      await page.getByRole('textbox', { name: 'Enter Group Name' }).type(groupName, {delay:30});
      await page.getByRole('textbox', { name: 'Search Name/Number' }).first().click();
      await page.getByRole('textbox', { name: 'Search Name/Number' }).first().fill('sample');
      await page.getByText('sample -').click();
      await page.getByRole('button', { name: 'Save' }).click();

      //wait for confirmation message
      await expect(page.getByText('Contact Group added')).toBeVisible(); 
      await page.waitForTimeout(2000);

      //close tab after saving
      await page.getByRole('button', { name: 'Close' }).nth(1).click();

    });

    await test.step('Search the created group and verify if it exists.', async () => {
      await page.getByPlaceholder('Search Group Name').click();
      await page.getByPlaceholder('Search Group Name').fill(groupName);
      await page.getByText(groupName).first().click();
      await page.waitForTimeout(2000);
    });

    await test.step('Edit the created group name and verify if the changes are saved.', async () => {
      updatedName = groupName + '- updated';

      await page.locator('.align-middle > button').first().click();
      await page.getByRole('textbox', { name: 'Enter Group Name' }).click();
      await page.getByRole('textbox', { name: 'Enter Group Name' }).fill(updatedName);
      
      await page.getByRole('button', { name: 'Save' }).click();

      //wait for confirmation message
      await expect(page.getByText('Contact Group updated')).toBeVisible();
      await page.waitForTimeout(2000);

      //close tab after updating
      await page.getByRole('button', { name: 'Close' }).nth(1).click();
    });

    await test.step('Search the updated group, verify if it exists', async () => {
      await page.getByPlaceholder('Search Group Name').click();
      await page.getByPlaceholder('Search Group Name').fill(updatedName);
      await page.getByText(updatedName).first().click();

      // view the updated group with the use of edit button
      await page.locator('.align-middle > button').first().click();
      await page.waitForTimeout(4000);
      await page.getByRole('button', { name: 'Close' }).nth(1).click();

    });
  });
});