import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Create Dealer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/dealer');
  });

  test('should able to search for a dealer', async ({ page }) => {
    // Fill the search input with a dealer name
    const dealerName = 'Horizon Tech Logistics, LLC';
    const searchInput = page.getByRole('textbox', { name: 'Search Dealer' });

    // Verify search input is empty initially
    await expect(searchInput).toHaveValue('');

    // Perform search
    await searchInput.fill(dealerName);

    // Verify search results
    await expect(page.getByText(dealerName)).toBeVisible();

    // Clear search and verify it's empty
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
  });

  test('should create a new dealer with all fields', async ({ page }) => {
    // Click Add Dealer button
    await page.getByRole('button', { name: 'Add Dealer' }).click();

    // Fill Company Information
    await page
      .getByRole('textbox', { name: 'Company Name' })
      .fill(faker.company.name());
    await page
      .getByRole('textbox', { name: 'Company Website' })
      .fill(faker.internet.url());

    // Select Product
    const productDropdown = page.locator('.grow').first();
    await productDropdown.click();
    await page.getByRole('option', { name: 'X-Shield' }).click();

    // Fill Address Information
    await page
      .getByRole('textbox', { name: 'Address Line 1' })
      .fill(faker.location.street());
    await page
      .getByRole('textbox', { name: 'Address Line 2' })
      .fill(faker.location.secondaryAddress());

    // Select Country
    await page
      .locator('div')
      .filter({ hasText: /^United States$/ })
      .nth(2)
      .click();
    await page
      .getByRole('textbox', { name: 'Search...' })
      .fill('united states');
    await page
      .getByRole('option', { name: 'United States', exact: true })
      .click();

    // Select State
    await page.locator('div:nth-child(4) > .relative > div > .grow').click();
    await page.getByRole('textbox', { name: 'Search...' }).fill('new york');
    await page.getByRole('option', { name: 'New York' }).click();

    // Select City
    await page
      .locator('div')
      .filter({ hasText: /^Select\.\.\.$/ })
      .nth(2)
      .click();
    await page.getByRole('textbox', { name: 'Search...' }).fill('Adams');
    await page.getByRole('option', { name: 'Adams', exact: true }).click();

    await page
      .getByPlaceholder('Zip Code')
      .fill(faker.number.int({ min: 10000, max: 99999 }).toString());

    // Scroll to Primary Contact section and fill
    const primaryContactTitle = page.locator(
      'input[name="primary_contact_title"]'
    );
    await primaryContactTitle.scrollIntoViewIfNeeded();
    await primaryContactTitle.fill(faker.person.prefix());
    await page
      .locator('input[name="first_name"]')
      .fill(faker.person.firstName());
    await page.locator('input[name="last_name"]').fill(faker.person.lastName());
    await page.locator('input[name="email"]').fill(faker.internet.email());
    await page.locator('input[name="phone_number"]').fill(faker.phone.number());

    // Scroll to Secondary Contact section and fill
    const secondaryContactTitle = page.locator(
      'input[name="secondary_contact_title"]'
    );
    await secondaryContactTitle.scrollIntoViewIfNeeded();
    await secondaryContactTitle.fill(faker.person.prefix());
    await page
      .locator('input[name="secondary_contact_first_name"]')
      .fill(faker.person.firstName());
    await page
      .locator('input[name="secondary_contact_last_name"]')
      .fill(faker.person.lastName());
    await page
      .locator('input[name="secondary_contact_email"]')
      .fill(faker.internet.email());
    await page
      .locator('input[name="secondary_contact_phone_number"]')
      .fill(faker.phone.number());

    await page.getByRole('button', { name: 'Save' }).click();

    // Optional: Add verification steps
    await expect(page.getByText('Dealer created successfully')).toBeVisible();
  });
});
