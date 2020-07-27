const mongoose = require('mongoose');

const password = process.argv[2];

mongoose
  .connect(
    `mongodb+srv://admin-ezz:${password}@cluster0-0ns5n.mongodb.net/phone-db`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(console.log('Mongoose conntected'));

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 5) {
  Person.find({}).then((people) => {
    people.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const newPerson = new Person({
    name: process.argv[3],
    phone: process.argv[4],
  });
  newPerson.save().then((person) => {
    console.log('new person saved', person);
    mongoose.connection.close();
  });
}
