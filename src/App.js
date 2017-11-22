import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import SMSForm from './components/SMS_Form';

class App extends Component {
	state = {
		status: '',
		error: null
	};

	sendSMS = (to, message) => {
		console.log(to, message);
		const apiSendSms = '/api/send-sms';
		axios.post(apiSendSms, { to: to, message: message }).then(response => {
			console.log(response);
			if (response && response.status === 200 && response.data.status !== 'Error') {
				this.setState(() => ({
          status: 'Success',
          data: JSON.stringify(response.data),
					error: null
				}));
			} else {
				this.setState(() => ({
					status: 'Error',
					error: response.data.error
				}));
			}
		});
	};

	render() {
		return (
			<div>
				<h2 className="text-center"> Send SMS </h2>
				<SMSForm onSubmit={this.sendSMS} />
				<div className="message">
					<h4>Status: {this.state.status} </h4>
					<h4>Details: {this.state.data} </h4>
					<h4>{this.state.error} </h4>
				</div>
			</div>
		);
	}
}

export default App;
