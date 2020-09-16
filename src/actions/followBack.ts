import { username } from '../config.json'

export const followBack = async (page: any): Promise<void> => {
	const waitNavigationPromise: void = await page.waitForNavigation();

	// go to profile page
	await page.goto(`https://instagram.com/${username}/`);
	await waitNavigationPromise;

	// click on followers button
	await page.waitForSelector(`a[href="/${username}/followers/"]`);
	await page.click(`a[href="/${username}/followers/"]`);
	await waitNavigationPromise;

	setTimeout(async () => {	
		// scrap followers section html
		const followHandles: Array<any> = await page.$x('//*[@class="PZuss"]//button[contains(text(), "Follow")]');

		for (let handle of followHandles) {
			const buttonText: string = await page.evaluate((elem: any) => elem.innerText, handle);

			if (buttonText == 'Follow') {
				await handle.click();
			}
		}

		return;
	}, 3000);	
}

