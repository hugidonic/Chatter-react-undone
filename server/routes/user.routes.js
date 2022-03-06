const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const Message = require('../models/Message');

/* 
 * Get last Messages from users conversation
 */

const getUserLastMessages = async (user) => {
	const chats = user.contactWith;
	let lastMessages = [];

	for (let i = 0; i < chats.length; i++) {
		const messages = await Message.find({ conv_id: chats[i].convId });
		
		if (messages.length !== 0) {
			const lastMessage = messages[messages.length - 1];
			const mes = {
				messageText: lastMessage.messageText,
				dateTime: lastMessage.dateTime
			};
			lastMessages.push(mes);
		} else {
			const mes = {
				messageText: '',
				dateTime: ''
			};
			lastMessages.push(mes);
		}
	}

	return lastMessages
}


/* 
 * Get all users in Db
 */
// /api/user/users/userList
router.get('/users/userlist', auth, async (req, res) => {
	try {
		const userId = req.user.userId;
		const currUser = (await User.findById(userId))

		const friendsList = currUser.contactWith.map(user => user.nickname)

		const allUsers = await User.find({ nickname: { $ne: currUser.nickname }});
		const allUserNames = allUsers.map(user => user.nickname)
		
		const nameMatches = allUserNames.map(nickname => friendsList.indexOf(nickname))

		let usersList = []
		
		nameMatches.forEach((idx, index) => {
			if (idx === -1) {
				usersList.push(allUsers[index])
			}
		})
		
		res.json(usersList)
	} catch (e) {
		console.log('e', e)
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
	}
})

/* 
 * Get friends
 */
// /api/user/user/friends
router.get('/user/friends', auth, async (req, res) => {
	try {
		const currUserId = req.user.userId;
		const currUserList = (await User.findById(currUserId)).contactWith;
		let friends = [];
		
		for (const user of currUserList) {
			const nickname = user.nickname;
			const friend = await User.findOne({ nickname })
			const friendData = {
				nickname: friend.nickname,
				isOnline: friend.isOnline,
				description: friend.description,
			}
			friends.push(friendData)
		}

		res.json(friends)
	} catch (e) {
		console.log('e', e);
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
	}
})


/*
 * Get current User
 */
// /api/user/user
router.get('/user', auth, async (req, res) => {
	try {
		const userId = req.user.userId;
		const user = await User.findById(userId);
		const userLastMessages = await getUserLastMessages(user);

		const userData = {
			nickname: user.nickname,
			location: user.location,
			createdAt: user.createdAt,
			contactWith: user.contactWith,
			description: user.description,
			isOnline: user.isOnline,
			userLastMessages
		};

		res.json(userData);
	} catch (e) {
		console.log('e', e);
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
	}
});

/* 
 * Get user details
 */
// /api/user/:nickname
router.get('/:nickname', auth, async (req, res) => {
	try {
		const user = await User.findOne({ nickname: req.params.nickname });
		const userData = {
			nickname: user.nickname,
			location: user.location,
			description: user.description,
			createdAt: user.createdAt,
			contactWith: user.contactWith,
			isOnline: user.isOnline
		};

		return res.json(userData);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
	}
});




module.exports = router;
