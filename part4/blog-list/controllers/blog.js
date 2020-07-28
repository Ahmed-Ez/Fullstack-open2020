const Blog = require('../models/Blog');
const blogRouter = require('express').Router();

blogRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then((blog) => {
      if (blog) return res.status(200).json(blog);
      else return res.status(400).json({ error: 'No blogs found' });
    })
    .catch((erorr) => {
      next(error);
    });
});

blogRouter.post('/', (req, res, next) => {
  const post = new Blog(req.body);
  post
    .save()
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = blogRouter;
