import { launch } from 'puppeteer'; 
import { question } from 'readline-sync';

// actions
import { login } from './actions/login';
import { goToPost } from './actions/goToPost';
import { like, save } from './actions/likeAndSave';
import { comment } from './actions/comment';

// change action type
const actionType: number = parseInt(question('action type [1 = follow-back, 2 = like/save/comment]: '));

(async (): Promise<void> => {
	// browser launch config
	const browser: any = await launch({ 
	  args:            ['--window-size=770,720'],
		headless:        false,
	  defaultViewport: null
	});

	const page: any = await browser.newPage();

	// ACTIONS
	// make login
	await login(page);

	// check the action type
	switch (actionType) {
		// TODO: create the follow-back bot followers action
		case 1:
			console.log("don't have the first option...");

			break;
		// if is to like/save/comment
		case 2:
			// post to go
			const postUrl:        string = question('post url: ');

			// comment options
			const timesToComment: number = parseInt(question('times to comment: '));
			const typeOfComment:  string = question('type of comments [male, female, other]: ');
			const translateTo:    string = question('translate comment to another language [eng, ger, jpn, frc]: ');

			// go to post page
			await goToPost(page, postUrl);
			// like the post
			await like(page);
			// save the post
			await save(page);
			// comment on post
			await comment(page, translateTo != '' ? translateTo : false, timesToComment, typeOfComment);

			break;
		default:
			break;
	}

	// close browser
	//await browser.close();
	
	return;
})();

