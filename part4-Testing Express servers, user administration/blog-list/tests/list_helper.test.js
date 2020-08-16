const listHelper = require('../utils/list_helper');

const noBlogs = [];
const oneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
];
const allBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('should return 1', () => {
  const result = listHelper.dummy(noBlogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(noBlogs);
    expect(result).toBe(0);
  });

  test('one blog equals the likes of that blog', () => {
    const result = listHelper.totalLikes(oneBlog);
    expect(result).toBe(7);
  });

  test('many blogs equals the sum of likes', () => {
    const result = listHelper.totalLikes(allBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('empty list is null', () => {
    const result = listHelper.favouriteBlog(noBlogs);
    expect(result).toBe(null);
  });

  test('one blog is that blog', () => {
    const result = listHelper.favouriteBlog(oneBlog);
    expect(result).toEqual({
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    });
  });

  test('many blogs returns the most liked one', () => {
    const result = listHelper.favouriteBlog(allBlogs);
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    });
  });
});

describe('author with most blogs', () => {
  test('empty list is null', () => {
    const result = listHelper.mostBlogs(noBlogs);
    expect(result).toBe(null);
  });

  test("one blog is that blog's author", () => {
    const result = listHelper.mostBlogs(oneBlog);
    expect(result).toEqual({
      author: 'Michael Chan',
      blogs: 1,
    });
  });

  test('many blogs returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(allBlogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('author with most likes', () => {
  test('empty list is null', () => {
    const result = listHelper.mostLikes(noBlogs);
    expect(result).toBe(null);
  });

  test("one blog returns that blog's author and likes", () => {
    const result = listHelper.mostLikes(oneBlog);
    expect(result).toEqual({ author: 'Michael Chan', likes: 7 });
  });

  test('many blogs returns the author with the most likes', () => {
    const result = listHelper.mostLikes(allBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
