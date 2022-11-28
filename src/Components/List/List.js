import React, { useEffect, useState } from 'react'
import { style } from '../../Resources/Style'
import '../../index.css'

const List = ({ value, sty, pkey, onClick, className, type }) => {
  const [list, setList] = useState()
  const [lineStyle, setLineStyle] = useState('li')

  if (type === 'strikeThrough') {
    return (
      <li key={pkey} style={style[lineStyle]} onClick={() => setLineStyle(lineStyle === 'li' ? 'liStrike' : 'li')} className='shopping-list-single'>
        {value}
      </li>
    )
  } else if (type === 'reg') {
    return (
      <li key={pkey} onClick={onClick} className={className}>
        {value}
      </li>
    )
  }
}
export default List

style.liStrike = {
  lineHeight: '2rem',
  textDecoration: 'line-through',
  textAlign: 'right',
}
style.li = {
  textAlign: 'left',
}
