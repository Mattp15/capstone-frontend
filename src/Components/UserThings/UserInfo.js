import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button/index'
import { RecipeIndex } from './index'
import { style } from '../../Resources/Style'
import { useLocation } from 'react-router-dom'
import { NavContainer } from '../Navigation/index'
import '../../index.css'

//This will be for the user to update their account information (consider added a (forgot password) feature)
const UserInfo = () => {
  const { loggedUser, setLoggedUser, usersThings, setUsersThings } = useContext(UserContext)
  const [favorites, setFavorites] = useState()
  const [dislikes, setDislikes] = useState()
  const location = useLocation()
  useEffect(() => {
    getUsersThings()
  }, [])
  const getUsersThings = async () => {
    const response = await Fetch('things/', 'GET', '')
    setUsersThings(response.data)
  }
  const handleClick = () => {
    //prolly use a Nav tag to change to a page for chnaging email/password require correct password to change password

    console.log(location)
    console.log(loggedUser)
  }

  return (
    <div style={style.container}>
      <NavContainer />
      <h1>User Info</h1>
      {loggedUser ? <p>{loggedUser}</p> : ''}
      <Button value='update email' onClick={handleClick} />
      <Button value='Change Password' />
      <div style={{ display: 'flex', marginRight: '10%' }}>
        <RecipeIndex />
      </div>
    </div>
  )
}
// put a stat here, the state should be set by clickign on the title and the onClick will populate the state, it should be cleared with a repeated click of title or replaced by clicking on another title, resulting in the card expanding (contains ingredients or    nutrition facts or description  or epand into button selections to "delete" or toggle favorite/dislike
export default UserInfo
