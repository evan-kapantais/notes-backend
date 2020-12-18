const notesRouter = require('express').Router();
const Note = require('../models/note');

// GET all notes
notesRouter.get('/', async (req, res) => {
	const notes = await Note.find({});
	res.json(notes);
});

// GET a single note by id
notesRouter.get('/:id', async (req, res, next) => {
	const note = await Note.findById(req.params.id);

	if (note) {
		res.json(note);
	} else {
		res.status(404).end();
	}

	note.catch((error) => next(error));
});

// POST new note
notesRouter.post('/', async (req, res, next) => {
	const note = await new Note({
		content: req.body.content,
		important: req.body.important || false,
		date: new Date(),
	});

	const savedNote = await note.save();
	const formattedNote = savedNote.toJSON();

	res.json(formattedNote);

	note.catch((error) => next(error));
});

// DELETE note by id
notesRouter.delete('/:id', async (req, res, next) => {
	const deletedNote = await Note.findByIdAndRemove(req.params.id);
	res.status(204).end();
	deletedNote.catch((error) => next(error));
});

// UPDATE note by id
notesRouter.put('/:id', async (req, res, next) => {
	const newNote = {
		content: req.body.content,
		important: req.body.important,
	};

	const updatedNote = await Note.findByIdAndUpdate(req.params.id, newNote, {
		new: true,
	});

	res.json(updatedNote);
	updatedNote.catch((error) => next(error));
});

module.exports = notesRouter;
