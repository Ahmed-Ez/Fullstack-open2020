import axios from 'axios';

const url = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(url).then((res) => res.data);
};

const addPerson = (person) => {
  return axios.post(url, person).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`);
};

const updatePerson = (id, person) => {
  return axios.put(`${url}/${id}`, person).then((res) => res.data);
};

export default {
  getAll,
  addPerson,
  deletePerson,
  updatePerson,
};
