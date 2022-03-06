import React from 'react'
import './Message.scss';
import dayjs from 'dayjs'

const Message = ({currUser, message}) => {
	const { 
		messageText,
		from: name,
		dateTime,
	} = message;

	const time = dayjs(dateTime).format('HH:mm')

	let classes = name === currUser ? 'justifyEnd currentUser' : 'justifyStart'
	return (
		<div className={`messageContainer ${classes}`}>
			<div className="messageBox">{messageText}</div>
			<div className="dateTime">{time}</div>
		</div>
	)
}

export default Message