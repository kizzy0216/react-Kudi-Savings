import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ChangePassword from './change-password'

test('Update UsernameInput value onChange', () => {
  render(<ChangePassword />)

  fireEvent.change(screen.getByLabelText(/Current Password/i), {
    target: { value: 'F@ceB00k123$' }
  })

  fireEvent.change(screen.getByLabelText(/New Password/i), {
    target: { value: 'Facebook123$' }
  })
  fireEvent.click(screen.getByText(/Submit/i))
})
