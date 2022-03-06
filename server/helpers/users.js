let users = []

// add user to the Online
const addUser = (clientId, nickname) => {
	const user = { clientId, nickname }

	users.forEach(us => {
		if (us.nickname === user.nickname) {
			return
		}
	})
	
	users.push(user)
	return user
}

// remove user from users
const removeUser = (clientId) => {
	const userIdx = users.findIndex(user => user.clientId === clientId)
	
	if (userIdx !== -1) {
		return users.splice(userIdx, 1)[0]
	}
}

const getUser = (clientId) => users.find(user => user.clientId === clientId)

const getUsersOnline = (name) => {
	let userNames = []

	users.forEach(user => {
		userNames.push(user.nickname)
	})
	console.log('userNames', userNames)
	return userNames
}


module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersOnline
}