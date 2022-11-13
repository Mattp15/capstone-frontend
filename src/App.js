import logo from './logo.svg'
import React, { useState, useContext, useEffect, createContext } from 'react'
import './App.css'
import { Landing } from './Components'
import { Login, Register } from './Components/Forms/index'
import { UserInfo, ShoppingList, RecipeChoose, RecipeIndex } from './Components/UserThings/index'
import { NavContainer } from './Components/Navigation/index'

export const UserContext = createContext()

const App = () => {
  const [loggedUser, setLoggedUser] = useState()
  const [userData, setUserData] = useState()
  useEffect(() => {
    console.log(loggedUser, 'inapp')
  }, [loggedUser])
  return (
    <div className='App'>
      <NavContainer />
      <Landing />
      <UserContext.Provider value={{ userData, setUserData, loggedUser, setLoggedUser }}>
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
