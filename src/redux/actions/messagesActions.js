import { LOADING_MESSAGES, SET_MESSAGES } from '../types';

import axios from 'axios';

export const getMessages = (convId) => (dispatch) => {
	dispatch({ type: LOADING_MESSAGES });

	axios
		.get(`/api/message/${convId}`)
		.then((res) => {
			dispatch({ type: SET_MESSAGES, payload: res.data });
		})
		.catch((err) => console.log(err));
};

export const sendMessageToDB = (mes) => dispatch => {
	axios.post('/api/message/message', mes)
};
