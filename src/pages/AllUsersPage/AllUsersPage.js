import React, { useEffect, useState } from 'react';
import './AllUsersPage.scss';

// Redux
import { connect } from 'react-redux';
import { getAllUsers } from '../../redux/actions/dataActions';

// hooks
import useMarkup from '../../hooks/useMarkup';

// Components
import SearchBar from '../../components/SearchBar/SearchBar';
import FriendsList from '../../components/FriendsList/FriendsList';
import Loader from '../../components/Loader/Loader';

const AllUsersPage = ({ allUsersList, getAllUsers, usersOnline }) => {
	const [ searchFriends, setSearchFriends ] = useState('');
	const [ searchUsers, setSearchUsers ] = useState('');

	useEffect(() => {
		getAllUsers();
	},[ getAllUsers ]);

	const usersMarkup = useMarkup(allUsersList, usersOnline, searchUsers, true);

	if (!allUsersList) {
		return <Loader />;
	}

	return (
		<div className="allUsers">
			<div className="allUsers__left ">
				<SearchBar search={searchFriends} setSearch={setSearchFriends} />
				<div className="userList">
					<h2 className="userList__title">Твои друзья:</h2>
					<FriendsList search={searchFriends} />
				</div>
			</div>
			<div className="allUsers__right">
				<SearchBar search={searchUsers} setSearch={setSearchUsers} />
				<div className="userList">
					<h2 className="userList__title">Все пользователи:</h2>
					{usersMarkup}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	allUsersList: state.data.allUsers,
	usersOnline: state.data.usersOnline,
});

const mapDispatchToProps = {
	getAllUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsersPage);
