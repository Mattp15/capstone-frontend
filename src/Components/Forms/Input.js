import React from 'react'
import { NavLink } from 'react-router-dom'

const Input = ({ type, value, onChange, name, inputStyle, link, placeholder, className }) => {
  return (
    <label>
      <label htmlFor={name} style={style.hideLabel}>
        {name}
      </label>
      <input type={type} value={value} onChange={onChange} name={name} style={style[inputStyle]} placeholder={placeholder} className={className} />
    </label>
  )
}
export default Input

const style = {
  hideLabel: {
    display: 'none',
  },
  default: {
    marginBottom: '12px',
  },
}
