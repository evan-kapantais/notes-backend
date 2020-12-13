require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();

// Middleware
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => res.send('<h1>Hello base url.</h1>'));

// GET all notes
app.get('/api/notes', (req, res) => {
	Note.find().then((notes) => {
		res.json(notes);
	});
});

// GET a single note by id
app.get('/api/notes/:id', (req, res, next) => {
	Note.findById(req.params.id)
		.then((note) => {
			if (note) {
				res.json(note);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

// POST new note
app.post('/api/notes', (req, res, next) => {
	const note = new Note({
		content: req.body.content,
		important: req.body.important || false,
		date: new Date(),
	});

	note
		.save()
		.then((savedNote) => savedNote.toJSON())
		.then((savedAndFormattedNote) => {
			res.json(savedAndFormattedNote);
		})
		.catch((error) => next(error));
});

// DELETE note by id
app.delete('/api/notes/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

// UPDATE note by id
app.put('/api/notes/:id', (req, res, next) => {
	const newNote = {
		content: req.body.content,
		important: req.body.important,
	};

	Note.findByIdAndUpdate(req.params.id, newNote, { new: true })
		.then((updatedNote) => {
			res.json(updatedNote);
		})
		.catch((error) => next(error));
});

// Error handler
const errorHandler = (error, req, res, next) => {
	console.log(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'Malformatted id.' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running at port ${PORT}.`));
