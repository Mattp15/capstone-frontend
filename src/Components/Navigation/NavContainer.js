import React, { useContext, useEffect, useInsertionEffect } from 'react'
import { Button } from '../Button/index'
import { LogoutButton } from './index'
import { UserContext } from '../../App'
import { style } from '../../Resources/Style'
import Fetch from '../../Resources/Fetch'
import { useLocation, NavLink } from 'react-router-dom'

const URL = 'http://localhost:3000'

const NavContainer = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext)
  const location = useLocation()
  const handleClick = (target) => {
    console.log(location)
    // switch (target) {
    //   default:
    //     break
    //   case 'user':
    //     window.location.href = URL + '/user'
    //     break
    //   case 'recipes':
    //     window.location.href = URL + '/user/list'
    //     break
    //   case 'shopping':
    //     window.location.href = URL + '/user/list/shopping'
    //     break
    //   case 'roulette':
    //     window.location.href = URL + '/roulette'
    //     break
    //   case 'login':
    //     window.location.href = URL + '/login'
    // }
  }
  useEffect(() => {
    console.log(loggedUser)
  }, [loggedUser])

  const handleLogout = async () => {
    const response = await Fetch('user/logout', 'GET')
    if (response.status === 200) {
      setLoggedUser('')
      window.location.href = URL + '/'
    }
  }
  return (
    <div style={style.buttonContainer}>
      {loggedUser ? (
        <Button
          value={
            <NavLink to='/' style={style.navButton}>
              Logout
            </NavLink>
          }
          onClick={handleLogout}
        />
      ) : (
        <Button
          value={
            <NavLink to='/user' style={style.navButton}>
              Login
            </NavLink>
          }
        />
      )}
      <Button
        value={
          <NavLink to='/user' style={style.navButton}>
            Account
          </NavLink>
        }
      />
      <Button
        value={
          <NavLink to='/user/list' style={style.navButton}>
            Recipes
          </NavLink>
        }
      />
      <Button
        value={
          <NavLink to='/user/list/shopping' style={style.navButton}>
            Shopping List
          </NavLink>
        }
      />
      <Button
        value={
          <NavLink to='/roulette' style={style.navButton}>
            Roulette
          </NavLink>
        }
      />
    </div>
  )
}
export default NavContainer
