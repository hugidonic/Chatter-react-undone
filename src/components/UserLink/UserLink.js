// React
import React, { useState } from 'react';
import './UserLink.scss';
import dayjs from 'dayjs';
import axios from 'axios'

// Components
import Picture from '../Picture/Picture';

const UserLink = (props) => {

	const [disabledBtn, setDisabledBtn] = useState(false)
	
	const {
		nickname,
		text,
		time = null,
		isOnline,
		isAddBtn,

		addFriend
	} = props

	const handleAddFriend = e => {
		e.preventDefault()

		setDisabledBtn(true)
		e.target.innerText = 'Добавлен'
		axios.get(`/api/message/createChat/${nickname}`)
	}
	const handleDeleteFriend = e => {
		e.preventDefault()

		setDisabledBtn(true)
		axios.get(`/api/message/deleteChat/${nickname}`)
	}

	return (
		<div className="userLink">
			<div className="messagePicture">
				{isOnline && <div className="online" />}
				<Picture />
			</div>
			<div className="userLinkText">
				<h2 className="name">{nickname}</h2>
				<p className="text">{text}</p>
			</div>
			{isAddBtn ? (
				<button disabled={disabledBtn} onClick={handleAddFriend} className='btn addBtn'>
					Добавить
				</button>
				) : (
					<button disabled={disabledBtn} onClick={handleDeleteFriend} className='btn deleteBtn'>
						<i className="fas fa-times"></i>
					</button>
				)
			}
 
			
			{	time && (
				<div className="userLinkTime">
					{dayjs(time).format('HH:mm')}
				</div>
			)
			}
		</div>
	);
};


export default UserLink;
