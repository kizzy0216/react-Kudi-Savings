import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders loading', () => {
  const { getAllByText } = render(<App />)
  const linkElement = getAllByText(/Loading/i)
  expect(linkElement).toBeTruthy()
})
