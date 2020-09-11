export const like = async (page: any): Promise<void> => {
	// click on like button
	await page.waitForSelector('span[class="fr66n"]');
	await page.click('span[class="fr66n"]');
}

export const save = async (page: any): Promise<void> => {
	// click on save button
	await page.waitForSelector('span[class="wmtNn"]');
	await page.click('span[class="wmtNn"]');
}

