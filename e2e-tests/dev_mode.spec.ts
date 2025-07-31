import { test, expect } from '@playwright/test';

test.describe('Change devmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account-management/customer');
  });
test('should able to change dev mode', async ({ page }) => {
  const row = page.locator('tr').filter({ hasText: 'Nexus Innovations Inc.' });

 // Click the row to select the customer
  await row.getByRole('switch').click();

 // Optional: Add verification steps
    await expect(page.getByText('Dev mode status has been changed')).toBeVisible();
}) });
