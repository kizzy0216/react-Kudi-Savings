import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, fireEvent, screen } from '@testing-library/react'
import CreateMarket from './create-market'

const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.json({ token: 'fake_user_token' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  window.localStorage.removeItem('token')
})
afterAll(() => server.close())

test('allows the user to create market successfully', () => {
  render(<CreateMarket />)
  fireEvent.change(screen.getByLabelText(/Market name/i), {
    target: { value: 'Alaba' }
  })
  fireEvent.change(screen.getByLabelText(/City/i), {
    target: { value: 'lekki' }
  })
  fireEvent.change(screen.getByLabelText(/Select State/i), {
    target: { value: 'LAGOS' }
  })
  fireEvent.change(screen.getByLabelText(/lga/i), {
    target: { value: 'eti-osa' }
  })
  fireEvent.click(screen.getByText(/Submit/i))
})
