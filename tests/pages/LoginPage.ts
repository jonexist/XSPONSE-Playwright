import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
import test, { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly username = "input#email";
    readonly password = "input#password";
    readonly loginButton = 'button.inline-flex.items-center';
    readonly skip2faButton = 'button#skip-2fa-button';
    readonly No = 'input[value="No"]';

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto(process.env.BASE_DEV_URL as string);
        await this.page.waitForTimeout(3000);
        await this.page.fill(this.username, process.env.TEST_EMAIL as string);
        await this.page.waitForTimeout(1000);
        await this.page.fill(this.password, process.env.TEST_PASSWORD as string);
        await this.page.waitForTimeout(1000);
        await this.page.click(this.loginButton);
        await this.page.waitForTimeout(1000);
        await this.page.click(this.skip2faButton);
        await this.page.waitForTimeout(1000);

        // }

        // async login(username: string, password: string, rememberMe = false) {
        //   if (username) await this.page.fill(this.usernameInput, username);
        //   if (password) await this.page.fill(this.passwordInput, password);
        //   if (rememberMe) await this.page.check(this.rememberMeCheckbox);
        //   await this.page.click(this.loginButton);
    }

}
