import React from 'react'

const Input = ({ type, value, onChange, name, style }) => {
  return <input type={type} value={value} onChange={onChange} name={name} style={x.password[style]} />
}
export default Input

const x = {
  password: {
    green: {
      border: '3px solid green',
    },
    red: { border: '3px solid red' },
  },
}
