import React, { useState } from 'react'
import Login from './Forms/Login'
// import { Characters } from '../../public/images/characters'

const Landing = ({ item }) => {
  return (
    <div>
      <h1 className='letuce' style={style.letuce}>
        Letuce
      </h1>
      <h1 className='turnip' style={style.turnip}>
        Turnip
      </h1>
      <h2 className='the' style={style.the}>
        The
      </h2>
      <h1 className='beet' style={style.beet}>
        Beet
      </h1>

      <img src={'../../public/images/characters.png'} alt='a letuce, turnip and beet characters' />
    </div>
  )
}
export default Landing
const style = {
  lettuce: {
    color: 'red',
    fontSize: 20,
    border: 1,
    borderColor: 'black',
  },
  turnip: {},
  theBeet: {},
  p1: {},
  p2: {},
  button: {},
}
