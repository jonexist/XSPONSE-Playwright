import { test, expect } from '@playwright/test';

test.describe('Navigate to dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display dashboard title', async ({ page }) => {
    await expect(page).toHaveTitle(/Welcome!/);
  });

  test('should display all dashboard sections', async ({ page }) => {
    // Top sections
    await expect(
      page.getByRole('heading', { name: 'Sales Report' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Dealer Summary' })
    ).toBeVisible();

    // Middle sections - may need scrolling
    const dealerStatusHeading = page.getByRole('heading', {
      name: 'Dealer Status Breakdown',
    });
    await dealerStatusHeading.scrollIntoViewIfNeeded();
    await expect(dealerStatusHeading).toBeVisible();

    const maintenanceHeading = page.getByRole('heading', {
      name: 'Renewing Maintenance Breakdown',
    });
    await maintenanceHeading.scrollIntoViewIfNeeded();
    await expect(maintenanceHeading).toBeVisible();

    // Bottom sections - will need scrolling
    const addOnsHeading = page.getByRole('heading', {
      name: 'Renewing Add-Ons Breakdown',
    });
    await addOnsHeading.scrollIntoViewIfNeeded();
    await expect(addOnsHeading).toBeVisible();

    const vouchersHeading = page.getByRole('heading', {
      name: 'Vouchers Breakdown',
    });
    await vouchersHeading.scrollIntoViewIfNeeded();
    await expect(vouchersHeading).toBeVisible();
  });
});
