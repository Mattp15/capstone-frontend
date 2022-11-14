import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button/index'
const RecipeChoose = () => {
  const [recipeList, setRecipeList] = useState()
  const [displayRecipe, setDisplayRecipe] = useState()

  const { loggedUser, usersRecipes, setUsersRecipes } = useContext(UserContext)

  useEffect(() => {
    getRecipes()
  }, [])
  const getRecipes = async () => {
    const response = await Fetch('recipes/', 'GET')

    setRecipeList(response.data)
    console.log(recipeList, 'recipeList')
  }
  const nextRecipe = (e) => {
    console.log(e, 'target')

    //for dislike, it should be a post route, add the recipe to the users user_thing and truthy dislike bool
    //set up a switch state to react depending on the input (Favorite = POST route add to user_Thing and set favorite bool to true + add to usersRecipes + slice form state, , Skip = Slice from state maybe also add to User_Thing and set dislike to true?, Choose = Add to User_thing)

    const newRecipe = recipeList[Math.floor(Math.random() * recipeList.length)]
    setDisplayRecipe(newRecipe)
  }

  return (
    <div>
      <h1>Choose</h1>
      {displayRecipe ? <ul>{displayRecipe.id}</ul> : ''}
      <Button
        value='next recipe'
        name='test'
        onClick={() => {
          nextRecipe('value')
        }}
      />
    </div>
  )
}

export default RecipeChoose

const style = {
  li: {
    margin: '5px',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '20px',
  },
}
