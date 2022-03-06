import React from 'react'
import './Infobar.scss';
import Picture from '../Picture/Picture'

const Infobar = ({ online, userName }) => {
	return (
		<div className='infobar'>
			<div className="infobar-name">
			<Picture />
				<h2>{userName}</h2>
				{online && (<div className="online right"></div>) }
			</div>
			<div className="more">
				<i className="fas fa-ellipsis-h"></i>
			</div>
		</div>
	)
}

export default Infobar
