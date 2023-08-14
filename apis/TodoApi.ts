import { APIRequestContext } from '@playwright/test';
import User from '../models/User';

export default class TodoApi {
    async addItem(request: APIRequestContext, user: User) {
        return await request.post('/api/v1/tasks', {
            data: { item: 'test1', isCompleted: false },
            headers: {
                Authorization: `Bearer ${user.getAccessToken()}`
            }
        });
    }
}
