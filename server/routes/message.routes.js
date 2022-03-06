const { Router } = require('express');
const router = Router();
const io = require('../server');

// Auth middleware
const auth = require('../middleware/auth.middleware');
const Message = require('../models/Message');
const uid = require('uid');
const User = require('../models/User');

/* Get All messages from conversation */
// /api/message/:convId
router.get('/:convId', auth, async (req, res) => {
	try {
		const messages = await Message.find({ conv_id: req.params.convId });
		res.json({ messages });
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
	}
});

// /api/message/createChat/:user2
router.get('/createChat/:user2', auth, async (req, res) => {
	try {
		const convId = uid();
		const userId = req.user.userId;

		const user1 = await User.findById(userId)
		const user2 = await User.findOne({ nickname: req.params.user2 });

		const contactWith1 = user1.contactWith
		const contactWith2 = user2.contactWith

		const chat1 = {nickname: user2.nickname, convId}
		const chat2 = {nickname: user1.nickname, convId}
		
		await user1.updateOne({ contactWith: [...contactWith1, chat1] })
		await user2.updateOne({ contactWith: [...contactWith2, chat2] })
		
		res.json(chat1)
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
	}
});
// /api/message/deleteChat/:user2
router.get('/deleteChat/:user2', auth, async (req, res) => {
	try {
		const userId = req.user.userId;

		const user1 = await User.findById(userId)
		const user2 = await User.findOne({ nickname: req.params.user2 });

		const contactWith1 = user1.contactWith
		const contactWith2 = user2.contactWith
		
		const newcontactWith1 = contactWith1.filter(chat => chat.nickname !== req.params.user2)
		const newcontactWith2 = contactWith2.filter(chat => chat.nickname !== user1.nickname)

		await user1.updateOne({ contactWith: newcontactWith1 })
		await user2.updateOne({ contactWith: newcontactWith2 })
		
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
	}
});

module.exports = router;
