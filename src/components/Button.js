import React from 'react';
import './Button.css';

export default function Button({ label = '', color = 'blue', onClick }) {
	return (
		<div className="button" style={{ background: color }} onClick={onClick}>
			<a href="#"> {label}</a>
		</div>
	);
}
