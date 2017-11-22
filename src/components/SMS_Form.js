import React, { Component } from 'react';
import Button from './Button';

const inputGroupStyle = {
	display: 'block',
	margin: '15px',
	verticalAlign: 'top'
};

const labelStyle = {
	display: 'inline-block',
	fontSize: '20px',
	width: '100px',
	height: '100%',
	marginRight: '8px',
	textAlign: 'right'
};

const inputStyle = {
	display: 'inline-block',
	minHeight: '20px',
	padding: '10px',
	border: '1px solid grey',
	borderRadius: '3px'
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
		this.props.onSubmit(to, message);
	};

	onReset = () => {
		this.setState({
			to: '',
			message: ''
		});
	};

	render() {
		return (
			<div>
				<div style={inputGroupStyle}>
					<label style={labelStyle}> To: </label>
					<input name="to" style={inputStyle} value={this.state.to} onChange={this.onChange} />
				</div>
				<div style={inputGroupStyle}>
					<label style={labelStyle}> Message: </label>
					<textarea
						name="message"
						style={inputStyle}
						rows="10"
						cols="30"
						value={this.state.message}
                  onChange={this.onChange}
                  maxLength="459"
					/>
				</div>

				<Button label="Send" onClick={this.onSubmit} />
				<Button label="Reset" onClick={this.onReset} />
			</div>
		);
	}
}

export default SMS_Form;
