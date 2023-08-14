import { test, expect } from '@playwright/test';
import User from '../models/User';
import TodoPage from '../pages/TodoPage';
import NewTodoPage from '../pages/NewTodoPage';

test.describe('Todo tests', () => {
    let user: User;
    const todoPage = new TodoPage();
    const newTodoPage = new NewTodoPage();

    test.beforeEach(async ({ request, context, baseURL }, testInfo) => {
        console.log(`Running ${testInfo.title}`);

        user = new User();
        await user.signupUsingApi(request, user, context);
    });

    test('Should be able to add new todo', async ({ page }) => {
        const taskName = 'Something';
        await newTodoPage.load(page);
        await newTodoPage.addNewElement(page, taskName);

        const newItem = await todoPage.getNewElement(page);
        await expect(newItem).toHaveText(taskName);
    });

    test('Should delete todo', async ({ page, request }) => {
        await newTodoPage.addNewElementUsingApi(request, user);
        await todoPage.load(page);
        await todoPage.deleteElement(page);

        const newItem = await todoPage.getNewElement(page);
        await expect(newItem).toHaveCount(0);
    });
});
