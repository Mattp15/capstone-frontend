import { findByLabelText } from '@testing-library/react'
import React, { useState, useEffect, useContext } from 'react'
import Input from './Input'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [matchEmail, setMatchEmail] = useState('')
  const [password, setPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState('')

  const handleChange = ({ target }) => {
    const { value, name } = target
    console.log(value, name)
    if (name === 'email') {
      setEmail((prev) => {
        prev += value
      })
    }
  }

  return (
    <form style={style.formStyle}>
      <Input type='text' value={email} name='email' onChange={handleChange} />
      <Input type='text' value={matchEmail} name='matchEmail' onChange={handleChange} />
    </form>
  )
}
export default Login

const style = {
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '20vw',
    margin: '0 auto',
  },
}
