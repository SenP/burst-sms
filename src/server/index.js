// load env variables
require('dotenv').config();

// dependencies
const app = require('express')();
const bodyParser = require('body-parser');
const request = require('request');

const linkify = require('linkifyjs');
const BitlyClient = require('bitly');
const bitly = BitlyClient(process.env.BITLY_TOKEN);

// constants
const apiBurstSendSms = `https://api.transmitsms.com/send-sms.json`;
const auth = { username: process.env.USER_NAME, password: process.env.PASSWORD };

//set body parser to receive sms values
app.use(bodyParser.json());

// handle send sms route
app.post('/api/send-sms', async (req, res) => {
	const { to, message } = req.body;
	const parsedMessage = await parseMessage(message);
	var options = {
		method: 'POST',
		url: apiBurstSendSms,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		form: { to, message: parsedMessage },
		auth
	};

	// send request to burstsms API to send the sms
	request(options, (error, response, bodyRaw) => {
		const body = JSON.parse(bodyRaw);
		if (error) {
			res.send({
				status: 'Error',
				error: error + ' There was an error sending SMS. Please try again.'
			});
		}
		if (response && response.statusCode === 200) {
			res.send({
				status: 'Success',
				data: body,
				error: null
			});
		} else {
			res.send({
				status: 'Error',
				error: body.error && JSON.stringify(body.error.description)
			});
		}
	});
});

app.use((req, res) => {
	res.send([]);
});

app.listen(4000, () => console.log('Server started at port: 4000 ...'));

// util function
async function parseMessage(message = '') {
	let parsedMessage = message;
	const links = linkify.find(message);
	if (links.length === 0) return message; // no links, return the message as is
	for (let link of links) {
		// replace urls with bitly links
		const { type, value, href } = link;
		if (type === 'url') {
			try {
				const bitlyResult = await bitly.shorten(href);
				if (bitlyResult.status_code === 200) {
					const { data } = bitlyResult;
					parsedMessage = parsedMessage.replace(value, data.url);
				}
			} catch (e) {
				// failed conversions don't affect the message
			}
		}
	}
	return parsedMessage;
}
