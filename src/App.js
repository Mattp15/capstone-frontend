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
  const [shoppingList, setShoppingList] = useState()

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
  useEffect(() => {
    const listObject = {}
    const sList = usersList
      ? usersList.map((x) => {
          return x.recipe_id.shopping_list
        })
      : null
    const splitList = []
    if (sList) {
      for (const i of sList) {
        i.split(',')
        splitList.push(i.split(','))
      }
      console.log(splitList[0])
      //Needs to be iterate over whole splitList
      //for (const j of splitList){
      // for (const i of j){

      // }
      //}
      for (const i of splitList[0]) {
        const amount = parseInt(i.slice(0, i.indexOf(' ')))
        if (amount) {
          const name = i.slice(i.indexOf(' '), i.length).trim()
          console.log(name)
          listObject[name] = (listObject[name] + amount) | amount
        } else {
          listObject[i] = listObject[i] | 1
        }
      }
    }
    console.log(listObject)
    // if (sList) setShoppingList(listObject)
    // if (sList) console.log(sList, 'slist')
  }, [usersList])

  const handleDeleteUserThing = ({ target }) => {
    const { id } = target
    const response = Fetch('')
  }

  return (
    <div className='App'>
      {shoppingList ? <p>{shoppingList}</p> : ''}
      <UserContext.Provider value={{ loggedUser, setLoggedUser, usersThings, setUsersThings, userCookie, setUserCookie, usersList, setUsersList, shoppingList }}>
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

//!Work on finguring out how to populate the shoping list
