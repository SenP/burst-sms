import React, { Component } from 'react';
import Button from './Button';

const inputGroupStyle = {
	display: 'block',
	margin: '15px',
	verticalAlign: 'top'
};

const labelStyle = {
	display: 'block',
	fontSize: '20px',
	width: '100px',
	height: '100%'
};

const inputStyle = {
	display: 'block',
	width: '400px',
	padding: '10px',
	marginBottom: '25px',
	border: '1px solid grey',
	borderRadius: '3px'
};

const msgFooterStyle = {
	display: 'block',
	fontSize: '0.7rem',
	textAlign: 'right',
	marginTop: '-20px',
	marginRight: '45px'
};

class SMS_Form extends Component {
	state = {
		to: '',
		message: ''
	};

	onChange = ({ target }) => {
		const { name, value } = target;
		this.setState(prevState => ({
			...prevState,
			...{ [name]: value }
		}));
	};

	onSubmit = () => {
		const { to, message } = this.state;
		if (to.trim() && message.trim()) {
			this.props.onSubmit(to, message);
		} else {
			alert('Please enter all values');
		}
	};

	onReset = () => {
		this.setState({
			to: '',
			message: ''
		});
	};

	render() {
		const { to, message } = this.state;
		return (
			<div>
				<div style={inputGroupStyle}>
					<label style={labelStyle}> To </label>
					<input name="to" style={inputStyle} value={to} onChange={this.onChange} />
				</div>
				<div style={inputGroupStyle}>
					<label style={labelStyle}> Message </label>
					<textarea
						name="message"
						style={inputStyle}
						rows="10"
						cols="30"
						value={message}
						onChange={this.onChange}
						maxLength="459"
					/>
					<label style={msgFooterStyle}>
						{message.length}/{459}{' '}
					</label>
				</div>

				<Button label="Send" color="#3498db" onClick={this.onSubmit} />
				<Button label="Reset" color="orange" onClick={this.onReset} />
			</div>
		);
	}
}

export default SMS_Form;
