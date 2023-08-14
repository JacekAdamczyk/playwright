import { test, expect } from '@playwright/test';
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/TodoPage';

test('should be able to register to app', async ({ page }) => {
    const user = new User();
    const signupPage = new SignupPage();
    const todoPage = new TodoPage();

    signupPage.load(page);
    signupPage.signup(page, user);

    const welcomeMessage = todoPage.getWelcomeMessageElement(page);
    await expect(welcomeMessage).toBeVisible();
});
