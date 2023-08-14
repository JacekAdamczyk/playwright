import { Page } from 'playwright';

export default class TodoPage {
    private get welcomeMessageId() {
        return 'welcome';
    }

    private get deleteTaskButtonId() {
        return 'delete';
    }

    private get newItemId() {
        return 'todo-text';
    }

    getWelcomeMessageElement(page: Page) {
        return page.getByTestId(this.welcomeMessageId);
    }

    async load(page: Page) {
        await page.goto('/todo');
    }

    async deleteElement(page: Page) {
        await page.getByTestId(this.deleteTaskButtonId).click();
    }

    async getNewElement(page: Page) {
        return page.getByTestId(this.newItemId);
    }
}
