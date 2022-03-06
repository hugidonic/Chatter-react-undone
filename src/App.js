// React
import React  from 'react';
import { connect } from 'react-redux'
import { Switch, Route, Redirect} from 'react-router-dom';

// Axios
import jwtDecode from 'jwt-decode';
import axios from 'axios'

// Time & Plugins
import dayjs from 'dayjs';
import locale from 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux
import { SET_AUTH } from './redux/types';
import store from './redux/store';
import { logout, login } from './redux/actions/userActions';

// Pages
import { AuthPage, MainPage } from './pages'

axios.defaults.baseURL = 'http://localhost:5000'

const token = (JSON.parse(localStorage.getItem('userData')))?.token;

if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logout());
		window.location.href = '/';
	} else {
		store.dispatch({ type: SET_AUTH });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(login());
	}
}

const App = ({isAuthed} ) => {

	dayjs.extend(relativeTime);
	dayjs.locale(locale)

	if (isAuthed) {
		return (
			<div className="outerContainer">
				<MainPage />
			</div>
		)
	}

	return (
		<div className="outerContainer">
			<Switch>
				<Route path="/" exact>
					<AuthPage />
				</Route>
				<Redirect to="/" />
			</Switch>
		</div>
	)
}


const mapStateToProps = (state) => ({
	isAuthed: state.user.isAuthed,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
