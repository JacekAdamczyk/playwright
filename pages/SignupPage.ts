import { Page } from '@playwright/test';
import User from '../models/User';

export default class SignupPage {
    async load(page: Page) {
        await page.goto('/signup');
    }

    private get firstNameInputId() {
        return 'first-name';
    }
    private get lastNameInputId() {
        return 'last-name';
    }
    private get emailInputId() {
        return 'email';
    }
    private get passwordInputId() {
        return 'password';
    }
    private get confirmPasswordInputId() {
        return 'confirm-password';
    }
    private get submitButtonId() {
        return 'submit';
    }

    async signup(page: Page, user: User) {
        await page.getByTestId(this.firstNameInputId).fill(user.getFirstName());
        await page.getByTestId(this.lastNameInputId).fill(user.getLastName());
        await page.getByTestId(this.emailInputId).fill(user.getEmail());
        await page.getByTestId(this.passwordInputId).fill(user.getPassword());
        await page
            .getByTestId(this.confirmPasswordInputId)
            .fill(user.getPassword());
        await page.getByTestId(this.submitButtonId).click();
    }
}
