import { question } from 'readline-sync';

export const goToPost = async (page: any, postUrl: string): Promise<void> => {	
	const navigationPromise: void = page.waitForNavigation();
	await navigationPromise;

	// go to post url
	await page.goto(postUrl);

	await navigationPromise;
}

