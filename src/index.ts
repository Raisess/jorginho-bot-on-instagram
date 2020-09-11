import { launch } from 'puppeteer'; 
import { question } from 'readline-sync';

// actions
import { login } from './actions/login';
import { goToPost } from './actions/goToPost';
import { like, save } from './actions/likeAndSave';
import { comment } from './actions/comment';

// options
const timesToComment: number = parseInt(question('times to comment: '));
const typeOfComment:  string = question('type of comments [male, female, other]: ');
const translateTo:    string = question('translate comment to another language [eng, ger, jpn, frc]: ');

(async () => {
	// browser launch config
	const browser: any = await launch({ 
	  args:             ['--window-size=770,720'],
		headless:         false,
	  defaultViewport:  null
	});

	const page: any = await browser.newPage();

	// ACTIONS
	// make login
	await login(page);
	// go to post page
	await goToPost(page);
	// like the post
	await like(page);
	// save the post
	await save(page);
	// comment on post
	await comment(page, translateTo != '' ? translateTo : false, timesToComment, typeOfComment);
	
	// close browser
	//await browser.close();
})();

