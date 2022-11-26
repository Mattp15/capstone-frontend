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
      <img src={require('../../images/pizza.png')} alt='cute pizza' width='100px' style={style.pizza} />
      <img src={require('../../images/sando.png')} alt='cute sandowich' width='100px' style={style.sando} />
      <img src={require('../../images/taco.png')} alt='cute taco' width='100px' style={style.taco} />
      <img src={require('../../images/fries.png')} alt='cute fries' width='100px' style={style.fries} />
      {loggedUser ? <h1 className='form-header'>{loggedUser.split('@').shift().toUpperCase()}</h1> : ''}

      {loggedUser ? <RecipeIndex /> : ''}
    </div>
  )
}

export default UserInfo
