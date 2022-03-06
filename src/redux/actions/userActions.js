import { SET_USER_DATA, SET_ERRORS, SET_UNAUTH, CLEAR_ERRORS, LOADING_UI, LOADING_USER_DATA, GET_USER_FRIENDS } from '../types';
import { message } from '../../hooks';
import axios from 'axios';

/* 
* Helper Functions
* = Set authorization token
* = Get user data
*/

/* Storage name */
const storageName = 'userData';

// Get token and set headers
const setAuthToken = (userId, jwtToken,  nickname) => {
	const authToken = `Bearer ${jwtToken}`;
	axios.defaults.headers.common['Authorization'] = authToken;

	localStorage.setItem(
		storageName,
		JSON.stringify({
			userId,
			token: jwtToken,
			nickname
		})
	);
};

export const login = () => (dispatch) => {
	// Start Loading
	const data = JSON.parse(localStorage.getItem(storageName))
	if (data && data.token) {
		/* Set token */
		setAuthToken(data.userId, data.token, data.nickname);

		/* get user's data */
		dispatch(getUserData());
	}
};

// Get user data and dispatch it
export const getUserData = () => (dispatch) => {
	// Start loading user
	dispatch({ type: LOADING_USER_DATA });
	dispatch(getUserFriends())
	
	axios
		.get(`/api/user/user`)
		.then((res) => {
			// stop loading and set user
			dispatch({ type: SET_USER_DATA, payload: res.data });
			/* if fine then clear all errors and stop loading UI*/
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch((err) => console.error(err));
};

/* 
 * Login function
 */
export const loginUser = (userData) => (dispatch) => {
	// Start Loading
	dispatch({ type: LOADING_UI });

	axios
		.post(`/api/auth/login`, userData)
		.then((res) => {
			/* Set token */
			setAuthToken(res.data.userId, res.data.token, res.data.nickname);

			/* get user's data */
			dispatch(getUserData());
			message('Вы успешно вошли в систему')
		})
		.catch((err) => {
			dispatch({ type: SET_ERRORS, payload: err.response.data });
		});
};

/* 
 * Register function
 */
export const registerNewUser = (newUserData) => (dispatch) => {
	// Start Loading
	dispatch({ type: LOADING_UI });
	
	axios
	.post(`/api/auth/register`, newUserData)
	.then((res) => {
		const {nickname, password} = newUserData
		message(res.data.message)
		/* if fine then clear all errors */
		dispatch(loginUser({ nickname, password }))

		dispatch({ type: CLEAR_ERRORS });
		})
		.catch((err) => {
			dispatch({ type: SET_ERRORS, payload: err.response.data });
		});
};

/* 
 * Logout function
 */
export const logout = () => (dispatch) => {
	axios.get('/api/auth/logout')
	/* Clean localstorage */
	localStorage.removeItem(storageName);
	/* Clean auth token */
	delete axios.defaults.headers.common['Authorization'];
	message('Вы успешно вышли из системы')
		/* Set auth false and clear all errors */
		dispatch({ type: SET_UNAUTH });
		dispatch({ type: CLEAR_ERRORS });
};

export const getUserFriends = () => dispatch => {
	dispatch({ type: LOADING_USER_DATA })

	axios
		.get(`/api/user/user/friends`)
		.then(res => [
			dispatch({ type: GET_USER_FRIENDS, payload: res.data })
		])
}

// Edit user details

// Change user picture