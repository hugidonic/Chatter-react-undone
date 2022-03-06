import React from 'react';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import './Messages.scss';
import Message from './Message/Message';

const Messages = ({ user, messages }) => {
	const messagesMarkup = messages.length === 0
		? (
			<div className="noDialogs">Начните диалог</div>
		) : (
			messages.map((mes, idx) => {
				return <Message currUser={user} key={idx} message={mes} />
			})
		)

		return (
		<ReactScrollToBottom className='messagesContainer'>
			{messagesMarkup}
		</ReactScrollToBottom>
	)
}

export default Messages
