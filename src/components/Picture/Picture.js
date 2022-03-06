import React from 'react';
import noImg from '../../images/no-img.png';

import './Picture.scss';
const Picture = ({ size }) => {
	let style = {}

	if (size) {
		style = {
			width: `${size}px`,
			height: `${size}px`,
		}
	}
	
	return (
		<div className="imageWrapper" style={style}>
			<img src={noImg} alt="Person" className="image" />
		</div>
	);
};

export default Picture;
