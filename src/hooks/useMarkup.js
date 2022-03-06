import React from 'react';
import { Link } from 'react-router-dom';

// Components
import UserLink from '../components/UserLink/UserLink';
import UserLinkSkeleton from '../components/UserLinkSkeleton/UserLinkSkeleton';

const searchUser = (items, search) => {
	if (search === 0) {
		return items;
	}

	items = items.filter((user) => {
		return user.nickname.toLowerCase().indexOf(search.toLowerCase()) > -1;
	});
	return items;
};

const useMarkup = (users, usersOnline, search = 0, isAddBtn) => {

	if (!users || !usersOnline)  {
		return Array.from({ length: 3 }).map((_, idx) => {
			return <UserLinkSkeleton key={idx} />
		})
	}

	let usersList = users;
	usersList = searchUser(usersList, search)

	const friends = usersList.map(user => {
		const {
			nickname,
			description,
		} = user

		const isOnline = usersOnline.includes(nickname)
		
		return (
			<Link to={`/user/${nickname}`} key={nickname}>
				<UserLink nickname={nickname}  isOnline={isOnline} text={description} isAddBtn={isAddBtn} />
			</Link>
		)
	})

	return friends
};

export default useMarkup;
