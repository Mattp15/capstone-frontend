import React, { useState, createContext, useEffect } from 'react'
import './App.css'
import { Landing } from './Components'
import { Login, Register } from './Components/Forms/index'
import { UserInfo, ShoppingList, RecipeChoose, RecipeIndex, RecipeShow } from './Components/UserThings/index'
import { NavContainer } from './Components/Navigation/index'
import Fetch from './Resources/Fetch'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Cookies from 'js-cookie'

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
        <NavContainer />
        <Router>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/user' element={<UserInfo />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/list' element={<ShoppingList />} />
            <Route path='/choices' element={<RecipeChoose />} />
            <Route path='/user/list' element={<RecipeIndex />} />
            <Route path='/recipes/*' element={<RecipeShow />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
export const UserContext = createContext()
