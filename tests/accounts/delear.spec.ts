import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const uniqueName = `Uniquestrings_${Date.now()}`;
const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
test.setTimeout(60000);
test.describe('Application Test Suite - 7 Test Cases', () => {

    // Test Case 1: Verify Login Page Loads
    test('TC01 - Add Dealer', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await page.click("//span[normalize-space(text())='Accounts']");
        await page.click("//span[normalize-space(text())='Dealers']");
        await expect(page.locator("//p[normalize-space(text())='Dealer Management']")).toBeVisible();
        console.log("✅ Correct Landing Page - Dealer Management visible");

        await page.click("#add-dealer-button")
        // await page.click("button#skip-2fa-button");
        // await page.waitForTimeout(1000);
        // await page.click("(//input[@data-slot='input'])[1]")
        await page.fill("input[placeholder='Company Name']", uniqueName) //Company Name
        await page.fill("input[placeholder='Company Website']", process.env.BASE_DEV_URL as string) //Company Website
        await page.click("(//div[contains(@class,'grow pl-2.5')])[1]") //Select Account Type
        await page.click("//li[normalize-space(text())='X-Shield']") //Key Interest
        await page.click("button[role='switch']") //Allow purchase with terms
        await page.pause();
        await page.fill("input[placeholder='Address Line 1']", uniqueName) //Address Line 1
        await page.fill("input[placeholder='Address Line 2']", uniqueName) //Address Line 2
        await page.click("//div[@class='grow pl-2.5 py-2 pr-2 flex flex-wrap gap-1']/p[text()='Select...']");
        await page.fill("//input[@placeholder='Search...']", "Alabama")
        await page.getByRole('option', { name: 'Alabama' }).click();
        await page.click("//p[text()='Select...']");
        await page.fill("//input[@type='text' and @placeholder='Search...']", "Abbeville")
        await page.fill("input[placeholder='Zip Code']", "29620") //Zip Code

        await page.fill("input[name='primary_contact_title']", "Mr.") //Title
        await page.fill("input[name='first_name']", uniqueName) //First Name
        await page.fill("input[name='last_name']", uniqueName) //Last Name
        await page.fill("input[name='email']", uniqueEmail) //Contact Email
        await page.locator('input[name="phone_number"]').click();
        await page.locator('input[name="phone_number"]').fill('+1 (987) 654-32343');
        await page.fill("input[placeholder='Password']", "@Password123") //Password

        await page.fill("input[name='secondary_contact_title']", "Ms.") //Title
        await page.fill("input[name='secondary_contact_first_name']", uniqueName) //First Name
        await page.fill("input[name='secondary_contact_last_name']", uniqueName) //Last Name
        await page.fill("input[name='secondary_contact_email']", uniqueEmail) //Confirm Password
        await page.locator('input[name="secondary_contact_phone_number"]').click();
        await page.locator('input[name="secondary_contact_phone_number"]').fill('+1 (545) 678-98678');
        await page.click("button[type='submit']")
        await page.waitForTimeout(3000)

    });

    //     // Test Case 2: Invalid Login
    //     test('TC02 - Invalid login shows error message', async ({ page }) => {
    //         await page.goto('https://example.com/login');
    //         await page.fill('input[name="email"]', 'wrong@email.com');
    //         await page.fill('input[name="password"]', 'wrongpassword');
    //         await page.click('button[type="submit"]');

    //         await expect(page.locator('text=Invalid credentials')).toBeVisible();
    //     });

    //     // Test Case 3: Valid Login
    //     test('TC03 - Valid login redirects to dashboard', async ({ page }) => {
    //         await page.goto('https://example.com/login');
    //         await page.fill('input[name="email"]', 'testuser@example.com');
    //         await page.fill('input[name="password"]', 'Password123');
    //         await page.click('button[type="submit"]');

    //         await expect(page).toHaveURL(/.*dashboard/);
    //     });

    //     // Test Case 4: Dashboard Elements Visible
    //     test('TC04 - Dashboard elements are visible after login', async ({ page }) => {
    //         await page.goto('https://example.com/dashboard');

    //         await expect(page.locator('text=Welcome')).toBeVisible();
    //         await expect(page.locator('nav')).toBeVisible();
    //     });

    //     // Test Case 5: Update Profile
    //     test('TC05 - User can update profile information', async ({ page }) => {
    //         await page.goto('https://example.com/profile');

    //         await page.fill('input[name="firstName"]', 'John');
    //         await page.fill('input[name="lastName"]', 'Doe');
    //         await page.click('button:has-text("Save")');

    //         await expect(page.locator('text=Profile updated successfully')).toBeVisible();
    //     });

    //     // Test Case 6: Logout
    //     test('TC06 - User can logout successfully', async ({ page }) => {
    //         await page.goto('https://example.com/dashboard');
    //         await page.click('button:has-text("Logout")');

    //         await expect(page).toHaveURL(/.*login/);
    //     });

    //     // Test Case 7: Protected Route Redirect
    //     test('TC07 - Unauthorized user redirected to login page', async ({ page }) => {
    //         await page.goto('https://example.com/dashboard');

    //         await expect(page).toHaveURL(/.*login/);
    //     });

});