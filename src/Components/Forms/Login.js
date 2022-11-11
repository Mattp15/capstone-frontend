import { findByLabelText } from '@testing-library/react'
import React, { useState, useEffect, useContext } from 'react'
import Input from './Input'
import { url } from '../../url'

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [emailError, setEmailError] = useState(style.hidden)

  const handleChange = ({ target }) => {
    const { value, name } = target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = user
    fetchCall()
  }
  const fetchCall = () => {
    //set a fetchCall componant
  }
  return (
    <div style={style.container}>
      <h1>Login</h1>
      {/* <div style={style.container}> */}
      <form onSubmit={handleSubmit} style={style.formStyle}>
        <Input type='text' value={user.email} onChange={handleChange} name='email' inputStyle='default' />
        <Input type='text' value={user.password} onChange={handleChange} name='password' inputStyle='default' />
        <Input type='submit' value='Log in' name='submit' />
        <p style={emailError}>Email or Password does not match</p>
      </form>
    </div>
    // </div>
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
export const isValidPassword = (password) => {
  const pwdChk = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  if (password.match(pwdChk)) {
    return true
  }
}

const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
  },
  hidden: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0)',
  },
  show: {
    fontSize: '12px',
    color: 'red',
  },
}
