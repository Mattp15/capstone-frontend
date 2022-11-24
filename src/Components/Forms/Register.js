import { findByLabelText } from '@testing-library/react'
import React, { useState, useEffect, useContext } from 'react'
import Input from './Input'
import Fetch from '../../Resources/Fetch'
import { UserContext } from '../../App'
import { NavLink } from 'react-router-dom'
import { style } from '../../Resources/Style'
const Register = (props) => {
  const [email, setEmail] = useState('')
  const [matchEmail, setMatchEmail] = useState('')
  const [password, setPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState('')
  const [submission, setSubmission] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const [emailError, setEmailError] = useState('')

  const { setLoggedUser } = useContext(UserContext)

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
    if (!isValidEmail(target[0].value.toLowerCase())) {
      setEmailError('Please enter a valid Email address')
      return
    } else if (target[0].value.toLowerCase() === target[1].value.toLowerCase()) {
      const { value, name } = target[0]
      setEmailError('')
      if (isValidEmail(value)) {
        addToSubmissions(value.toLowerCase(), name)
      }
    } else {
      setEmailError('Emails not matching')
      return
    }
    if (!isValidPassword(target[2].value)) {
      setErrorMessage('Please meet the password requirements')
      return
    } else {
      if (target[2].value !== target[3].value) {
        setErrorMessage('Passwords do not match')
        return
      } else if (target[2].value === target[3].value) {
        setErrorMessage('')
      }
    }
    if (isValidEmail(email) && isValidPassword(password)) {
      const response = await Fetch('user/register', 'POST', { email, password })
      console.log(response)
      if (response.status === 200) {
        setLoggedUser(email)
        //add redirect
      } else if (response.status === 401) {
        console.log(response.message)
      }
    }
  }

  return (
    <div style={style.formContainer}>
      <form onSubmit={handleSubmit} style={style.formStyle} className='form-container'>
        <h1 className='form-header'>Sign Up</h1>
        <div className='inputWrapper'>
          <Input type='text' value={email} name='email' onChange={handleChange} inputStyle='default' placeholder='Email' style={{ paddingRight: '200px' }} />

          <img src={require('../../images/emailicon.png')} alt='Envelope' className='email-one' />
        </div>
        <div className='inputWrapper'>
          <Input type='text' value={matchEmail} name='matchEmail' onChange={handleChange} inputStyle='default' placeholder='Match-Email' />
          <img src={require('../../images/emailicon.png')} alt='Envelope' className='email-two' />
          {emailError ? (
            <p style={style.notMatching} className='error'>
              {emailError}
            </p>
          ) : (
            ''
          )}
        </div>
        <div className='inputWrapper'>
          <Input type='password' value={password} name='password' onChange={handleChange} inputStyle='default' placeholder='Password' />
          <img src={require('../../images/lockicon.png')} alt='Padlock' className='lock-one' />
        </div>
        <div className='inputWrapper'>
          <Input type='password' inputStyle='default' value={matchPassword} name='matchPassword' onChange={handleChange} placeholder='Match-Password' />
          <img src={require('../../images/lockicon.png')} alt='Padlock' className='lock-two' />
          {errorMessage ? (
            <p style={style.notMatching} className='error'>
              {errorMessage}
            </p>
          ) : (
            ''
          )}
        </div>
        <p className='landing-login' style={style.already}>
          Have an account?{' '}
          <span style={{ fontWeight: 'bold' }}>
            <NavLink style={style.navLink2} to='/login'>
              Login
            </NavLink>
          </span>
        </p>
        <Input type='submit' value='CREATE ACCOUNT' />
      </form>
      <p className='footer-register'>The information on this website is for general informatiional purposes only. Letuce Turnip the Beet makes no representation or warranty, express or implied. Your use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for.</p>
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
