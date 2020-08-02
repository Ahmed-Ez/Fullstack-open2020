import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res;
};

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, blog, config);
  return res;
};

export default { getAll, setToken, createBlog };
