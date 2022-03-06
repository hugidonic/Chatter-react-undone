import {
	LOADING_UI,
	STOP_LOADING_UI,
	SET_ERRORS,
	CLEAR_ERRORS
} from '../types'

const initState = {
	errors: null,
	loading: false
}

const uiReducer = (state = initState, action) => {
	switch (action.type) {
		case LOADING_UI:
			return {
				...state,
				loading: true
			}
	
		case STOP_LOADING_UI:
			return {
				...state,
				loading: false
			}
	
		case SET_ERRORS:
			return {
				loading: false,
				errors: action.payload
			}
	
		case CLEAR_ERRORS:
			return initState
	
		default:
			return state
	}
}

export default uiReducer
