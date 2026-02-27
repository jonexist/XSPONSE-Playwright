import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('My Profile Test', () => {

    test('User can view profile page', async ({ page }) => {
        const uniquename = `AutoUser_${Date.now()}`;
        const uniqueNumber = Date.now().toString().slice(-10);
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        // Example profile navigation
        await page.click("img[alt='Admin Admin']");
        await page.click("//div[normalize-space(text())='My Profile']");
        await page.waitForTimeout(3000);
        // Verify that the URL is correct
        const currentUrl = page.url();

        if (!currentUrl.includes('https://app.odi.xsponse.com/user-profile')) {
            throw new Error(`❌ Incorrect landing page. Current URL: ${currentUrl}`);
        }

        await page.fill("input[placeholder='First Name']", uniquename);
        await page.fill("input[placeholder='Last Name']", uniquename);
        await page.fill("input[placeholder='Email']", process.env.TEST_EMAIL as string);
        await page.fill("input[placeholder='1 (702) 123-4567']", uniqueNumber);
        await page.click("button[type='submit']");
        const successMessage = page.locator("//div[normalize-space(text())='User updated successfully']");
        await expect(successMessage, "❌ User update success message not displayed").toBeVisible();
        await page.pause();
    });

});