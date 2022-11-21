import React, { useEffect, useState } from 'react'
import { style } from '../../Resources/Style'

const List = ({ value, sty, key, onClick }) => {
  const [list, setList] = useState()
  const [lineStyle, setLineStyle] = useState('li')
  useEffect(() => {
    if (sty) {
      setLineStyle(sty)
    }
  }, [sty])
  return (
    <li key={key} style={style[lineStyle]} onClick={() => setLineStyle(lineStyle === 'li' ? 'liStrike' : 'li')}>
      {value}
    </li>
  )
}
export default List

style.liStrike = {
  lineHeight: '2rem',
  textDecoration: 'line-through',
}
