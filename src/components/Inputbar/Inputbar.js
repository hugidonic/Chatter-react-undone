import React from 'react'
import './Inputbar.scss';

const Inputbar = ({ message, sendMessage, setMessage }) => {
	
	const keyPressHandler = e => {
		if (e.key === 'Enter') {
			sendMessage(message)
		}
	}
	
	return (
		<div className='inputbarContainer'>
			<input
				type='text'
				name='message'
				placeholder='Напишите сообщение...'
				className='inputbar'
				value={message}
				onChange={e => setMessage(e.target.value)}
				onKeyPress={keyPressHandler}
			/>

			<button className="btn sendBtn" onClick={() => sendMessage(message)}>
				<i className="fab fa-telegram-plane"></i>
			</button>
		</div>
	)
}

export default Inputbar
