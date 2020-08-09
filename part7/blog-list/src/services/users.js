import axios from 'axios';

const login = async (username, password) => {
  const res = await axios.post('/api/login', { username, password });
  return res;
};

const getAll = async () => {
  const res = await axios.get('/api/users');
  return res;
};

export default { login, getAll };
