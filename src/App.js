import logo from './logo.svg'
import React, { useState, createContext, useEffect } from 'react'
import './App.css'
import { Landing } from './Components'
import { Login, Register } from './Components/Forms/index'
import { UserInfo, ShoppingList, RecipeChoose, RecipeIndex } from './Components/UserThings/index'
import { NavContainer } from './Components/Navigation/index'
import Fetch from './Resources/Fetch'

export const UserContext = createContext()

const App = () => {
  const [loggedUser, setLoggedUser] = useState()
  const [usersRecipes, setUsersRecipes] = useState()

  return (
    <div className='App'>
      <UserContext.Provider value={{ loggedUser, setLoggedUser, usersRecipes, setUsersRecipes }}>
        <NavContainer />
        <Landing />
        <Register />
        <Login />
        <UserInfo />
        <ShoppingList />
        <RecipeChoose />
        <RecipeIndex />
      </UserContext.Provider>
    </div>
  )
}

export default App
