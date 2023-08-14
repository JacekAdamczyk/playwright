import { APIRequestContext, Page } from 'playwright';
import User from '../models/User';
import TodoApi from '../apis/TodoApi';

export default class NewTodoPage {
    private get newTodoInputId() {
        return 'new-todo';
    }

    private get submitTaskButtonId() {
        return 'submit-newTask';
    }

    async load(page: Page) {
        await page.goto('/todo/new');
    }

    async addNewElement(page: Page, task: string) {
        await page.getByTestId(this.newTodoInputId).fill(task);
        await page.getByTestId(this.submitTaskButtonId).click();
    }

    async addNewElementUsingApi(request: APIRequestContext, user: User) {
        new TodoApi().addItem(request, user);
    }
}
