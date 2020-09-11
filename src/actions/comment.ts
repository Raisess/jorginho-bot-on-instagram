// utils
import { getRandomComment } from '../utils/getRandomComment';

export const comment = async (page: any, timesToComment: number, typeOfComment: string): Promise<void> => {
	const delay:     number = 0.1;
	let   count:     number = 1;
	let   toComment: string = getRandomComment(typeOfComment, '');

	// comment trigger
	await commentFuction(page, toComment);

	if (count == timesToComment) {
		console.log('finished!');

		return;
	}

	setInterval(async (): Promise<void> => {
		if (count < timesToComment) {
			toComment = getRandomComment(typeOfComment, toComment); // get new comment text

			// comment trigger
			await commentFuction(page, toComment);
			
			count++;
		}
	}, delay * 60000);
}

const commentFuction = async (page: any, _comment: string): Promise<void> => {
	// click on comment field
	await page.waitForSelector('textarea[class="Ypffh"]');
	await page.click('textarea[class="Ypffh"]');

	// write comment
	await page.keyboard.type(_comment);

	// send comment
	await page.waitForSelector('button[type="submit"]');
	await page.click('button[type="submit"]');
}

