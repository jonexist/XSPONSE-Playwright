import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.setTimeout(60000);

test.describe('Application Test Suite - 7 Test Cases', () => {

    test('TC01 - Add Fulfillment', async ({ page }) => {

        const uniqueName = `Uniquestrings_${Date.now()}`;
        const uniqueEmail = `testuser_${Date.now()}@gmail.com`;

        const loginPage = new LoginPage(page);
        await loginPage.goto();

        // Navigate to Fulfillment
        await page.click("//span[normalize-space(text())='Accounts']");
        await page.click("//span[normalize-space(text())='Fulfillment']");

        // Verify correct page
        await expect(
            page.locator("//p[normalize-space(text())='Fulfillment Management']")
        ).toBeVisible();

        console.log("✅ Correct Landing Page - Fulfillment Management visible");

        // Click Add Fulfillment
        await page.click("#add-fulfillment");

        // Fill Form
        await page.fill("input[placeholder='First Name']", uniqueName);
        await page.fill("input[placeholder='Last Name']", uniqueName);
        await page.fill("input[placeholder='Email']", uniqueEmail);
        await page.locator("//div[text()='Phone']/following-sibling::input")
            .fill('+1 (987) 654-32343');
        await page.fill("input[placeholder='Password']", "@Password123");

        // Submit form
        await page.click("button[type='submit']");

        // Verify Email Appears in Table
        const emailCell = page.locator(
            `//table//td[normalize-space()='${uniqueEmail}']`
        );

        await expect(
            emailCell,
            `❌ Email ${uniqueEmail} should appear in the Fulfillment list`
        ).toBeVisible({ timeout: 10000 });

        // Optional: Ensure it appears only once (uniqueness check)
        await expect(emailCell).toHaveCount(1);

        console.log(`✅ Email ${uniqueEmail} successfully displayed in list`);

    });

});