import {
	username,
	password
} from '../config.json';

const loginUrl: string = 'https://www.instagram.com/accounts/login';

export const login = async (page: any): Promise<void> => {
  const navigationPromise: void = page.waitForNavigation();

	// go to login page
	await page.goto(loginUrl);
	await navigationPromise;

	// click on username field
	await page.waitForSelector('input[name="username"]');
	await page.click('input[name="username"]');
	await navigationPromise;

	// write username
	await page.type('input[name="username"]', username);

	// click on password field
	await page.waitForSelector('input[name="password"]');
	await page.click('input[name="password"]');
	await navigationPromise;

	// write password
	await page.type('input[name="password"]', password);

	// click on enter
	await page.waitForSelector('button[class="sqdOP  L3NKy   y3zKF     "]');
	await page.click('button[class="sqdOP  L3NKy   y3zKF     "]');

	return;
}

