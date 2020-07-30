const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const Blog = require('../models/Blog');
const testHelper = require('./test_helper');
const test_helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsObjects = testHelper.initialBlogs.map((blog) => new Blog(blog));
  const promises = blogsObjects.map((blog) => blog.save());
  await Promise.all(promises);
});

describe('returning blogs is working', () => {
  test('correct ammount of blogs is returned as json ', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(res.body).toHaveLength(test_helper.initialBlogs.length);
  });

  test('unique identifier is called id', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
  });
});

describe('adding new blogs works correctly', () => {
  test('new blogs are added successfully', async () => {
    const newBlog = new Blog({
      title: 'new Blog',
      author: 'Tester',
      url: 'testing url',
      likes: 999,
    });
    const res = await newBlog.save();
    const currentBlogs = await test_helper.blogsInDb();
    expect(currentBlogs.length).toBe(test_helper.initialBlogs.length + 1);
    expect(res.title).toBe('new Blog');
  });

  test('if no like property is provided 0 is the default', async () => {
    const newBlog = new Blog({
      title: 'new Blog',
      author: 'Tester',
      url: 'testing url',
    });
    const res = await newBlog.save();
    expect(res.likes).toBe(0);
  });

  test('title and url required and 400 is returned if they are not provided', async () => {
    const newBlog = new Blog({
      author: 'Tester',
      likes: 5,
    });
    const res = await api.post('/api/blogs').expect(400);
  });
});

describe('deleting single blog with an id', () => {
  test('status code 400 if invalid id is provided', async () => {
    await api.delete('/api/blogs/444').expect(400);
  });
  test('status code 204 if valid id is provided ', async () => {
    await api
      .delete(`/api/blogs/${test_helper.initialBlogs[0]._id}`)
      .expect(204);
  });
});

describe('modifying a single blog with an id', () => {
  test('status code 400 if invalid id is provided', async () => {
    await api.put('/api/blogs/444').expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
