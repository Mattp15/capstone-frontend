import React, { useState, useContext } from 'react'
import { style } from '../../Resources/Style'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button'

const UserRecipeListComponent = ({ key, value, style, status }) => {
  const [clicked, setClicked] = useState(false)
  const { setThingsDisplay, thingsDisplay } = useContext(UserContext)
  const handleClick = () => {
    !clicked ? setClicked(true) : setClicked(false)
  }
  const handleDelete = async ({ id }) => {
    const response = await Fetch('things/' + id, 'DELETE', '')
    setThingsDisplay((prev) => {
      return prev.filter((fil) => id !== fil.id)
    })
    console.log(thingsDisplay)
  }
  return (
    <div>
      <li key={key} style={style} onClick={handleClick}>
        {value}
      </li>
      {clicked ? <Button key={key} value={'Delete from ' + status} xtyle='button' /> : ''}
      {/* {clicked ? <Button key={key} value='Cancel' onClick={handleClick} style={style.userButton} /> : ''} */}
    </div>
  )
}
export default UserRecipeListComponent

const inStyle = {}
