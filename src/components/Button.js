import React from 'react';

const buttonStyle = {
   display: "inline-block",
   padding: "10px",
   margin: "5px",
   width: "200px",
   background: "blue",
   color: "white",
   textAlign: "center",
   textDecoration: "none",
   borderRadius: "5px"
}

export default function Button({ label, onClick }) {
	return (
		<a href="#" style={buttonStyle} onClick={onClick}>
			{label}
		</a>
	);
}
