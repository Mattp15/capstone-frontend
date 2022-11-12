import React from 'react'

const Input = ({ type, value, onChange, name, inputStyle }) => {
  return (
    <label>
      <label htmlFor={name} style={style.hideLabel}>
        {name}
      </label>
      <input type={type} value={value} onChange={onChange} name={name} style={style[inputStyle]} />
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
