import React from 'react';
import { render } from '@testing-library/react';
import Wishlist from './Wishlist';

const wishlist = [
    {
        id: 1,        
        name: 'abc',
    }
]
test('renders no items text', () => {
  const { getByText } = render(<Wishlist wishlist={[]} />);
  const textElement = getByText(/My Reading Wishlist/i);
  expect(textElement).toBeInTheDocument();  
});

test('renders content', () => {
    const { container } = render(<Wishlist wishlist={wishlist} />);
    expect(container).toHaveTextContent('My Reading Wishlist (1)');  
});
