const Blog = require('../models/Blog');
const User = require('../models/User');
const blogRouter = require('express').Router();
const config = require('../utils/config');
const jwt = require('jsonwebtoken');
blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  if (blogs) return res.status(200).json(blogs);
  else return res.status(404).json({ error: 'No blogs found' });
});

blogRouter.post('/', async (req, res, next) => {
  const token = await jwt.verify(req.token, config.SECRET);
  if (!token || !token.id)
    return res.status(401).json({ error: 'invalid token' });
  const { title, author, url, likes } = req.body;
  const post = new Blog({
    title,
    author,
    url,
    likes,
    user: token.id,
  });
  const user = await User.findById(token.id);
  const savedPost = await post.save();
  user.blogs = user.blogs.concat(post);
  await user.save();
  return res.status(201).json(savedPost);
});

blogRouter.delete('/:id', async (req, res, next) => {
  // const token = await jwt.verify(req.token, config.SECRET);
  // if (!token || !token.id)
  //   return res.status(401).json({ error: 'invalid token' });
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ erorr: 'no blog found' });
  // if (!(blog.user.toString() === token.id))
  //   return res.status(401).json({ error: 'not authorized' });
  // const user = await User.findById(token.id);
  // user.blogs = user.blogs.filter((b) => blog.id !== b._id.toString());
  // await user.save();
  await blog.delete();

  return res.status(204).json({ message: 'deleted blog' });
});

blogRouter.put('/:id', async (req, res, next) => {
  const newBlog = await Blog.findByIdAndUpdate(req.params.id, {
    likes: req.body.likes,
  });
  return res.status(200).json(newBlog);
});

blogRouter.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: 'No blog found' });
  blog.comments = blog.comments.concat(req.body.comment);
  await blog.save();
  return res.status(200).json({ comment: req.body.comment });
});

module.exports = blogRouter;
