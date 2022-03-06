// Imports
const express 		= require('express');
const socketio 		= require('socket.io');
const http 				= require('http');
const config 			= require('config');
const cors 				= require('cors');
const mongoose 		= require('mongoose');

// Constants config
const PORT = process.env.PORT || config.get('PORT');
const MONGOURI = config.get('mongoUri');

const Message = require('./models/Message');

/* 
 * Routes
 */
const authRoute 		= require('./routes/auth.routes');
const messageRoute 	= require('./routes/message.routes');
const userRoute 		= require('./routes/user.routes');
const mainRoute 		= require('./routes/main.routes');

// authMiddleware
const auth 					= require('./middleware/auth.middleware');

// Models
const User 					= require('./models/User');

// Socket && server
const app						= express();
const server				= http.createServer(app);
const io						= socketio(server);


/* 
 * Options
 */
app.use( cors() );
app.use( express.json({ extended: true }) );
app.use( express.static(__dirname) );

/* 
 * Routes
 */
app.use( mainRoute );
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/message', messageRoute);

/*
* ============================ Sockets ================================== 
*/

// Helper functions
const { addUser, removeUser, getUsersOnline } = require('./helpers/users');

io.on('connection', (client) => {
	console.log('user connected');

	app.post('/api/message/message', auth, async (req, res) => {
		try {
			const message = new Message(req.body)
			await message.save()
	
			io.emit('message', req.body);
			res.sendStatus(200);
		} catch (error) {
			console.log('error', error)
			res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' })
		}
	})

	let userNickname;

	// On user join
	client.on('join', (nickname) => {
		const user = addUser(client.id, nickname)
		userNickname = nickname
		io.emit('onlineData', {usersOnline: getUsersOnline(userNickname)})
	})

	// Waiting for the message from frontend
	client.on('sendMessage', (message, callback) => {
		callback()
	});

	// When user disconnects
	client.on('disconnect', () => {
		console.log('user Disconnected');

		const removedUser = removeUser(client.id)
		if (removedUser) {
			io.emit('onlineData', {usersOnline: getUsersOnline(userNickname)})
		}
	});
})

/*
 * ============================ Mongoose ============================ 
 */
async function start() {
	try {
		await mongoose.connect(MONGOURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		
		server.listen(PORT, () => {
			console.log('server is running on port', PORT);
		});
		
	} catch (e) {
		console.log(`===Error: ${e.message} `);
		process.exit(1)
	}
}

start()

module.exports = io