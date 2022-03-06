import {
	LOADING_MESSAGES,
	SET_MESSAGES
} from '../types'

const initState = {
	loading: false,
	messages: null
} 

const messsageReducer = (state = initState, action) => {
	switch (action.type) {
		case LOADING_MESSAGES:
			return {
				...state,
				loading: true
			}

		case SET_MESSAGES: 
			return {
				loading: false,
				messages: action.payload.messages
			}
	
		default:
			return state
	}
}

export default messsageReducer