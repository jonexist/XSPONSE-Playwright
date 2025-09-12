import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('log in as admin and impersonate customer, Event creation and update event – basic flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });

test.only('log in as admin and impersonate customer, Event creation – basic flow', async ({ page }) => {
    const row = page.locator('tr').filter({ hasText: 'Tech Innovators' });

    // Click the row to select the customer
  await page.getByTestId('customer-search-input').fill('Tech Innovators');
  await page.getByTestId('customer-search-input').press('Enter');
  await page.locator('#impersonate-user-222').click();
  await page.getByRole('button', { name: 'Impersonate' }).click();
  await page.getByRole('button', { name: 'Confirm Impersonate' }).click();

  // Verify that the user is impersonated successfully
    await expect(page.getByText("User impersonated successfully")).toBeVisible();
  
  // helpers
  const hackerVerb = faker.hacker.ingverb().toUpperCase();
  const uid = faker.string.uuid().slice(0, 8);
  const eventName = `${hackerVerb} ${uid} Event`;
  const secondEventName = `${hackerVerb} ${uid} Second Event`;
  const configName = `${hackerVerb} ${uid} Configuration`;




//update of event group X-Protect Desk Button Group - New Version (X-Protect Desk Button) 
  await test.step('Update the event', async () => {
     // Go back to event management main page
   await page.goto('/event-management');
   await expect(page).toHaveURL(/event-management/);
});
  await test.step('Search for the created event', async () => {
    const searchInput = page.getByPlaceholder('Search Search Event');
    await expect(searchInput).toBeVisible();
    await searchInput.fill("test 5 event X-Protect Wall Panic Button");
    await searchInput.press('Enter');
    await page.locator('tr').filter({ hasText: 'test 5 event X-Protect Wall Panic Button' });
    await page.locator('#update-event-629').click();
    await page.getByPlaceholder('Enter details').fill('updated test 5 event');
    await page.getByText('Save and Close').click();
  //verify event update success message
    await expect(page.getByText("Event has been updated successfully")).toBeVisible();
  });


})
});
  
