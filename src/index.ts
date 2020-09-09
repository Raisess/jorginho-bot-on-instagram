import puppeteer from 'puppeteer'; 

// actions
import { login } from './actions/login';

(async () => {
	// browser launch config
	const browser = await puppeteer.launch({ 
	  args:             ['--window-size=770,720'],
		headless:         false,
	  defaultViewport:  null
	});

	const page = await browser.newPage();

	// make login
	await login(page);

})();

