import { test, expect } from '@playwright/test';


test.describe('impersonate Customer and navigate to Contact Management', () => {
  let randomFieldName: string;
  let updatedFieldName: string;

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

    test('Contact list- add new or manage custom fields', async ({ page }) => {
      randomFieldName = "sample field";

      //Verify if it can add new field or manage custom field.
      await page.getByText('Manage Custom Fields').click();
      await page.getByRole('textbox', { name: 'Field Name *' }).click();
      await page.getByRole('textbox', { name: 'Field Name *' }).fill(randomFieldName);
      await page.locator('div').filter({ hasText: /^Text$/ }).nth(2).click();
      await page.getByRole('option', { name: 'Text' }).click();
      await page.getByRole('button', { name: 'Save' }).click();
      
      //Verify if the field is successfully added.
      await expect(page.getByText('Custom fields added successfully')).toBeVisible();
      await expect(page.getByText(randomFieldName)).toBeVisible();
   });

    test('Contact list- verify if the created field is in the add new contact page', async ({ page }) => {

        //Verify if the added field is present in add new contact page.
        await page.getByText('Add New Contact').click();
        
        //Verify if the field is successfully added.
        //await expect(page.getByText(randomFieldName)).toBeVisible();
        await page.getByText(randomFieldName).click();
        await page.waitForTimeout(2000);

        // Cancel adding new contact
        await page.getByText('Cancel').click();
    });
    /* will update later
    test('Contact list- Edit the created custom field', async ({ page }) => {
      updatedFieldName = randomFieldName + ' updated';

      // Open Manage Custom Fields
      await page.getByText('Manage Custom Fields').click();

      // Locate the row containing the created field and edit it
      const fieldRow = page.locator('tr', { hasText: randomFieldName });
      await expect(fieldRow).toBeVisible();

      // Click into the textbox and update the value
      await fieldRow.getByRole('textbox', { name: /Field Name/i }).fill(updatedFieldName);

      // Click the update button inside the same row
      await fieldRow.locator('#update-contact-custom-field').click();

      // Verify the updated name appears
      await expect(page.getByText(updatedFieldName)).toBeVisible();
      await page.pause();
        // Cancel adding new contact
      await page.getByText('Cancel').click();
      
   });
   */  
    test('Contact list- Delete the created custom field', async ({ page }) => {
      // Open Manage Custom Fields
      await page.getByText('Manage Custom Fields').click();

      //locate that field and delete it
      await page.locator('form').filter({ hasText: randomFieldName }).locator('#remove-contact-custom-field').last().click();
      await page.getByRole('button', { name: 'Remove' }).click();
      await expect(page.getByText('Custom field deleted successfully')).toBeVisible();
    });
});
