const notesRouter = require('express').Router();
const Note = require('../models/note');

// GET all notes
notesRouter.get('/', (req, res) => {
	Note.find().then((notes) => {
		res.json(notes);
	});
});

// GET a single note by id
notesRouter.get('/:id', (req, res, next) => {
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
notesRouter.post('/', (req, res, next) => {
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
notesRouter.delete('/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

// UPDATE note by id
notesRouter.put('/:id', (req, res, next) => {
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

module.exports = notesRouter;
