import { username } from '../config.json'
// interfaces
import { IStorage } from '../interfaces/IStorage';
// utils
import { autoScroll } from '../utils/autoScroll';
import { log } from '../utils/debug';

export const unfollowNotFollowers = async (page: any): Promise<void> => {
	const waitNavigationPromise: void = await page.waitForNavigation();

	let storage: IStorage = {
		followersNumber:  0,
		followers:        [],
		followingNumber:  0,
		following:        [],
		notReciprocal:    [],
		difference:       0
	};

	// go to profile page
	await page.goto(`https://instagram.com/${username}/`);
	await waitNavigationPromise;

	// click on followers button
	await page.waitForSelector(`a[href="/${username}/followers/"]`);
	await page.click(`a[href="/${username}/followers/"]`);
	await waitNavigationPromise;

	setTimeout(async (): Promise<void> => {	
		await autoScroll(page, 'isgrP');

		// scrap followers section html
		const followersArr: Array<any> = await page.$x('//*[@class="PZuss"]//li');

		storage.followersNumber = followersArr.length;

		for (let follower_ of followersArr) {
			const follower: string = await page.evaluate((elm: any) => elm.innerText, follower_);

			storage.followers.push(follower.split('\n')[0]);
		}

		// close followers popup
		await page.waitForSelector('button[class="wpO6b "]');
		await page.click('button[class="wpO6b "]');
		await waitNavigationPromise;
		
		// click on following button
		await page.waitForSelector(`a[href="/${username}/following/"]`);
		await page.click(`a[href="/${username}/following/"]`);
		await waitNavigationPromise;

		setTimeout(async (): Promise<void> => {
			await autoScroll(page, 'isgrP');

			// scrap following section html
			const followingArr: Array<any> = await page.$x('//*[@class="PZuss"]//li');

			storage.followingNumber = followingArr.length;

			for (let following_ of followingArr) {
				const following: string = await page.evaluate((elm: any) => elm.innerText, following_);

				storage.following.push(following.split('\n')[0]);
			}

			// set not reciprocal data
			for (let followingUsername of storage.following) {
				if (!storage.followers.includes(followingUsername)) {
					storage.notReciprocal.push(followingUsername);
				}
			}

			// difference set
			storage.difference = storage.notReciprocal.length;

			log(storage);

			return;
		}, 3000);
	}, 3000);	
}

