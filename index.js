const express = require('express');
const cors = require('cors');

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		date: '2019-05-30T17:30:31.098Z',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only Javascript',
		date: '2019-05-30T18:39:34.091Z',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2019-05-30T19:20:14.298Z',
		important: true,
	},
];

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('<h1>Hello base url.</h1>'));

app.get('/api/notes', (req, res) => res.json(notes));

app.get('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id);
	const note = notes.find((note) => note.id === id);
	note ? res.json(note) : res.status(404).end();
});

app.post('/api/notes', (req, res) => {
	const id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 0;

	if (!req.body) {
		return res.status(400).json({
			error: 'Content missing.',
		});
	}

	const note = {
		content: req.body.content,
		important: req.body.important || false,
		date: new Date(),
		id: id,
	};

	notes.push(note);

	res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id);
	note = notes.find((note) => note.id === id);

	if (note) {
		notes = notes.filter((note) => note.id !== id);
		res.status(204).end('Note deleted successfully.');
	} else {
		res.status(404).end('Note not found.');
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running at port ${PORT}.`));
