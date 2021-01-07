import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders heading', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/My Good Reads/i);
  expect(textElement).toBeInTheDocument();  
});
