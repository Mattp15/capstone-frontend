import React, { useState, createContext, useEffect } from 'react'
import './App.css'
import { Landing } from './Components'
import { Login, Register } from './Components/Forms/index'
import { UserInfo, ShoppingList, RecipeChoose, RecipeIndex, RecipeShow, UsersRecipeList } from './Components/UserThings/index'
import { NavContainer } from './Components/Navigation/index'
import Fetch from './Resources/Fetch'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cookies from 'js-cookie'
export const UserContext = createContext()
const App = () => {
  const [loggedUser, setLoggedUser] = useState('')
  const [usersThings, setUsersThings] = useState(null)
  const [usersList, setUsersList] = useState(null)
  const [userCookie, setUserCookie] = useState()
  const [shoppingList, setShoppingList] = useState(null)

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
    if (usersList) {
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
        for (const j of splitList) {
          for (const i of j) {
            const number = i.slice(0, i.indexOf(' '))
            const qnty = parseFloat(number)
            if (qnty) {
              const name = i.slice(i.indexOf(' '), i.lastIndexOf(' ')).trim().replaceAll('-', ' ')
              const cgy = i.slice(i.lastIndexOf(' '), i.length).trim().replaceAll('-', ' ')
              if (listObject[name]) {
                listObject[name].amount = listObject[name].amount + qnty
              } else {
                listObject[name] = { amount: qnty, category: cgy }
              }
            }
          }
        }
      }
      setShoppingList(listObject)
    }
  }, [usersList])

  const handleDeleteUserThing = ({ target }) => {
    const { id } = target
    const response = Fetch('')
  }

  return (
    <div className='App'>
      <UserContext.Provider value={{ loggedUser, setLoggedUser, usersThings, setUsersThings, userCookie, setUserCookie, usersList, setUsersList, shoppingList }}>
        <NavContainer />
        <Router>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/user' element={<UserInfo />} />
            <Route path='/list' element={<ShoppingList />} />
            <Route path='/roulette' element={<RecipeChoose />} />
            <Route path='/user/list' element={<UsersRecipeList />} />
            <Route path='/recipes/*' element={<RecipeShow />} />
            <Route path='/user/list/shopping' element={<ShoppingList />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
