import { question } from 'readline-sync';

// utils
import { getRandomComment } from '../utils/getRandomComment';

const timesToComment: number = parseInt(question('times to comment: '));
const typeOfComment:  string = question('type of comments [male, female, other]: ');

let count = 1;

export const comment = async (page: any): Promise<void> => {
	const delay:   number = 0.5;
	let toComment: string = getRandomComment(typeOfComment, '');

	// comment trigger
	await commentFuction(page, delay, toComment);

	if (count == timesToComment) {
		console.log('finished!');

		return;
	}

	setInterval(async (): Promise<void> => {
		if (count < timesToComment) {
			toComment = getRandomComment(typeOfComment, toComment); // get new comment text

			// comment trigger
			await commentFuction(page, delay, toComment);
			
			count++;
		} else {
			return;
		}
	}, delay * 60000);
}

const commentFuction = async (page: any, delay: number, _comment: string): Promise<void> => {
	const navigationPromise = page.waitForNavigation({ timeout: delay * 60000 });

	// click on comment field
	await page.waitForSelector('textarea[class="Ypffh"]');
	await page.click('textarea[class="Ypffh"]');

	// write comment
	await page.keyboard.type(_comment);

	// send comment
	await page.waitForSelector('button[type="submit"]');
	//await page.click('button[type="submit"]');

	await navigationPromise;
}

