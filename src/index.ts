import { launch } from 'puppeteer'; 

// actions
import { login } from './actions/login';
import { goToPost } from './actions/goToPost';
import { like, save } from './actions/likeAndSave';
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
	// like the post
	await like(page);
	// save the post
	await save(page);
	// comment on post
	await comment(page);
})();

