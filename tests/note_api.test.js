const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');
const api = supertest(app);

const initialNotes = [
	{
		content: 'HTML is easy',
		date: new Date(),
		important: false,
	},
	{
		content: 'Browser can execute only Javascript',
		date: new Date(),
		important: true,
	},
];

beforeEach(async () => {
	await Note.deleteMany({});
	let noteObject = new Note(initialNotes[0]);
	await noteObject.save();
	noteObject = new Note(initialNotes[1]);
	await noteObject.save();
});

test('notes are returned in json format', async () => {
	await api
		.get('/api/notes')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('there are two notes', async () => {
	const result = await api.get('/api/notes');

	expect(result.body).toHaveLength(initialNotes.length);
});

test('the first note is about html', async () => {
	const result = await api.get('/api/notes');
	const contents = result.body.map((r) => r.content);

	expect(contents).toContain('Browser can execute only Javascript');
});

afterAll(() => {
	mongoose.connection.close();
});
