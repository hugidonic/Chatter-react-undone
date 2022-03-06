import React, { useEffect, useState } from 'react';

import queryString from 'query-string';
import { connect } from 'react-redux';
import { getMessages, sendMessageToDB } from '../../redux/actions/messagesActions';

import Infobar from '../../components/Infobar/Infobar'
import Inputbar from '../../components/Inputbar/Inputbar'
import Messages from '../../components/Messages/Messages'

const Chat = (props) => {
	// Props
	const { socket ,location, getMessages, sendMessageToDB, DBmessages, usersOnline } = props;

	// State
	const [ message, setMessage ] = useState('');
	const [ messages, setMessages ] = useState([]);

	// data from url
	const { chatId, user1, user2 } = queryString.parse(location.search);
	
	useEffect(() => {
		socket.on('message', (mes) => {
			setMessages([ ...messages, mes ]);
		});
	},[ messages, socket ]);

	useEffect(() => {
		getMessages(chatId);
	},[ getMessages, location, chatId ]);

	useEffect(() => {
		DBmessages && setMessages(DBmessages);
	},[ DBmessages, setMessages ]);

	const sendMessage = (e) => {
		if (message) {
			const mes = {
				conv_id: chatId,
				from: user1,
				messageText: message,
				dateTime: new Date().toISOString()
			};
			
			socket.emit('sendMessage', message, () => {
				// Clear input
				setMessage('');
			});
			
			sendMessageToDB(mes);
		}
	};

	const isOnline = usersOnline.includes(user2)
	
	return (
		<div className='messages'>
			<Infobar userName={user2} online={isOnline}/>
			<Messages user={user1} messages={messages} />
			<Inputbar message={message} sendMessage={sendMessage} setMessage={setMessage} />
		</div>
	)
}

const mapStateToProps = (state) => ({
	DBmessages: state.messages.messages,
	usersOnline: state.data.usersOnline,
});

const mapDispatchToProps = {
	getMessages,
	sendMessageToDB
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
