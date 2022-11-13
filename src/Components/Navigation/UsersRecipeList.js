import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import { Button } from '../Button/index'
import Fetch from '../../Resources/Fetch.js'

const UserRecipeList = () => {
  //
  const { loggedUser, usersRecipes, setUsersRecipes } = useContext(UserContext)

  const handleClick = async () => {
    const response = await Fetch('user/index/', 'GET')
    console.log(response)
    if (response.status === 200) {
      setUsersRecipes(response.data)
    }
  }
  return (
    <div>
      {usersRecipes ? (
        <ul>
          {usersRecipes.map((recipe, index) => {
            return <li key={index}>{recipe.recipe_id.title}</li>
          })}
        </ul>
      ) : (
        ''
      )}
      <Button value='Get users recipes' onClick={handleClick} />
    </div>
  )
}

export default UserRecipeList
