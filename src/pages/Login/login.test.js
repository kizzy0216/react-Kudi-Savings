import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import { AuthProviderContainer } from 'context/AuthContext'
import Login from './Login'

test('Update UsernameInput value onChange', () => {
  // Arrange
  const fakeUser = { username: 'pheb@gmail', password: '1134hhh' }
  const { getByPlaceholderText } = render(
    <AuthProviderContainer>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProviderContainer>
  )

  let usernameNode = getByPlaceholderText('xxx@kudi.com')

  // Act
  fireEvent.change(usernameNode, { target: { value: fakeUser.username } })

  // Assert
  expect(usernameNode.value).toBe(fakeUser.username)
})

test('Update PasswordInput value onChange', () => {
  // Arrange
  const fakeUser = { username: 'pheb@gmail', password: '1234huhuh' }
  const { getByPlaceholderText } = render(
    <AuthProviderContainer>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProviderContainer>
  )

  let passwordNode = getByPlaceholderText('******')

  // Act

  fireEvent.change(passwordNode, { target: { value: fakeUser.password } })

  // Assert
  expect(passwordNode.value).toBe(fakeUser.password)
})
