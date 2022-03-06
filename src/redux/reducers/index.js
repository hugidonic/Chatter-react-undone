// Combine Reducers
import { combineReducers } from 'redux'

// Reducers 
import messagesReducer from './messagesReducer'
import uiReducer from './uiReducer'
import userReducer from './userReducer'
import dataReducer from './dataReducer'

const rootReducer = combineReducers({
	user: userReducer,
	UI: uiReducer,
	messages: messagesReducer,
	data: dataReducer
})

export default rootReducer