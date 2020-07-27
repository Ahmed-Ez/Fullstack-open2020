require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');

//MIDDLE WARES
//Static
app.use(express.static('build'));
//proxy
app.use(cors());
// bodyparser
app.use(express.json());
//logger
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body ')
);

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((people) => {
      res.status(200).json(people);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) return res.status(200).json({ person });
      else return res.status(404).json({ error: 'Person not found' });
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { name, phone } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  if (!phone) return res.status(400).json({ error: 'Phone is required' });
  // if (people.find((person) => person.name === name))
  //   return res.status(400).json({ error: `${name} already exists` })
  const newPerson = new Person({ name, phone });
  newPerson
    .save()
    .then((newPerson) => {
      return res.status(200).json(newPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, { phone: req.body.phone })
    .then((newPerson) => {
      return res.status(200).json(newPerson);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(202).json(result);
    })
    .catch((error) => next(error));
});

app.get('/info', (req, res) => {
  Person.find({})
    .then((people) => {
      return res.send(
        `<p>Phonebook has info for ${
          people.length
        } people</p> <p> ${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

//Error handling middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'invalid  id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
