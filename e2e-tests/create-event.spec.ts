import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Event creation – basic flow', async ({ page }) => {
  // helpers
  const hackerVerb = faker.hacker.ingverb().toUpperCase();
  const uid = faker.string.uuid().slice(0, 8);
  const eventName = `${hackerVerb} ${uid} Event`;
  const configName = `${hackerVerb} ${uid} Configuration`;

  await test.step('Open event‑management and start wizard', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();
    await addEventBtn.click();

    await page
      .getByRole('button', { name: 'Select Basic Configuration' })
      .click();
    await page.getByRole('button', { name: 'Select Trigger Event' }).click();
  });

  await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByRole('textbox', { name: 'Event Name' });
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.fill(eventName);

    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());

    await page
      .locator('div')
      .filter({ hasText: /^Select\.\.\.$/ })
      .nth(2)
      .click();
    await page
      .getByRole('option', { name: 'XSponse Default Location' })
      .click();

    await page.getByRole('button', { name: 'Next' }).click();
  });

  await test.step('Skip trigger & add delay', async () => {
    const noTriggerCheckbox = page.getByRole('checkbox', {
      name: 'No Trigger',
    });
    await noTriggerCheckbox.scrollIntoViewIfNeeded();
    await expect(noTriggerCheckbox).toBeVisible();
    await noTriggerCheckbox.check();

    await page
      .getByRole('button', { name: 'Continue with no trigger' })
      .click();
    await page.getByRole('button', { name: 'Yes' }).click();

    const delayInput = page.getByPlaceholder('Enter Time Delay (e.g. 3, 4,');
    await delayInput.fill('5');

    await page
      .locator('div')
      .filter({ hasText: /^Select\.\.\.$/ })
      .nth(2)
      .click();
    await page.getByRole('option', { name: 'Second' }).click();

    await page.getByRole('button', { name: 'Add Delay' }).click();
  });

  await test.step('Add SMS action', async () => {
    await page.getByRole('button', { name: 'Add Action' }).click();
    await page.getByRole('button', { name: 'Select External Action' }).click();
    await page.getByRole('button', { name: 'Select' }).nth(1).click();

    await page.getByRole('textbox', { name: /^Title$/ }).fill(configName);

    // recipient search
    await page.getByText('Select recipients').click();
    await page
      .getByRole('textbox', { name: 'Search...' })
      .fill('Aira Villanueva');
    await page
      .getByRole('option', { name: /Aira Villanueva \(\+639212410966\)/ })
      .click();

    // message
    await page.locator('textarea').fill(faker.lorem.paragraph());

    await page.getByRole('button', { name: 'Save' }).click();
  });

  await test.step('Submit & confirm', async () => {
    await page.getByRole('button', { name: 'Submit' }).click();
    const toast = page.getByText('Event has been created successfully');
    await expect(toast).toBeVisible();
  });
});
