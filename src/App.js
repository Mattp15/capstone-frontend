import logo from './logo.svg'
import React, { useState, createContext, useEffect } from 'react'
import './App.css'
import { Landing } from './Components'
import { Login, Register } from './Components/Forms/index'
import { UserInfo, ShoppingList, RecipeChoose, RecipeIndex } from './Components/UserThings/index'
import { NavContainer } from './Components/Navigation/index'
import Fetch from './Resources/Fetch'
import Cookies from 'js-cookie'
export const UserContext = createContext()

const App = () => {
  const [loggedUser, setLoggedUser] = useState()
  const [usersThings, setUsersThings] = useState()
  const [usersList, setUsersList] = useState()
  const [userCookie, setUserCookie] = useState()

  useEffect(() => {
    getUsersThings()
    getUsersList()
    // setUserCookie(Cookies.get(loggedUser))
  }, [])
  const getUsersThings = async () => {
    const response = await Fetch('things/', 'GET', '')
    setUsersThings(response.data)
  }
  const getUsersList = async () => {
    const response2 = await Fetch('user/list', 'GET')
    if (response2.status === 200) {
      console.log(response2.message)
      setUsersList(response2.data)
    } else {
      console.log('did not fetch users list')
    }
  }

  const handleDeleteUserThing = ({ target }) => {
    const { id } = target
    const response = Fetch('')
  }

  return (
    <div className='App'>
      <UserContext.Provider value={{ loggedUser, setLoggedUser, usersThings, setUsersThings, userCookie, setUserCookie, usersList, setUsersList }}>
        <UserInfo />
        <NavContainer />
        <Landing />
        <Register />
        <Login />
        <ShoppingList />
        <RecipeChoose />
        <RecipeIndex />
      </UserContext.Provider>
    </div>
  )
}

export default App
