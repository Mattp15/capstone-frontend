import React from 'react'
import { style } from '../../Resources/Style'
const Button = ({ value, onClick, className }) => {
  return (
    <button onClick={onClick} style={style.button} className={className}>
      {value}
    </button>
  )
}
export default Button
