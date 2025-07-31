import { test, expect } from '@playwright/test';

test.describe('Change Status', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });
test('should able to change status', async ({ page }) => {
  const row = page.locator('tr').filter({ hasText: 'Nexus Innovations Inc.' });

 // Click the row to select the customer
  await page.getByRole('row', { name: 'Nexus Innovations Inc.' }).getByRole('button').nth(3).click();
  await page.getByRole('button', { name: 'Change Status' }).click();

 // Optional: Add verification steps
    await expect(page.getByText('Customer user status toggled successfully')).toBeVisible();
}) });
