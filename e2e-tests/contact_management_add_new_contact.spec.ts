import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


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

  test('add new contact without uploading pic and no data on Contact Access.', async ({ page }) => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    email = faker.internet.email();
    phone = faker.helpers.replaceSymbols('1 (###) ###-####');
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

    await page.locator('div').filter({ hasText: /^English \(US\)$/ }).nth(2).click();
    await page.locator('div').filter({ hasText: /^Select Group$/ }).nth(2).click();
    await page.pause();
    await page.getByText('Save').click();
    await expect(page.getByText('Contact added successfully')).toBeVisible();
  })

});