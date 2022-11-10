import React from 'react'

const Input = ({ type, value, onChange, name, style }) => {
  return (
    <label>
      <label htmlFor={name} style={x.hideLabel}>
        {name}
      </label>
      <input type={type} value={value} onChange={onChange} name={name} style={x.password[style]} />
    </label>
  )
}
export default Input

const x = {
  hideLabel: {
    display: 'none',
  },
  password: {
    green: {
      border: '3px solid green',
    },
    red: { border: '3px solid red' },
  },
}
