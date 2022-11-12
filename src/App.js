import logo from './logo.svg'
import React, { useState, useContext, useEffect } from 'react'
import './App.css'
import { Landing } from './Components'
import { Login, Register } from './Components/Forms/index'
import { UserInfo, ShoppingList, RecipeChoose, RecipeIndex } from './Components/UserThings/index'
import { NavContainer } from './Components/Navigation/index'

const App = () => {
  return (
    <div className='App'>
      <NavContainer />
      <Landing />
      <Register />
      <Login />
      <UserInfo />
      <ShoppingList />
      <RecipeChoose />
      <RecipeIndex />
    </div>
  )
}

export default App
