import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button/index'
import { isValidPassword } from '../Forms/Login'
const RecipeChoose = () => {
  const [displayRecipe, setDisplayRecipe] = useState()
  const [recipeList, setRecipeList] = useState()
  const { loggedUser, usersRecipes, setUsersRecipes } = useContext(UserContext)

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = async () => {
    const response = await Fetch('recipes/', 'GET')
    setRecipeList(response.data)
    console.log(recipeList, 'recipeList')
  }
  const initiate = () => {
    setDisplayRecipe(recipeList[0])
    console.log(displayRecipe)
  }
  const nextRecipe = async (name) => {
    console.log(name, 'target')
    switch (name) {
      default:
        break
      case 'Dislike':
        break
      case 'Favorite':
        break
      case 'Pass':
        break
      case 'Select':
        break
    }
    //for dislike, it should be a post route, add the recipe to the users user_thing and truthy dislike bool
    //set up a switch state to react depending on the input (Favorite = POST route add to user_Thing and set favorite bool to true + add to usersRecipes + slice form state, , Skip = Slice from state maybe also add to User_Thing and set dislike to true?, Choose = Add to User_thing)
    // setRecipeList((prev) => {
    //   prev.splice(random, 1)
    // })

    //set up a display to user that the list is empty and disable the actions

    const newRecipe = await recipeList[Math.floor(Math.random() * recipeList.length)]
    setDisplayRecipe(newRecipe)
    console.log('incide', displayRecipe)

    console.log(recipeList.length, displayRecipe, 'stuff')
  }

  return (
    <div>
      <h1>Choose</h1>
      {displayRecipe ? <ul>{displayRecipe.id}</ul> : ''}
      <Button value='Start' onClick={initiate} />
      <Button
        value='Favorite'
        onClick={() => {
          nextRecipe('Favorite')
        }}
      />
      <Button
        value='Dislike'
        onClick={() => {
          nextRecipe('Dislike')
        }}
      />
      <Button
        value='Pass'
        onClick={() => {
          nextRecipe('Pass')
        }}
      />
      <Button
        value='Select'
        onClick={() => {
          nextRecipe('Select')
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
