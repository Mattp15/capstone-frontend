import { findByLabelText } from '@testing-library/react'
import React, { useState, useEffect, useContext } from 'react'
import Input from './Input'

const Login = (props) => {
  const [email, setEmail] = useState()
  const [matchEmail, setMatchEmail] = useState()
  const [password, setPassword] = useState()
  const [matchPassword, setMatchPassword] = useState()
  const [submission, setSubmission] = useState()
  const [color, setColor] = useState()

  const handleChange = ({ target }) => {
    const { value, name } = target
    console.log(value, name)
    if (name === 'email') {
      setEmail((prev) => {
        prev += value
      })
    } else if (name === 'matchEmail') {
      setMatchEmail((prev) => {
        prev += value
      })
    }
    const passwordRegex = 'temp'
    if (name === 'password') {
      setPassword((prev) => {
        prev += value
      })
    } else if (name === 'matchPassword') {
      setMatchPassword((prev) => {
        prev += value
      })
      setColor('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const addToSubmissions = (value, name) => {
      setSubmission((prev) => ({
        prev,
        [name]: value,
      }))
    }
    const { target } = e
    if (target[0].value.toLowerCase() === target[1].value.toLowerCase()) {
      const { value, name } = target[0]
      if (isValidEmail(value)) {
        console.log('valid')
        addToSubmissions(value.toLowerCase(), name)
      }
    } else {
      console.log('not matching')
      return false
    }
    if (target[2].value === target[3].value) {
      console.log(target[2].value, target[3].value, 'matching')
    } else {
      console.log('whoo')
      setColor('red')
      console.log(style.password.borderColor)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={style.formStyle}>
      <Input type='text' value={email} name='email' onChange={handleChange} />
      <Input type='text' value={matchEmail} name='matchEmail' onChange={handleChange} />
      <label>split</label>
      <Input type='text' value={password} name='password' onChange={handleChange} />
      <Input type='text' value={matchPassword} name='matchPassword' onChange={handleChange} style={color} />
      <Input type='submit' value='Submit' />
    </form>
  )
}
export default Login

export const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  if (email.match(regex)) {
    if (/gmail.com$/.test(email) || /yahoo.com$/.test(email) || /hotmail.com$/.test(email) || /aol.com$/.test(email) || /comcast.net$/.test(email) || /outlook.com$/.test(email)) {
      return true
    }
  }
}
const style = {
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '20vw',
    margin: '0 auto',
  },
  // green: {
  //   border: '3px solid green',
  // },
  // red: {
  //   border: '3px solid red',
  // },
}
