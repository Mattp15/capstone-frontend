import React from 'react'
import { style } from '../../Resources/Style'
const Button = ({ value, onClick, xtyle }) => {
  return (
    <button onClick={onClick} style={style.button}>
      {value}
    </button>
  )
}
export default Button
