import { launch } from 'puppeteer'; 

// actions
import { login } from './actions/login';
import { goToPost } from './actions/goToPost';
import { comment } from './actions/comment';

(async () => {
	// browser launch config
	const browser: any = await launch({ 
	  args:             ['--window-size=770,720'],
		headless:         false,
	  defaultViewport:  null
	});

	const page: any = await browser.newPage();

	// make login
	await login(page);
	// go to post page
	await goToPost(page);
	// comment on post
	await comment(page);
})();

