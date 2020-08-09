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

const likeBlog = async (id, likes) => {
  const res = await axios.put(`${baseUrl}/${id}`, { likes: likes });
  return res;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, { id }, config);
  return res;
};

export default { getAll, setToken, createBlog, likeBlog, deleteBlog };
