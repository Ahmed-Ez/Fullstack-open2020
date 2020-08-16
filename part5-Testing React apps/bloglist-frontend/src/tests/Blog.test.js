import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';

test('should render component with only title', () => {
  const blog = {
    id: 'id',
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container.querySelector('.title')).toBeDefined();
  expect(component.container.querySelector('.author')).toBeNull();
  expect(component.container.querySelector('.url')).toBeNull();
  expect(component.container.querySelector('.likes')).toBeNull();
});

describe('blog component buttons', () => {
  test('should render the rest of properties when button is clicked', () => {
    const blog = {
      id: 'id',
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 0,
    };

    const component = render(<Blog blog={blog} />);

    const button = component.getByText('View');
    fireEvent.click(button);
    expect(component.container.querySelector('.author')).toBeDefined();
    expect(component.container.querySelector('.url')).toBeDefined();
    expect(component.container.querySelector('.likes')).toBeDefined();
  });

  test('should return correct ammount of times like button has been clicked', () => {
    const blog = {
      id: 'id',
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 0,
    };
    const mockHandler = jest.fn();
    const component = render(<Blog blog={blog} likesHandler={mockHandler} />);

    const ViewButton = component.getByText('View');
    fireEvent.click(ViewButton);

    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe('Blog form tests', () => {
  test('should submit the form with the correct values', () => {
    const mockHandler = jest.fn();
    const component = render(<BlogForm submitBlog={mockHandler} />);

    const title = component.container.querySelector('[name="title"]');
    const author = component.container.querySelector('[name="author"]');
    const url = component.container.querySelector('[name="url"]');
    const form = component.container.querySelector('form');

    fireEvent.change(title, {
      target: { value: 'testtitle' },
    });
    fireEvent.change(author, {
      target: { value: 'testauthor' },
    });
    fireEvent.change(url, {
      target: { value: 'testurl' },
    });
    fireEvent.submit(form);
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toEqual({
      title: 'testtitle',
      author: 'testauthor',
      url: 'testurl',
    });
  });
});
