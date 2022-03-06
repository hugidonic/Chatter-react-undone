import { START_LOADING, GET_USER, GET_USERS, GET_USER_FRIENDS, GET_USERS_ONLINE } from "../types"
import axios from "axios"

/* 
 * Get user details
 */
export const getUserDetails = (nickname) => (dispatch) => {
	dispatch({ type: START_LOADING })

	axios
		.get(`/api/user/${nickname}`)
		.then(res => {
			dispatch({type: GET_USER, payload: res.data})
		})
		.catch(er => console.log(er))
}

export const setUsersOnline = (users) => (dispatch) => {
	dispatch({ type: START_LOADING })
	dispatch({ type: GET_USERS_ONLINE, payload: users })
}

export const getAllUsers = () => (dispatch) => {
	dispatch({ type: START_LOADING })

	axios
		.get(`/api/user/users/userList`)
		.then(res => {
			dispatch({ type: GET_USERS, payload: res.data })
		})
		.catch(er => console.log(er))
}