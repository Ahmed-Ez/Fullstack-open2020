const Blog = require('../models/Blog');
const blogRouter = require('express').Router();

blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({});

  if (blogs) return res.status(200).json(blogs);
  else return res.status(404).json({ error: 'No blogs found' });
});

blogRouter.post('/', async (req, res, next) => {
  const post = new Blog(req.body);
  const savedPost = await post.save();
  return res.status(201).json(savedPost);
});

blogRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id);
  return res.status(204).json({ message: 'blog deleted' });
});

blogRouter.put('/:id', async (req, res, next) => {
  const newBlog = await Blog.findByIdAndUpdate(req.params.id, {
    likes: req.body.likes,
  });
  return res.status(200).json(newBlog);
});

module.exports = blogRouter;
