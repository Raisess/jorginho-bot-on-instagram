import { question } from 'readline-sync';

const postUrl: string = question('post url: ');

export const goToPost = async (page: any): Promise<void> => {	
	const navigationPromise: void = page.waitForNavigation();
	await navigationPromise;

	// go to post url
	await page.goto(postUrl);

	await navigationPromise;
}

