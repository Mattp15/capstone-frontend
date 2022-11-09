import React, { useState } from 'react'
import Words from './Words'
import Login from './Forms/Login'

const Landing = ({ item }) => {
  return (
    <div>
      <p style={style.item}>test1</p>
      <p>test2</p>
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
