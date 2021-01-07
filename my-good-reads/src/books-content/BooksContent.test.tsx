import React from 'react';
import { render } from '@testing-library/react';
import BooksContent from './BooksContent';

const books = [
    {
        id: 1,
        volumeInfo: {
            title: 'abc',
            subtitle: 'def',
            description: 'desc',
            imageLinks: {
                smallThumbnail: '/'
            }
        }
    }
]
test('renders no items text', () => {
  const { getByText } = render(<BooksContent books={[]} />);
  const textElement = getByText(/No items to show/i);
  expect(textElement).toBeInTheDocument();  
});

test('renders content', () => {
    const { container } = render(<BooksContent books={books} wishlist={[]} />);
    expect(container).not.toHaveTextContent('No items to show');  
});
