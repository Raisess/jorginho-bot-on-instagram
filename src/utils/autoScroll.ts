export const autoScroll = async (page: any, className_: string): Promise<void> => {
  await page.evaluate(async (className_: string): Promise<void> => {
    await new Promise((resolve: any, reject: any) => {
			const element:   any    = document.querySelector(`.${className_}`);
      let totalHeight: number = 0;
      let distance:    number = 100;

      const timer = setInterval(() => {
	      const scrollHeight: number = element.scrollHeight;

        element.scrollBy(0, distance);

	      totalHeight += distance;

	      if (totalHeight >= scrollHeight) {
		   		clearInterval(timer);
   	    	resolve();

					return;
        }
      }, 100);
    });
  }, className_);
}

