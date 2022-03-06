import {
	START_LOADING,
	GET_USER,
	GET_USERS,
	GET_USER_FRIENDS,
	GET_USERS_ONLINE
} from '../types'

const initState = {
	user: null,
	usersOnline: [],
	allUsers: null,
	loading: false,
}

const dataReducer = (state = initState, action) => {
	switch (action.type) {
		case START_LOADING:
			return {
				...state,
				loading: true
			}
		case GET_USER:
			return {
				...state,
				loading: false,
				user: action.payload,
			}
		case GET_USERS:
			return {
				...state,
				loading: false,
				allUsers: action.payload
			}

		case GET_USERS_ONLINE:
			return {
				...state,
				loading: false,
				usersOnline: action.payload
			}
		default: 
			return state;
	}
}

export default dataReducer
