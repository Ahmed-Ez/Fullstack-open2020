const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  let fav = blogs[0];
  blogs.forEach((blog) => {
    if (fav.likes < blog.likes) fav = blog;
  });
  return fav;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  let authors = {};
  let mostBlogsAuthor = { blogs: 0 };
  blogs.forEach((blog) => {
    if (authors[blog.author]) authors[blog.author] = authors[blog.author] + 1;
    else authors[blog.author] = 1;
    if (authors[blog.author] > mostBlogsAuthor.blogs)
      mostBlogsAuthor = { author: blog.author, blogs: authors[blog.author] };
  });
  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  let authors = {};
  let mostLikesAuthor = { likes: 0 };
  blogs.forEach((blog) => {
    if (authors[blog.author])
      authors[blog.author] = authors[blog.author] + blog.likes;
    else authors[blog.author] = blog.likes;
    if (authors[blog.author] > mostLikesAuthor.likes)
      mostLikesAuthor = { author: blog.author, likes: authors[blog.author] };
  });
  return mostLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
