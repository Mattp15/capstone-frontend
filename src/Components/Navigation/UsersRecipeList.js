import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import { Button } from '../Button/index'
import Fetch from '../../Resources/Fetch.js'

const UserRecipeList = () => {
  //Getting User index next to do figure out to organize it for the view
  const { loggedUser, usersRecipes, setUsersRecipes } = useContext(UserContext)
  //TODO needs a way to delete recipes in user_thing that are not TRUE for either dislike or favorite
  //TODO Needs a way for user to delete lists from their favorites//chosen//disliked
  //*Consider allowing users to switch chosen recipes to dislike or favorite in this list

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
