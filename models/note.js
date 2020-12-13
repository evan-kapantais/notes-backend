require('dotenv').config();
const mongoose = require('mongoose');

console.log('MongoDB: Establishing connection...');

mongoose
	.connect(process.env.MONGO_URI, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB: Connection established.');
	})
	.catch((error) =>
		console.error(`Error connecting to MongoDb: ${error.message}`)
	);

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	important: Boolean,
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
