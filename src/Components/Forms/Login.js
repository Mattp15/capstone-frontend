import React, { useState, useEffect, useContext } from 'react'
import Input from './Input'
import Fetch from '../../Resources/Fetch'
import { UserContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { NavContainer } from '../Navigation'

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [emailError, setEmailError] = useState(style.hidden)
  const { setLoggedUser, loggedUser } = useContext(UserContext)
  const handleChange = ({ target }) => {
    const { value, name } = target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = user
    if (isValidEmail(email) && isValidPassword(password)) {
      try {
        const response = await Fetch('user/login', 'POST', { email, password })

        if (response.status === 200) {
          console.log(response.message)
          setLoggedUser(user.email)
          navigate('/roulette')
        } else if (response.status === 404) {
          console.log(response.message)
        } else {
          setEmailError(style.show)
        }
      } catch (err) {
        setEmailError(style.show)
      }
    } else {
      setEmailError(style.show)
    }
  }

  return (
    <div style={style.container}>
      <h1>Login</h1>
      {/* <div style={style.container}> */}
      <form onSubmit={handleSubmit} style={style.formStyle}>
        <Input type='text' value={user.email} onChange={handleChange} name='email' inputStyle='default' />
        <Input type='password' value={user.password} onChange={handleChange} name='password' inputStyle='default' />
        <Input type='submit' value='Log in' name='submit' />
        <p style={emailError}>Email or Password does not match or is invalid</p>
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
