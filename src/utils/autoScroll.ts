export const autoScroll = async (page: any, element: any): Promise<void> => {
  await page.evaluate(async (): Promise<void> => {
    await new Promise((resolve: any, reject: any) => {
      let totalHeight: number = 0;
      let distance:    number = 100;

      const timer = setInterval(() => {
	      const scrollHeight: number = document.body.scrollHeight;

        window.scrollBy(0, distance);

	      totalHeight += distance;

	      if (totalHeight >= scrollHeight) {
		   		clearInterval(timer);
   	    	resolve();

					return;
        }
      }, 100);
    });
  }, element);
}

