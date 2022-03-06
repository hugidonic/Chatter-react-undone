// React
import React, { useRef, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setUsersOnline } from '../../redux/actions/dataActions';

// Sockets
import io from 'socket.io-client';

// Components
import SideMenu from '../../components/SideMenu/SideMenu';
import UserChats from '../../components/UserChats/UserChats';

// Pages
import { MessagePage, OthersPage, UserProfile, AllUsersPage } from '../../pages';

const MainPage = ({ setUsersOnline }) => {
	const menuRef = useRef();
	const ENDPOINT = 'http://localhost:5000';

	// Connect socket
	let socket = io(ENDPOINT);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('userData'));

		// Connect to the room
		socket.emit('join', userData.nickname);

		// Disconnect from the room
		return () => {
			socket.emit('disconnect');
			// Disconnect socket
			socket.off();
		};
	},[ socket ]);

	useEffect(() => {
		socket.on('onlineData', ({ usersOnline }) => {
			setUsersOnline(usersOnline);
		});
	},[ socket, setUsersOnline ]);

	return (
		<div className="mainContainer">
			<SideMenu menuRef={menuRef} />
			<UserChats menuRef={menuRef} />

			<div className="rightContainer">
				<Switch>
					<Route path="/chat" exact render={(props) => <MessagePage socket={socket} {...props} />} />

					<Route path="/others" цexact component={OthersPage} />
					<Route path="/" exact component={UserProfile} />
					<Route path="/user/:nickname" exact component={UserProfile} />

					<Route path="/users" exact component={AllUsersPage} />

					<Redirect to="/" />
				</Switch>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	setUsersOnline
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
