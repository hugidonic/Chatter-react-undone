import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Components
import './UserChats.scss';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import UserLink from '../UserLink/UserLink';


const UserChats = (props) => {
	const { menuRef, userData, usersOnline } = props;
	const [ search, setSearch ] = useState('');

	const getMessageMarkup = () => {
		const {
			contactWith,
			nickname,
			userLastMessages
		} = userData

		let userList = contactWith

		if (search === 0) {
			return userList;
		}
		
		userList = contactWith.filter(user => {
			return user.nickname.toLowerCase().indexOf(search.toLowerCase()) > -1;
		})

		const messageMarkup = contactWith.length === 0
			? (
				<div className="noDialogs">Нет диалогов</div>
			) : (
				userList.map((data, idx) => {
					const { convId, nickname: user } = data;
					const lastMessage = userLastMessages[idx];
					const isOnline = usersOnline.includes(user)
					
					return (
						<Link to={`/chat?chatId=${convId}&user1=${nickname}&user2=${user}`} key={convId}>
							<UserLink nickname={user} text={lastMessage.messageText} time={lastMessage.dateTime} isOnline={isOnline} />
						</Link>
					)
				})
			)

		return messageMarkup
	}

	if (userData) {
		const messageMarkup = getMessageMarkup()
	
		return (
			<div className="userChats" ref={menuRef}>
				<SearchBar search={search} setSearch={setSearch}/>
	
				<div className="chats">
					{messageMarkup}
				</div>

				<Link to='/users' className='allUsersBtn'>
					<div className="plus"></div>
				</Link>
			</div>
		);
	}

	return <Loader />
};

const mapStateToProps = (state) => ({
	userData: state.user.credentials,
	usersOnline: state.data.usersOnline,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChats);
