import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Dealer impersonation and customer creation flow', async ({ page }) => {
  // Navigate to dealer management page
  await page.goto('/account-management/dealer');

  // List of dealers to choose from
  // const listOfDealers = [
  //   'Smitham, Rowe and Johnson',
  //   'Technologia Company',
  //   'Treutel - Schroeder',
  //   'Mitchell Inc',
  //   'Purdy Inc',
  // ];

  // Pick a random dealer from the list
  // const randomDealer =
  //   listOfDealers[Math.floor(Math.random() * listOfDealers.length)];

  // Search for specific dealer
  const dealerSearchInput = page.getByRole('textbox', {
    name: 'Search Dealer',
  });

  await dealerSearchInput.fill('Smitham, Rowe and Johnson');

  // Select dealer from results
  await expect(
    page.getByRole('cell', { name: 'Smitham, Rowe and Johnson' })
  ).toBeVisible();

  // Click impersonate user button
  await page.locator('tbody button').first().click();

  // Select user to impersonate
  const impersonateHeading = page.getByRole('heading', {
    name: 'Impersonate User',
  });
  await expect(impersonateHeading).toBeVisible();

  await page.getByRole('button', { name: 'Impersonate' }).click();
  await page.getByRole('button', { name: 'Confirm Impersonate' }).click();
  await expect(page.getByText('User impersonated successfully')).toBeVisible();

  // Navigate to customer management page
  await page.goto('/account-management/customer');
  await page.getByText('Add Customer').click();

  // Fill out Customer Information
  await expect(page.getByText('Customer Information')).toBeVisible();

  const customerName = faker.company.name();
  await page.getByPlaceholder('Company Name').fill(customerName);

  // Fill out Primary Contact
  const firstNameInput = page.getByPlaceholder('First Name');
  await firstNameInput.scrollIntoViewIfNeeded();
  await firstNameInput.fill(faker.person.firstName());

  await page.getByPlaceholder('Last Name').fill(faker.person.firstName());
  await page.getByPlaceholder('Email').fill(faker.internet.email());
  await page
    .getByPlaceholder('1 (702) 123-')
    .fill(faker.phone.number({ style: 'national' }));

  // Fill out Address Information
  const addressSection = page.getByText('Address Information');
  await addressSection.scrollIntoViewIfNeeded();

  await page
    .getByPlaceholder('Address Line 1')
    .fill(faker.location.streetAddress());
  await page
    .getByPlaceholder('Address Line 2')
    .fill(faker.location.secondaryAddress());

  // Select state
  const stateDropdown = page
    .locator('div')
    .filter({ hasText: /^State Select\.\.\.$/ })
    .locator('svg');
  await stateDropdown.scrollIntoViewIfNeeded();
  await stateDropdown.click();
  await page.getByText('Alaska').click();

  // Select city
  const cityDropdown = page
    .locator('div')
    .filter({ hasText: /^City Select\.\.\.$/ })
    .locator('svg');
  await cityDropdown.click();
  await page.getByText('Aleutians East Borough').click();

  // Fill ZIP Code and Save
  await page.getByPlaceholder('Zip Code').fill(faker.location.zipCode());
  await page.getByText('Save').click();
  await expect(page.getByText('Customer created successfully')).toBeVisible();

  // Search for newly created customer
  const searchCustomerInput = page.getByPlaceholder('Search Customer');
  await searchCustomerInput.fill(customerName);
  await page.locator('td').filter({ hasText: customerName }).click();
});
