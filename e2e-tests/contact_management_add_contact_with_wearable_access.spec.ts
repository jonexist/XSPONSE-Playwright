import { test, expect } from '@playwright/test';

test.describe('impersonate Customer and navigate to Contact Management', () => {
  let firstName: string;
  let lastName: string;
  let email: string;
  let phone: string;

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

    test('CRUD for contact management without uploading picture and no data on Contact Access.', async ({ page }) => {
      firstName = 'wearable';
      lastName = 'access';
      email = 'wearable@access.com';
      phone = '1 (555) 123-4567';

      await test.step('Contact list- add new contact with wearable access without profile picture.', async () => {
  
        //Verify if it can add new contact by filling all the details but without contact access and profile pic.
        await page.getByText('Add New Contact').click();

        await page.getByPlaceholder('First Name').click();
        await page.getByPlaceholder('First Name').type(firstName, { delay: 40 });

        await page.getByPlaceholder('Last Name').click();
        await page.getByPlaceholder('Last Name').type(lastName, { delay: 40 });

        await page.getByPlaceholder('example@domain.com').click();
        await page.getByPlaceholder('example@domain.com').type(email, { delay: 40 });

        await page.getByPlaceholder('1 (702) 123-').click();
        await page.getByPlaceholder('1 (702) 123-').type(phone,{ delay: 40 });
        /*
        await page.locator('div').filter({ hasText: /^English \(US\)$/ }).nth(2).click();
        await page.getByRole('option', { name: 'English (US)' }).click();

        await page.locator('div').filter({ hasText: /^Select Group$/ }).nth(3).click();
        await page.getByRole('option', { name: 'Contact Group 1' }).click();
        */
        
        // Check wearable access
        await page.getByLabel('Wearable Access').click();

        // Open the device dropdown (the 3rd matching element in your case)
        await page.locator('div').filter({ hasText: /^Select Wearable Device$/ }).nth(2).click();

        // Select the first option in the dropdown
        await page.getByText('X-Wearable Panic Badge Holder 1511').click();

        // Continue with location selection - single location
        await page.getByText('Select Locations').click();
        await page.getByText('Tech Innovators Main Office').click();
        await page.getByText('Save').click();

        //wait for success message
        await expect(page.getByText('Contact added successfully')).toBeVisible();
      });

      // Verify if newly added contact with wearable access is displayed in the contact list.
      await test.step('View created contact in list.', async () => {
        await page.getByPlaceholder('Search Contact Name').click();
        await page.getByPlaceholder('Search Contact Name').type(firstName + ' ' + lastName, { delay: 40 });
        await page.getByText(firstName + ' ' + lastName).click();
        await page.waitForTimeout(2000);
        });
      
      //View through edit if it captures the wearable access and edit the wearable access and assign to two locations.
      await test.step('Verify if the wearable is being displayed and able to edit the wearable to two locations.', async () => {
        await page.locator('tbody button').first().click();
        await page.getByText('Contact Access').click();
        await page.waitForTimeout(2000);

        //edit wearable locations to two locations
        await page.getByText('Tech Innovators Main Office').click();
        await page.getByText('Tech Innovators Location 2').click();
        await page.getByText('Save').click();

        //wait for confirmation message
        await expect(page.getByText('The contact has been updated successfully.')).toBeVisible();
      });
      await test.step('Verify if it can view the edited contact and can delete the contact', async () => {
        await page.getByPlaceholder('Search Contact Name').click();
        await page.getByPlaceholder('Search Contact Name').type(firstName + ' ' + lastName, { delay: 40 });
        await page.getByText(firstName + ' ' + lastName).click();
        await page.waitForTimeout(2000);

        //Delete the contact
        await page.locator('tbody button').nth(1).click();
        await page.getByText('Confirm Delete').click();
        await expect(page.getByText('Contact deleted successfully.')).toBeVisible(); 
    });
  });
});