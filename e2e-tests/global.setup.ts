import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

setup.describe('Authentication Tests', () => {
  setup.beforeEach(async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
  });

  setup('should display login form', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  setup('should log in with valid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page
      .getByRole('textbox', { name: 'Email' })
      .fill(process.env.TEST_EMAIL || '');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page
      .getByRole('textbox', { name: 'Password' })
      .fill(process.env.TEST_PASSWORD || '');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForURL('/dashboard');
    await page.context().storageState({ path: './playwright/.auth/user.json' });
  });
});
