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



  //add event for X-Connect Input Module Group - New Version (X-Connect Input Module Port 1)
  await test.step('Open event‑management and start wizard, add event for group device X-Connect Input Module Group - New Version (X-Connect Input Module Port 1)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });


await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 1 X-Connect Input Module Port 1 ${eventName}');


    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());

  
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();

    await page.getByRole('button', { name: 'Next' }).click();
  });

  await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Connect Input Module Group - New Version (X-Connect Input Module Port 1)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Input Module Configuration (').click();
  await page.getByPlaceholder('Input Close Time').fill('10');
  await page.getByPlaceholder('Input Open Time').fill('10');
  await page.getByPlaceholder('Input Cooldown').fill('10');
  await page.getByText('Next').click();

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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
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




  //add of event group X-Connect Input Module Group - New Version (X-Connect Input Module Port 2) s 
    await test.step('Open event‑management and start wizard, group (X-Connect Input Module Port 2)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 2 X-Connect Input Module Port 2 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Connect Input Module Group - New Version (X-Connect Input Module Port 2)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Input Module Configuration (').click();
    await page.getByPlaceholder('Input Close Time').fill('10');
    await page.getByPlaceholder('Input Open Time').fill('10');
    await page.getByPlaceholder('Input Cooldown').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
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
  



//update of event group X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Activate - 1)
  await test.step('Update the event', async () => {
     // Go back to event management main page
   await page.goto('/event-management');
   await expect(page).toHaveURL(/event-management/);
});
  await test.step('Search for the created event', async () => {
    const searchInput = page.getByPlaceholder('Search Search Event');
    await expect(searchInput).toBeVisible();
    await searchInput.fill("COPYING d5be0e18 Event");
    await searchInput.press('Enter');
  });




  ////add of event groupX-Detect Environmental Group - New Version (X-Detect Environmental Duct Mount)
    await test.step('Open event‑management and start wizard, group (X-Detect Environmental Duct Mount)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);
    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();
// Wait for navigation after clicking
    await Promise.all([
    page.waitForURL(/\/event-management\/manage-event/),
    addEventBtn.click(),
    ]);
// Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
    timeout: 30000,
    });
    const createEventBtn = page.getByRole('button', {
    name: 'Select Basic Configuration',
    });
    createEventBtn.click();
    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill("test 3 X-Detect Environmental Duct Mount ${eventName}");
    await page
    .getByRole('textbox', { name: 'Enter details' })
    .fill(faker.lorem.paragraph());
    await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
    await page.getByText('Tech Innovators Location 3').click();
    await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Detect Environmental Group - New Version (X-Detect Environmental Duct Mount)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
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
    .fill('Mae dino');
    await page
    .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
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




//add event for X-Protect Desk Button Group - New Version (X-Protect Desk Button) 
    await test.step('Open event‑management and start wizard, group (X-Protect Desk Button)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);
    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

// Wait for navigation after clicking
      await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
      await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });
      const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();
    const selectTriggerBtn = page.getByRole('button', {
    name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 4 event x-protect desk button ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
    await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
    await page.getByText('Tech Innovators Location 3').click();
    await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Protect Desk Button Group - New Version (X-Protect Desk Button)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Button Configuration').click();
    await page.getByPlaceholder('Presses to Activate').fill('10');
    await page.getByPlaceholder('Input Cooldown').fill('10');
    await page.getByPlaceholder('Press Hold Time').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
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




//add event for X-Protect Wall Panic Button Group - New Version (X-Protect Wall Panic Button)
   await test.step('Open event‑management and start wizard, group (X-Protect Wall Panic Button)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);
    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();
    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);
    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });
    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();
    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 5 event X-Protect Wall Panic Button ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
    await page.getByRole('button', { name: 'Next' }).click();
  });

  await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Protect Wall Panic Button Group - New Version (X-Protect Wall Panic Button)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Button Configuration').click();
  await page.getByPlaceholder('Presses to Activate').fill('10');
  await page.getByPlaceholder('Input Cooldown').fill('10');
  await page.getByPlaceholder('Press Hold Time').fill('10');
  await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
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






//add event for X-Shield Group - New Version (X-Shield Button)
   await test.step('Open event‑management and start wizard, group X-Shield Button', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);
    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();
    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);
    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });
    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();
    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 6 event x-protect desk button ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();

    await page.getByRole('button', { name: 'Next' }).click();
  });
  await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Shield Group - New Version (X-Shield Button)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Shield Configuration').click();
    await page.locator('div').filter({ hasText: /^Hold Time\*$/ }).getByPlaceholder('Time in seconds').fill('10');
    await page.locator('div').filter({ hasText: /^Button LED Duration\*$/ }).getByPlaceholder('Time in seconds').fill('10');
    await page.locator('div').filter({ hasText: /^Cooldown\*$/ }).getByPlaceholder('Time in seconds').fill('10');
    await page.getByRole('checkbox', { name: 'Enable button cover' }).click();
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
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






//add event for X-Shield Group - New Version (X-Shield Cover)
   await test.step('Open event‑management and start wizard, group (X-Shield Cover)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);
    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();
    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);
    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });
    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();
    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 7 event X-Shield Cover ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
    await page.getByRole('button', { name: 'Next' }).click();
  });
  await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Shield Group - New Version (X-Shield Cover)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Shield Configuration').click();
  await page.getByPlaceholder('Message').fill('test message');
  await page.getByLabel('Enable / Disable').click();
  await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
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
  








//add event for X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Activate - 1)
   await test.step('Open event‑management and start wizard, group X-Wearable Panic Badge Holder Activate - 1', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);
    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();
    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);
    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });
    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();
    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 8 event X-Wearable Panic Badge Holder Activate - 1 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
    await page.getByRole('button', { name: 'Next' }).click();
  });
  await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Activate - 1)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
    // message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
    await page.getByRole('button', { name: 'Submit' }).click();
    const toast = page.getByText('Event has been created successfully');
    await expect(toast).toBeVisible();
  })





  //add event for  X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Activate - 2)
   await test.step('Open event‑management and start wizard, group X-Wearable Panic Badge Holder Activate - 2', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);
    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();
    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);
    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });
    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();
    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 9 event X-Wearable Panic Badge Holder Activate - 2 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());  
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
    await page.getByRole('button', { name: 'Next' }).click();
  });
  await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Activate - 2)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
   await page.getByPlaceholder('Time in seconds').fill('10');
  await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
    // message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
    await page.getByRole('button', { name: 'Submit' }).click();
    const toast = page.getByText('Event has been created successfully');
    await expect(toast).toBeVisible();
  })





  //add event for X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Activate - 3)
   await test.step('Open event‑management and start wizard, group X-Wearable Panic Badge Holder Activate - 3', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);
    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();
    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);
    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });
    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();
    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 10 event X-Wearable Panic Badge Holder Activate - 3 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
    await page.getByRole('button', { name: 'Next' }).click();
  });
  await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Activate - 3)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
  await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
    // message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
    await page.getByRole('button', { name: 'Submit' }).click();
    const toast = page.getByText('Event has been created successfully');
    await expect(toast).toBeVisible();
  })






  //add of event group X-Connect Input Module Group - New Version (X-Wearable Panic Badge Holder Deactivate - 1) 
    await test.step('Open event‑management and start wizard, group (X-Wearable Panic Badge Holder Deactivate - 1)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 11 X-Wearable Panic Badge Holder Deactivate - 1 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Deactivate - 1) ').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
// message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast = page.getByText('Event has been created successfully');
  await expect(toast).toBeVisible();
  })



  //add of event group X-Connect Input Module Group - New Version (X-Wearable Panic Badge Holder Deactivate - 2) 
    await test.step('Open event‑management and start wizard, group (X-Wearable Panic Badge Holder Deactivate - 2)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 12 X-Wearable Panic Badge Holder Deactivate - 2 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Deactivate - 2)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
// message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast = page.getByText('Event has been created successfully');
  await expect(toast).toBeVisible();
  })



  //add of event group X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Deactivate - 3) 
    await test.step('Open event‑management and start wizard, group (X-Wearable Panic Badge Holder Deactivate - 3)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 13 X-Wearable Panic Badge Holder Deactivate - 3 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Panic Badge Holder Group - New Version (X-Wearable Panic Badge Holder Deactivate - 3)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
// message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast = page.getByText('Event has been created successfully');
  await expect(toast).toBeVisible();
  })

  //add of event group X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Activate - 1) 
    await test.step('Open event‑management and start wizard, group (X-Wearable Rechargeable Panic Badge Holder Activate - 1)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 14 X-Wearable Rechargeable Panic Badge Holder Activate - 1 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Activate - 1)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
// message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast = page.getByText('Event has been created successfully');
  await expect(toast).toBeVisible();
  })




   //add of event group X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Activate - 2) 
    await test.step('Open event‑management and start wizard, group (X-Wearable Rechargeable Panic Badge Holder Activate - 2)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 15 X-Wearable Rechargeable Panic Badge Holder Activate - 2 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Activate - 2)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
// message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast = page.getByText('Event has been created successfully');
  await expect(toast).toBeVisible();
  })




 //add of event group X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Activate - 3)  
    await test.step('Open event‑management and start wizard, group (X-Wearable Rechargeable Panic Badge Holder Activate - 3)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 16 X-Wearable Rechargeable Panic Badge Holder Activate - 3 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Activate - 3)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
// message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast = page.getByText('Event has been created successfully');
  await expect(toast).toBeVisible();
  })




   //add of event group X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Deactivate - 1)  
    await test.step('Open event‑management and start wizard, group (X-Wearable Rechargeable Panic Badge Holder Deactivate - 1)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 17 X-Wearable Rechargeable Panic Badge Holder Deactivate - 1 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Deactivate - 1)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
// message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast = page.getByText('Event has been created successfully');
  await expect(toast).toBeVisible();
  })



    //add of event group X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Deactivate - 2)  
    await test.step('Open event‑management and start wizard, group (X-Wearable Rechargeable Panic Badge Holder Deactivate - 2)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 18 X-Wearable Rechargeable Panic Badge Holder Deactivate - 2 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Deactivate - 2)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
// message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast = page.getByText('Event has been created successfully');
  await expect(toast).toBeVisible();
  })



  //add of event group X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Deactivate - 3)   
    await test.step('Open event‑management and start wizard, group (X-Wearable Rechargeable Panic Badge Holder Deactivate - 3)', async () => {
    await page.goto('/event-management');
    await expect(page).toHaveURL(/event-management/);

    const addEventBtn = page.getByRole('button', { name: 'Add Event' });
    await expect(addEventBtn).toBeVisible();

    // Wait for navigation after clicking
    await Promise.all([
      page.waitForURL(/\/event-management\/manage-event/),
      addEventBtn.click(),
    ]);

    // Verify URL with increased timeout
    await expect(page).toHaveURL(/\/event-management\/manage-event/, {
      timeout: 30000,
    });

    const createEventBtn = page.getByRole('button', {
      name: 'Select Basic Configuration',
    });
    createEventBtn.click();

    const selectTriggerBtn = page.getByRole('button', {
      name: 'Select Trigger Event',
    });
    selectTriggerBtn.click();
  });
    await test.step('Fill basic details', async () => {
    const eventNameInput = page.getByPlaceholder('Event Name');
    await expect(eventNameInput).toBeVisible();
    await eventNameInput.click();
    await eventNameInput.fill('test 19 X-Wearable Rechargeable Panic Badge Holder Deactivate - 3 ${eventName}');
    await page
      .getByRole('textbox', { name: 'Enter details' })
      .fill(faker.lorem.paragraph());
      await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
      await page.getByText('Tech Innovators Location 3').click();
      await page.getByRole('button', { name: 'Next' }).click();
  });
    await test.step('Add trigger & add delay', async () => {
    await page.getByLabel('Group').click();
    await page.getByText('X-Wearable Rechargeable Group - New Version (X-Wearable Rechargeable Panic Badge Holder Deactivate - 3)').click();
    await page.getByText('Next').click();
    await page.getByText('Next').click();
    await page.getByText('Badge Configuration').click();
    await page.getByPlaceholder('Time in seconds').fill('10');
    await page.getByText('Next').click();
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
      .fill('Mae dino');
    await page
      .getByRole('option', { name: /mae dino \(\+639273711698\)/ })
      .click();
// message
    await page.locator('textarea').fill(faker.lorem.paragraph());
    await page.getByRole('button', { name: 'Save' }).click();
  });
  await test.step('Submit & confirm', async () => {
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast = page.getByText('Event has been created successfully');
  await expect(toast).toBeVisible();
  })
})
});

