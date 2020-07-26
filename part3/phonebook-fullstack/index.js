const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(cors());
app.use(express.json());

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body ')
);

app.use(express.static('build'));

let people = [
  {
    name: 'Ahmed Ezzat',
    phone: '222-222-222',
    id: 1,
  },
  {
    name: 'Arto Hellas',
    phone: '000-000-000',
    id: 2,
  },
  {
    id: 4,
    name: 'Dan Abramov',
    phone: '12-43-234345',
  },
  {
    id: 5,
    name: 'Mary Poppendieck',
    phone: '39-23-6423122',
  },
  {
    name: 'testing',
    phone: '222-222-222',
    id: 6,
  },
  {
    name: 'test',
    phone: '11-11-22',
    id: 7,
  },
];

app.get('/api/persons', (req, res) => {
  res.json(people);
});

app.get('/api/persons/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) return res.status(400).json({ error: 'Person not found' });
  return res.status(200).json({ person: person });
});

app.post('/api/persons', (req, res) => {
  const { name, phone } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  if (!phone) return res.status(400).json({ error: 'Phone is required' });
  if (people.find((person) => person.name === name))
    return res.status(400).json({ error: `${name} already exists` });
  const newPerson = { name, phone, id: Math.floor(Math.random() * 500) };
  people = people.concat(newPerson);
  return res.status(200).json({ message: 'Success' });
});

app.delete('/api/persons/:id', (req, res) => {
  people = people.filter((person) => person.id !== Number(req.params.id));
  return res.status(200).json({ message: 'Person deleted' });
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      people.length
    } people</p> <p> ${new Date()}</p>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('App listening on port 3001!');
});
