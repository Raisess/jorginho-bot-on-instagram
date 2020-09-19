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
	// ACTIONS
	// check the action type
	switch (actionType) {
		// follow-back bot followers action
		case 1:
			const page: any = await startBrowser();

			// make login
			await login(page);
			// follow backe
			await followBack(page);

			break;
		case 2:
			const page__: any = await startBrowser();

			// make login
			await login(page__);
			// unfollowNotFollowers
			await unfollowNotFollowers(page__);

			break;
		// if is to like/save/comment
		case 3:
			// post to go
			const postUrl:        string = question('post url: ');

			// comment options
			const timesToComment: number = parseInt(question('times to comment: '));
			const typeOfComment:  string = question('type of comments [male, female, other]: ');
			const translateTo:    string = question('translate comment to another language [eng, ger, jpn, frc]: ');

			const page_: any = await startBrowser();

			// make login
			await login(page_);
			// go to post page
			await goToPost(page_, postUrl);
			// like the post
			await like(page_);
			// save the post
			await save(page_);
			// comment on post
			await comment(page_, translateTo != 'por' ? translateTo : false, timesToComment, typeOfComment);

			break;
		default:
			break;
	}

	// close browser
	//await browser.close();
	
	return;
})();

