import React, { useState } from 'react'
import Login from './Forms/Login'
import { NavLink } from 'react-router-dom'
import { style } from '../Resources/Style'
// import { Characters } from '../../public/images/characters'

const Landing = ({ item }) => {
  return (
    <div className='page-fade-in-long test'>
      <h1 className='lettuce'>Lettuce</h1>
      <h1 className='turnip'>Turnip</h1>
      <h2 className='the'>The</h2>
      <h1 className='beet'>Beet</h1>

      <img src={require('../images/Characters.png')} className='characters' alt='a lettuce, turnip and beet characters' />
      <p className='donut'>Donut you know you're special?</p>
      <p className='fresh'>It's corny but this is a-maize-ing!</p>
      <button className='landing-button button'>
        <NavLink to='/register' style={style.navLink1}>
          Butter Up!
        </NavLink>
      </button>
      <p className='landing-login'>
        Have an account?{' '}
        <span style={{ fontWeight: 'bold' }}>
          <NavLink style={style.navLink2} to='/login'>
            Login
          </NavLink>
        </span>
      </p>
      <p className='footer-register'>The information on this website is for general informational purposes only. Lettuce Turnip the Beet makes no representation or warranty, express or implied. Your use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for.</p>
    </div>
  )
}
export default Landing
