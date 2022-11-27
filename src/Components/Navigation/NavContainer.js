import React, { useContext, useState } from 'react'
import { Button } from '../Button/index'
import { LogoutButton } from './index'
import { UserContext } from '../../App'
import { style } from '../../Resources/Style'
import Fetch from '../../Resources/Fetch'
import { NavLink } from 'react-router-dom'
import '../../index.css'
const URL = 'http://localhost:3000'

const NavContainer = () => {
  const { loggedUser, setLoggedUser, shoppingList } = useContext(UserContext)
  const [clicked, setClicked] = useState(false)

  const handleLogout = async () => {
    const response = await Fetch('user/logout', 'GET')
    if (response.status === 200) {
      setLoggedUser('')
      window.location.href = URL + '/'
    }
  }
  return (
    <div>
      <h5 className='nav-lettuce'>Lettuce</h5>
      <h5 className='nav-turnip'>Turnip</h5>
      <h5 className='nav-the'>The</h5>
      <h5 className='nav-beet'>Beet</h5>
      <div className='nav-bubbles-container'>
        <img src={require('../../images/bubblesbackground.png')} alt='bubbles' className='nav-bubbles' />
        <img src={require('../../images/bubblesbackground.png')} alt='bubbles' className='nav-bubbles' />
      </div>
      <div className='many-wrapper'>
        <img src={require('../../images/manycute.png')} alt='lots of cute foods' className='many-for-nav' />
      </div>
      <img
        src={require('../../images/menu.png')}
        alt='sushi holding a sign that says menu'
        className='menu-icon'
        onClick={() => {
          setClicked(clicked ? false : true)
        }}
      />
      <div className={clicked ? 'nav-container show' : 'nav-container hide'}>
        {/* {clicked ? ( */}
        <>
          <Button
            value={
              <NavLink to='/user' className='nav-link'>
                Account
              </NavLink>
            }
          />
          <Button
            value={
              <NavLink to='/user/list' className='nav-link'>
                Recipes
              </NavLink>
            }
          />
          {/* {shoppingList ? ( */}
          <Button
            value={
              <NavLink to='/user/list/shopping' className='nav-link'>
                Shopping List
              </NavLink>
            }
          />
          {/* // ) : ( // '' // )} */}
          <Button
            value={
              <NavLink to='/roulette' className='nav-link'>
                Roulette
              </NavLink>
            }
          />
        </>
        {/* ) : (
          '' */}
        {/* )} */}
        {/* {clicked ? ( */}
        <>
          {loggedUser ? (
            <Button
              value={
                <NavLink to='/login' className='nav-link'>
                  Logout
                </NavLink>
              }
              onClick={handleLogout}
            />
          ) : (
            <Button
              value={
                <NavLink to='/login' className='nav-link'>
                  Login
                </NavLink>
              }
            />
          )}
        </>
        {/* ) : (
          ''
        )} */}
        <img src={require('../../images/boba.png')} alt='cute boba' className={clicked ? 'nav-boba show' : 'nav-boba hide'} />
      </div>
    </div>
  )
}
export default NavContainer
