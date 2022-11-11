import { findByLabelText } from '@testing-library/react'
import React, { useState, useEffect, useContext } from 'react'
import Input from './Input'
import { url } from '../../url'

const Register = (props) => {
  const [email, setEmail] = useState('')
  const [matchEmail, setMatchEmail] = useState('')
  const [password, setPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState('')
  const [submission, setSubmission] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleChange = ({ target }) => {
    const { value, name } = target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'matchEmail') {
      setMatchEmail(value)
    }
    if (name === 'password') {
      setPassword(value)
    } else if (name === 'matchPassword') {
      setMatchPassword(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const addToSubmissions = (value, name) => {
      setSubmission((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    const { target } = e
    if (target[0].value.toLowerCase() === target[1].value.toLowerCase()) {
      const { value, name } = target[0]
      setEmailError('')
      if (isValidEmail(value)) {
        addToSubmissions(value.toLowerCase(), name)
      } else {
        setEmailError('Please enter a valid Email address')
        return
      }
    } else {
      setEmailError('Emails not matching')
      return
    }
    if (target[2].value === target[3].value && target[2].value.length) {
      const { value, name } = target[2]
      if (isValidPassword(value)) {
        setErrorMessage()
        addToSubmissions(value, name)
      } else {
        setErrorMessage('Please meet the password requirements')
        return
      }
    } else {
      setErrorMessage('Passwords not matching')
      return
    }
    fetchCall()
  }
  const fetchCall = async () => {
    const response = await fetch(url + 'user/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'matt@gmail.com',
        password: 'fuckme1234',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(response.status)
    //add redirect here
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={style.formStyle}>
        <Input type='text' value={email} name='email' onChange={handleChange} inputStyle='default' />
        <Input type='text' value={matchEmail} name='matchEmail' onChange={handleChange} inputStyle='default' />
        {emailError ? <p style={style.notMatching}>{emailError}</p> : ''}
        <Input type='text' value={password} name='password' onChange={handleChange} inputStyle='default' />
        <Input type='text' inputStyle='default' value={matchPassword} name='matchPassword' onChange={handleChange} />
        {errorMessage ? <p style={style.notMatching}>{errorMessage}</p> : ''}
        <Input type='submit' value='Submit' />
      </form>
    </div>
  )
}
export default Register

export const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  if (email.match(regex)) {
    if (/gmail.com$/.test(email) || /yahoo.com$/.test(email) || /hotmail.com$/.test(email) || /aol.com$/.test(email) || /comcast.net$/.test(email) || /outlook.com$/.test(email)) {
      return true
    }
  }
}
export const isValidPassword = (password) => {
  const pwdChk = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  if (password.match(pwdChk)) {
    return true
  }
}

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
  },
  notMatching: {
    alignItems: 'flex-start',
    color: 'red',
    display: 'flex',
    fontSize: '.7em',
    margin: '2px',
  },
}
