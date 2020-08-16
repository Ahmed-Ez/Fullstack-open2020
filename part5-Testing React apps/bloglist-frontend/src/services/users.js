import axios from 'axios';

const login = async (username, password) => {
  const res = await axios.post('/api/login', { username, password });
  return res.data;
};

export default { login };
