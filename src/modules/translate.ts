import fetch from 'node-fetch';

const translate = async (text: string, from: string, to: string): Promise<string> => {
	const request = await fetch('https://api.reverso.net/translate/v1/translation', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			accept: 'application/json, text/javascript, */*; q=0.0',
			host: 'api.reverso.net',
			connection: 'keep-alive',
			origin: 'https://www.reverso.net',
			'Sec-Fetch-Site': 'same-site',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Dest': 'empty',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'
		},
		body: JSON.stringify({
			format: 'text',
			from: from,
			to: to,
			input: text,
			options: {
				contextResults: false,
				languageDetection: false,
				origin: "reversodesktop",
				sentenceSplitter: true
			}
		})
	});

	const response = await request.json();
	// console.log(response);

	const translation: string = await response.translation.join(' ');

	return translation;
}

export default translate;

