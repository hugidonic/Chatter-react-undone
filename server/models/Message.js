const { model, Schema } = require('mongoose');

const schema = new Schema({
	conv_id: { type: String, required: true },
	from: { type: String, required: true },
	messageText: { type: String, required: true },
	dateTime: { type: Date, default: Date.now },
});


module.exports = model('Message', schema);
