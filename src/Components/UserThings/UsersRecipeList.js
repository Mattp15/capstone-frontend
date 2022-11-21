import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import { Button } from '../Button/index'
import Fetch from '../../Resources/Fetch.js'
import { style } from '../../Resources/Style'
import { NavContainer } from '../Navigation'

const UsersRecipeList = () => {
  //Getting User index next to do figure out to organize it for the view
  const { loggedUser, usersRecipes, setUsersRecipes, usersList, setUsersList } = useContext(UserContext)
  //! do i need loggedUser??
  //TODO needs a way to delete recipes in user_thing that are not TRUE for either dislike or favorite
  //TODO Needs a way for user to delete lists from their favorites//chosen//disliked
  //*Consider allowing users to switch chosen recipes to dislike or favorite in this list

  //   const handleClick = async () => {
  //     const response2 = await Fetch('user/list', 'GET')
  //     if (response2.status === 200) {
  //       console.log(response2.message)
  //       setUsersList(response2.data)
  //     } else {
  //       console.log('did not fetch users list')
  //     }
  //   }

  const handleClick = (id) => {
    window.location.href = 'http://localhost:3000/recipes/' + id
  }
  return (
    <div style={style.container}>
      <NavContainer />
      <h1>Users recipes List</h1>
      {usersList ? (
        <ul style={style.ul}>
          {usersList.map((recipe, index) => {
            return (
              <li
                key={index}
                style={style.li}
                onClick={() => {
                  handleClick(recipe.id)
                }}
              >
                {recipe.recipe_id.title}
              </li>
            )
          })}
        </ul>
      ) : (
        ''
      )}
      {/* <Button value='Get users recipes' onClick={handleClick} /> */}
    </div>
  )
}

export default UsersRecipeList
