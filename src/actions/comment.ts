// utils
import { getRandomComment } from '../utils/getRandomComment';
import { log } from '../utils/debug';
// modules
import translate from '../modules/translate';

export const comment = async (page: any, translateTo: string | boolean, timesToComment: number, typeOfComment: string): Promise<void> => {
	const delay:     number = 0.1;
	let   count:     number = 1;
	let   toComment: string = typeof translateTo == 'string' ? await translate(getRandomComment(typeOfComment, ''), 'por', translateTo) : getRandomComment(typeOfComment, '');
	
	log(count, ':', toComment);

	// comment trigger
	await commentFuction(page, toComment);

	if (count == timesToComment) {
		console.log('finished!');

		return;
	}

	setInterval(async (): Promise<void> => {
		if (count < timesToComment) {
			count++;
			// get a comment != of last comment
	  	toComment = typeof translateTo == 'string' ? await translate(getRandomComment(typeOfComment, toComment), 'por', translateTo) : getRandomComment(typeOfComment, toComment);
			
			log(count, ':', toComment);
	
			// comment trigger
			await commentFuction(page, toComment);	
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

