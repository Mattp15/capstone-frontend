import React, { useContext, useInsertionEffect } from 'react'
import { Button } from '../Button/index'
import { LogoutButton } from './index'
import { Login } from '../Forms/index'
import UserRecipeList from '../UserThings/UsersRecipeList'
import { UserContext } from '../../App'
import { style } from '../../Resources/Style'
import Fetch from '../../Resources/Fetch'
const URL = 'http://localhost:3000'

const NavContainer = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext)

  const handleClick = (target) => {
    switch (target) {
      default:
        break
      case 'user':
        window.location.href = URL + '/user'
        break
      case 'recipes':
        window.location.href = URL + '/user/list'
        break
      case 'shopping':
        window.location.href = URL + '/user/list/shopping'
        break
      case 'roulette':
        window.location.href = URL + '/roulette'
        break
      case 'login':
        window.location.href = URL + '/login'
    }
  }
  const handleLogout = async () => {
    const response = await Fetch('user/logout', 'GET')
    if (response.status === 200) {
      //redirect to landing page
      setLoggedUser('')
    }
  }
  return (
    <div style={style.buttonContainer}>
      {loggedUser ? (
        <Button style={style.navButton} value='Log Out' onClick={handleLogout} />
      ) : (
        <Button
          style={style.navButton}
          value='Login'
          onClick={() => {
            handleClick('login')
          }}
        />
      )}
      <Button
        style={style.navButton}
        value='Account Info'
        onClick={() => {
          handleClick('user')
        }}
      />
      <Button
        style={style.navButton}
        value='Recipes'
        onClick={() => {
          handleClick('recipes')
        }}
      />
      <Button
        style={style.navButton}
        value='Shopping List'
        onClick={() => {
          handleClick('shopping')
        }}
      />
      <Button
        style={style.navButton}
        value='Roulette'
        onClick={() => {
          handleClick('roulette')
        }}
      />
    </div>
  )
}
export default NavContainer
