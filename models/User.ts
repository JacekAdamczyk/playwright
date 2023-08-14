import { faker } from '@faker-js/faker';
import UserApi from '../apis/UserApi';
import { APIRequestContext, BrowserContext } from 'playwright';
import config from '../playwright.config';

export default class User {
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private accessToken: string;
    private userId: string;

    constructor() {
        this.firstName = faker.person.firstName();
        this.lastName = faker.person.lastName();
        this.email = faker.internet.email();
        this.password = 'abc1234abc1234';
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getAccessToken() {
        return this.accessToken;
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    getUserId() {
        return this.userId;
    }

    setUserId(userId: string) {
        this.userId = userId;
    }

    async signupUsingApi(
        request: APIRequestContext,
        user: User,
        context: BrowserContext
    ) {
        const baseURL = config.use?.baseURL;
        const response = await new UserApi().signup(request, user);
        const responseBody = await response.json();
        user.setAccessToken(responseBody.access_token);
        user.setUserId(responseBody.userID);

        await context.addCookies([
            {
                name: 'access_token',
                value: user.getAccessToken(),
                url: baseURL
            },
            {
                name: 'userID',
                value: user.getUserId(),
                url: baseURL
            },
            {
                name: 'firstName',
                value: responseBody.firstName,
                url: baseURL
            }
        ]);
    }
}
