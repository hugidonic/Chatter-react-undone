const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	nickname: { type: String, required: true, unique: true },
	password: { type: String, required: true },

	createdAt: { type: Date, default: Date.now },
	location: { type: String, default: 'Somewhere' },
	description: { type: String, default: "Hello I'm user" },

	contactWith: { type: Array, default: [] },
});

module.exports = model('User', userSchema);
