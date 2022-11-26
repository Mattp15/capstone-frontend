import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import { Button } from '../Button/index'
import Fetch from '../../Resources/Fetch.js'
import { style } from '../../Resources/Style'
import { NavContainer } from '../Navigation'
import { NavLink } from 'react-router-dom'
import '../../index.css'
import { List } from '../List'
const UsersRecipeList = () => {
  //Getting User index next to do figure out to organize it for the view
  const { usersList, setUsersList } = useContext(UserContext)
  //! do i need loggedUser??
  //TODO needs a way to delete recipes in user_thing that are not TRUE for either dislike or favorite
  //TODO Needs a way for user to delete lists from their favorites//chosen//disliked
  //*Consider allowing users to switch chosen recipes to dislike or favorite in this list
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const response = await Fetch('user/list', 'GET')
    if (response.status === 200) {
      setUsersList(response.data)
    } else {
      console.log('did not fetch users list')
    }
  }
  const handleDelete = async ({ id }) => {
    const deleted = await Fetch('user/list', 'DELETE', { id: id })
    setUsersList((prev) => [...prev.filter((fil) => fil.id !== id)])
  }

  return (
    <div style={style.container} className='page-fade-in'>
      <NavContainer />
      <img src={require('../../images/boba.png')} alt='cute boba' className='boba' />
      <h1 className='form-header'>Users recipes List</h1>
      {usersList ? (
        <ul>
          {usersList.map((recipe, index) => {
            return (
              <div style={style.recipeListDiv} className='recipe-list'>
                <NavLink to={'/recipes/' + recipe.id}>
                  <List pkey={index} value={recipe.recipe_id.title} type='reg' className='recipe-list' />
                </NavLink>
                <img src={require('../../images/nosymbol.png')} alt='no symbol with fried chicken inside' key={`${index}button`} onClick={() => handleDelete(recipe)} style={{ width: '80px', height: '80px', marginTop: '10px' }} />
              </div>
            )
          })}
        </ul>
      ) : (
        ''
      )}
      <img src={require('../../images/milkshake.png')} alt='cute milkshake' className='milkshake' />
    </div>
  )
}

export default UsersRecipeList
