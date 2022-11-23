import React, { useEffect, useState } from 'react'
import { style } from '../../Resources/Style'
import '../../index.css'

const List = ({ value, sty, pkey, onClick }) => {
  const [list, setList] = useState()
  const [lineStyle, setLineStyle] = useState('li')
  useEffect(() => {
    if (sty) {
      setLineStyle(sty)
    }
  }, [sty])
  return (
    <li key={pkey} style={style[lineStyle]} onClick={() => setLineStyle(lineStyle === 'li' ? 'liStrike' : 'li')}>
      {value}
    </li>
  )
}
export default List

style.liStrike = {
  lineHeight: '2rem',
  textDecoration: 'line-through',
}
