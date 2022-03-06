// Router
const { Router } = require('express');
const router = Router();

// Express validator
const { check, validationResult } = require('express-validator');

// Packages
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Models
const User = require('../models/User');

// Middleware
const auth = require('../middleware/auth.middleware');

/* 
 * Register into mongodb
 */

// /api/auth/register
router.post(
	'/register',
	// Validators
	[
		check('nickname', 'Никнейм должен быть от 3 до 10 символов').isLength({min: 3, max:10}),
		check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
		.custom((val, { req }) => {
			if (val !== req.body.confirmPassword) {
				throw new Error("Пароли должны совпадать");
			} else {
				return val;
			}
		}),
	],
	async (req, res) => {
		try {
			// Errors from validator if they are exists
			const errors = validationResult(req);

			// Check for errors and return bad response
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// User's credentials from fronent
			const { nickname, password } = req.body;

			// Checks if user is already exists and throw error
			const candidate = await User.findOne({ nickname });
			if (candidate) {
				return res.status(400).json({ message: 'Этот никнейм уже используется' });
			}

			// Hash password
			const hashedPassword = await bcryptjs.hash(password, 12);
			// Create and save user with nickname & password
			const user = new User({ nickname, password: hashedPassword });
			await user.save();

			return res.status(201).json({ message: 'Пользователь создан' });
		} catch (e) {
			console.log(e.message);
			res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
		}
	}
);

/* 
 * Login 
 */
// /api/auth/login
router.post(
	'/login',
	// Validators
	[
		check('nickname', 'Никнейм должен быть от 3 до 10 символов').isLength({min: 3, max:10}),
		check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
	],
	async (req, res) => {
		try {
			// Errors from validator if they are exists
			const errors = validationResult(req);
			
			// Check for errors and return bad response
			if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
			}

			// User's credentials from frontend
			const { nickname, password } = req.body;
			
			// User in db
			const user = await User.findOne({ nickname });

			// Error if user with this nickname doesn't exist
			if (!user) {
				return res.status(404).json({ message: 'Пользователь не найден' });
			}

			// Are passwords matching or not
			const isMatch = await bcryptjs.compare(password, user.password);

			// If not throw error 'wrong password'
			if (!isMatch) {
				return res.status(400).json({ message: 'Неправильный пароль' });
			}

			
			// JWT token
			const token = jwt.sign(
				{ userId: user.id },
				config.get('secretJwt'),
				{ expiresIn: '1h' }
			);
				
			// JSON = userId, token, message
			res.status(201).json({ userId: user.id, nickname: user.nickname, token, message: 'Вы успешно вошли в систему' })
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
		}
	}
);

/* 
 * logout 
 */
// /api/auth/logout
router.get('/logout', auth, async (req, res) => {
	try{
		const userId = req.user.userId;
		const user = await User.findById(userId)
		await user.updateOne({ isOnline: false })
		await user.save()
		res.json()
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
	}
})

module.exports = router;
