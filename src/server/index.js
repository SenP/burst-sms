require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const request = require('request');

const apiBurstSendSms = `https://api.transmitsms.com/send-sms.json`;
const auth = { username: process.env.USER_NAME, password: process.env.PASSWORD };

app.use(bodyParser.json());

app.post('/api/send-sms', (req, res) => {
	const { to, message } = req.body;
	var options = {
		method: 'POST',
		url: apiBurstSendSms,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		form: { to, message },
		auth
   };
   
   console.log(options);

	request(options, (error, response, bodyRaw) => {
		const body = JSON.parse(bodyRaw);
		console.log(error, response.statusCode, body);
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
