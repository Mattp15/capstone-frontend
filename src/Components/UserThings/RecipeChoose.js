import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import { Button } from '../Button/index'
const RecipeChoose = () => {
  const { loggedUser, userData, setUserData } = useContext(UserContext)
  const [recipeList, setRecipeList] = useState()

  const getLoggedUser = () => {
    console.log(loggedUser)
  }
  return (
    <div>
      <h1>Choose</h1>
      {loggedUser ? <h3>{loggedUser}</h3> : ''}
      <Button value='temp' onClick={getLoggedUser} />
    </div>
  )
}

export default RecipeChoose
