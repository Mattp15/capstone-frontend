import React, { useState, useEffect, useContext } from 'react'
import Input from './Input'
import Fetch from '../../Resources/Fetch'
import { UserContext } from '../../App'
import { useNavigate, NavLink } from 'react-router-dom'
import { NavContainer } from '../Navigation'
import { style } from '../../Resources/Style'

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
      {/* <div style={style.container}> */}
      <form onSubmit={handleSubmit} style={style.formStyle}>
        <h1 className='form-header'>Login</h1>
        <div className='inputWrapper'>
          <Input type='text' value={user.email} onChange={handleChange} name='email' inputStyle='default' />
          <img src={require('../../images/emailicon.png')} alt='Envelope' className='email-two' />
        </div>
        <div className='inputWrapper'>
          <Input type='password' value={user.password} onChange={handleChange} name='password' inputStyle='default' />
          <img src={require('../../images/lockicon.png')} alt='Padlock' className='lock-two' />
        </div>
        <p className='landing-login' style={style.already}>
          Don't have an account?{' '}
          <span style={{ fontWeight: 'bold' }}>
            <NavLink style={style.navLink2} to='/register'>
              Register
            </NavLink>
          </span>
        </p>
        <Input type='submit' value='Log in' name='submit' />
        <p style={emailError}>Email or Password does not match or is invalid</p>
      </form>
      <p className='footer-login'>The information on this website is for general informatiional purposes only. Letuce Turnip the Beet makes no representation or warranty, express or implied. Your use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for.</p>
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

// const style = {
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//     flexDirection: 'column',
//   },
//   formStyle: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   hidden: {
//     fontSize: '12px',
//     color: 'rgba(0, 0, 0, 0)',
//   },
//   show: {
//     fontSize: '12px',
//     color: 'red',
//   },
// }
