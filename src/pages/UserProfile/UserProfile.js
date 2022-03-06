import React, { useEffect, useState } from 'react';
// Redux
import { connect } from 'react-redux';
import { getUserDetails } from '../../redux/actions/dataActions'

// stuff
import dayjs from 'dayjs';
import './UserProfile.scss';

// Components and HOC
import Picture from '../../components/Picture/Picture';
import Loader from '../../components/Loader/Loader';
import FriendsList from '../../components/FriendsList/FriendsList';

const UserProfile = (props) => {
	const { userData, match, getUserDetails } = props;
	const [isCurrUser, setIsCurrUser] = useState(false)

	useEffect(() => {
		const urlNick = match.params.nickname
		if (urlNick /* || urlNick === (JSON.parse(localStorage.getItem('userData'))).nickname */) {
			setIsCurrUser(true)
		}
		
		// Get current user's nickname
		const userNickname = urlNick || (JSON.parse(localStorage.getItem('userData'))).nickname
		getUserDetails(userNickname)
	}, [ getUserDetails, match.params.nickname ])
	

	if (!userData) return <Loader /> 
	const { nickname, description, location, createdAt } = userData;
	const regTime = dayjs(createdAt).format('DD/MM/YYYY');
	

	return (
		<div className="userProfileOuter">
			<div className="userProfile">
				<div className="userProfile__upper">
					<div className="upperInner">
						<Picture size={180} />
						<h2>{nickname}</h2>
						{isCurrUser && <div className="currUser">123123</div> }
					</div>
				</div>

				<div className="userProfile__lower lower">
					<div className="lower__left left">
						<div className="left__upper box">
							<h3 className="box__title">Профиль</h3>
							<ul className="stats">
								<li>Никнейм: {nickname}</li>
								<li>Описание: {description}</li>
								<li>Город: {location}</li>
								<li>Страна: Россия</li>
								<li>Дата регистрации: {regTime}</li>
							</ul>
						</div>
						<div className="left__lower box">
							<h3 className="box__title">Статистика</h3>
							<ul className="stats">
								<li>Всего сообщений: 242</li>
								<li>Количество друзей: 16</li>
								<li>Дней с регистрации: 213</li>
								<li>Друзей онлайн: 12</li>
								<li>Друзей оффлайн: 4</li>
							</ul>
						</div>
					</div>

					<div className="lower__right box friendsList">
						<h3 className="box__title">Друзья</h3>
						<div className="friendsList"><FriendsList /> </div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userData: state.data.user,
});

const mapDispatchToProps = {
	getUserDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
