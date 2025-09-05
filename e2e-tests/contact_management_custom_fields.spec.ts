import { test, expect } from '@playwright/test';

test.describe('Impersonate Customer and manage Contact Custom Fields', () => {
  let randomFieldName: string;
  let updatedFieldName: string;
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');

    // Impersonate customer
    await test.step('Impersonate customer', async () => {
      await page.getByTestId('customer-search-input').type('tech innovators llc', { delay: 20 });
      await page.getByTestId('customer-search-input').press('Enter');
      await page.locator('#impersonate-user-222').click();
      await page.getByRole('button', { name: 'Impersonate' }).click();
      await page.getByRole('button', { name: 'Confirm Impersonate' }).click();

      await expect(page.getByText('User impersonated successfully')).toBeVisible();
    });

    // Navigate to contact management
    await test.step('Navigate to Contact Management', async () => {
      await page.locator('span').filter({ hasText: 'Administration' }).click();
      await page.locator('a').filter({ hasText: 'Contacts' }).click();
    });
  });

  test('CRUD flow for Contact Custom Fields', async ({ page }) => {
    randomFieldName = 'sample field';

    //Verify if it can add custom field
    await test.step('Add a new custom field', async () => {
      await page.getByText('Manage Custom Fields').click();
      await page.getByRole('textbox', { name: 'Field Name *' }).fill(randomFieldName);
      await page.locator('div').filter({ hasText: /^Text$/ }).nth(2).click();
      await page.getByRole('option', { name: 'Text' }).click();
      await page.getByRole('button', { name: 'Save' }).click();

      await expect(page.getByText('Custom fields added successfully')).toBeVisible();
      await expect(page.getByText(randomFieldName)).toBeVisible();

      await page.locator('#close-manage-custom-fields').click();
    });

    // Verify the new custom field appears in the Add New Contact form
    await test.step('Verify field appears in Add New Contact', async () => {
      await page.getByText('Add New Contact').click();
      await expect(page.getByText(randomFieldName)).toBeVisible();
      await page.getByText('Cancel').click();
    });
  /*
    // Verify if Update functionality works for the created custom field
    await test.step('Update the custom field', async () => {
      updatedFieldName = 'updated sample field';
      await page.getByText('Manage Custom Fields').click();
      const fieldRow = page.locator('tr', { hasText: randomFieldName });
      await expect(fieldRow).toBeVisible();

      await fieldRow.getByRole('textbox', { name: /Field Name/i }).fill(updatedFieldName);
      await fieldRow.locator('#update-contact-custom-field').click();

      await expect(page.getByText(updatedFieldName)).toBeVisible();
    });
  */

    // Verify if Delete functionality works for the created custom field
    await test.step('Delete the created custom field', async () => {
      await page.getByText('Manage Custom Fields').click();
      await page.locator('form')
        .filter({ hasText: randomFieldName })
        .locator('#remove-contact-custom-field')
        .last()
        .click();
      await page.getByRole('button', { name: 'Remove' }).click();
      await expect(page.getByText('Custom field deleted successfully')).toBeVisible();
    });
  });
});
