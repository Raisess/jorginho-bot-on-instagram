import { launch } from 'puppeteer'; 
import { question } from 'readline-sync';

// actions modules
import { login } from './actions/login';
// followBack
import { followBack } from './actions/followBack';
// unfollow
import { unfollowNotFollowers } from './actions/unfollowNotFollowers';
// like/comment/save
import { goToPost } from './actions/goToPost';
import { like, save } from './actions/likeAndSave';
import { comment } from './actions/comment';

// change action type
const actionType: number = parseInt(question('action type [1 = follow-back, 2 = unfollow-not-followers, 3 = like/save/comment]: '));

const startBrowser = async (): Promise<any> => {
	// browser launch config
	const browser: any = await launch({ 
	  args:            ['--window-size=770,720'],
		headless:        false,
	  defaultViewport: null
	});

	const page: any = await browser.newPage();

	return page;
}

(async (): Promise<void> => {
	if (actionType == 1) { // follow-back bot followers action
		const page: any = await startBrowser();

		// make login
		await login(page);
		// follow backe
		await followBack(page);
	} else if (actionType == 2) { // unfollow not mutuals
		const page: any = await startBrowser();

		// make login
		await login(page);
		// unfollowNotFollowers
		await unfollowNotFollowers(page);
	} else if (actionType == 3) { // like/save/comment
		// post to go
		const postUrl:        string = question('post url: ');

		// comment options
		const timesToComment: number = parseInt(question('times to comment: '));
		const typeOfComment:  string = question('type of comments [male, female, other]: ');
		const translateTo:    string = question('translate comment to another language [eng, ger, jpn, frc]: ');

		const page: any = await startBrowser();

		// make login
		await login(page);
		// go to post page
		await goToPost(page, postUrl);
		// like the post
		await like(page);
		// save the post
		await save(page);
		// comment on post
		await comment(page, translateTo != 'por' ? translateTo : false, timesToComment, typeOfComment);
	} else {
		throw new Error(`${actionType} is an invalid action type!`);
	}

	// close browser
	//await browser.close();
	
	return;
})();

