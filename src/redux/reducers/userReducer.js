import {
	SET_USER_DATA,
	SET_AUTH,
	SET_UNAUTH,
	LOADING_USER_DATA,
	GET_USER_FRIENDS,
} from '../types'

const initState = {
	isAuthed: false,
	credentials: null,
	userFriends: null,
	loading: false,
};


const userReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_AUTH:
			return {
				...state,
				isAuthed: true
			}
	
		case SET_UNAUTH:
			return initState

		case SET_USER_DATA:
			return {
				...state,
				isAuthed: true,
				loading: false,
				credentials: {
					...action.payload
				}
			}
		
		case GET_USER_FRIENDS:
			return {
				...state,
				loading: false,
				userFriends: action.payload
			}
		
		case LOADING_USER_DATA:
			return {
				...state,
				loading: true
			}
	
		default:
			return state
	}
}

export default userReducer