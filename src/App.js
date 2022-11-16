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
  const [usersThings, setUsersThings] = useState()
  //TODO fetch route to get USER_THINGS =

  useEffect(() => {
    getUsersThings()
  }, [])
  const getUsersThings = async () => {
    const response = await Fetch('things/', 'GET', '')
    setUsersThings(response.data)
  }

  const handleDeleteUserThing = ({ target }) => {
    const { id } = target
    const response = Fetch('')
  }

  return (
    <div className='App'>
      <UserContext.Provider value={{ loggedUser, setLoggedUser, usersThings, setUsersThings }}>
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
