import React, { Component } from 'react';
import axios from 'axios';

import SMSForm from './components/SMS_Form';

const containerStyle = { maxWidth: '500px', margin: '100px auto' };

class App extends Component {
	state = {
		status: '',
		error: null
	};

	sendSMS = (to, message) => {
		const apiSendSms = '/api/send-sms';
		axios.post(apiSendSms, { to: to, message: message }).then(response => {
			if (response && response.status === 200 && response.data.status !== 'Error') {
				this.setState(() => ({
					status: 'Success',
					data: JSON.stringify(response.data),
					error: null
				}));
			} else {
				this.setState(() => ({
					status: 'Error',
					data: '',
					error: response.data.error
				}));
			}
		});
	};

	render() {
		return (
			<div style={containerStyle}>
				<h2 style={{ textAlign: 'center' }}> Send SMS </h2>
				<SMSForm onSubmit={this.sendSMS} />
				<div className="message">
					<h4>Status: {this.state.status} </h4>
					<h4>Details: <br /> {this.state.data} </h4>
					<h4>{this.state.error} </h4>
				</div>
			</div>
		);
	}
}

export default App;
