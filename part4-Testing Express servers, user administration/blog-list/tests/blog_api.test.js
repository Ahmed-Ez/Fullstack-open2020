const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const Blog = require('../models/Blog');
const User = require('../models/User');
const test_helper = require('./test_helper');
const bcrypt = require('bcryptjs');
const token =
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVmMjQ0MmRlNTZjNDI0MjYzY2FkNDhmNyIsImlhdCI6MTU5NjI4NTQ4MH0.hO-aM2ih1HB6ufvqYaSl3aD2U8KmWhrS37ctc8jZDMI';

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsObjects = test_helper.initialBlogs.map((blog) => new Blog(blog));
  const promises = blogsObjects.map((blog) => blog.save());
  await Promise.all(promises);

  await User.deleteMany({});
  const user = new User({
    name: 'root',
    username: 'root',
    password: await bcrypt.hash('55555', 10),
    blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8'],
    _id: '5f2442de56c424263cad48f7',
  });

  await user.save();
});

describe('users', () => {
  test('getting users works', async () => {
    const res = await api.get('/api/users').expect(200);
    expect(res.body[0].username).toBe('root');
  });

  test('registering users work ', async () => {
    const user = {
      name: 'ahmed',
      username: 'admin',
      password: '55555',
    };
    const res = await api.post('/api/users').send(user).expect(200);
    expect(res.body.username).toBe('admin');
  });
  test('registering fails if no username is provided', async () => {
    const user = {
      name: 'ahmed',
      password: '55555',
    };
    const res = await api.post('/api/users').send(user).expect(400);
    expect(res.body.error).toBeDefined();
  });
  test('authenticating user and getting a token works', async () => {
    const user = {
      username: 'root',
      password: '55555',
    };
    const res = await api.post('/api/login').send(user).expect(200);
    expect(res.body.username).toBe('root');
    expect(res.body.token).toBeDefined();
  });
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
    const res = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .expect(201)
      .send(newBlog);
    const currentBlogs = await test_helper.blogsInDb();
    expect(currentBlogs.length).toBe(test_helper.initialBlogs.length + 1);
    expect(res.body.title).toBe('new Blog');
  });

  test('if no like property is provided 0 is the default', async () => {
    const newBlog = new Blog({
      title: 'new Blog',
      author: 'Tester',
      url: 'testing url',
    });
    const res = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog);
    expect(res.body.likes).toBe(0);
  });

  test('title and url required and 400 is returned if they are not provided', async () => {
    const newBlog = new Blog({
      author: 'Tester',
      likes: 5,
    });
    const res = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .expect(400)
      .send(newBlog);
  });

  test('adding new blog fails if no valid token is provided', async () => {
    const newBlog = new Blog({
      title: 'new Blog',
      author: 'Tester',
      url: 'testing url',
      likes: 999,
    });
    const res = await api
      .post('/api/blogs')
      .set('Authorization', '555555')
      .expect(401)
      .send(newBlog);
    const currentBlogs = await test_helper.blogsInDb();
    expect(currentBlogs.length).toBe(test_helper.initialBlogs.length);
    expect(res.body.error).toBe('invalid token');
  });
});

describe('deleting single blog with an id', () => {
  test('status code 400 if invalid id is provided', async () => {
    await api.delete('/api/blogs/444').set('Authorization', token).expect(400);
  });

  test('status code 204 if valid id is provided ', async () => {
    await api
      .delete(`/api/blogs/${test_helper.initialBlogs[0]._id}`)
      .set('Authorization', token)
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
