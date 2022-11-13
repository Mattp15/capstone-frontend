import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button/index'
const RecipeChoose = () => {
  const { loggedUser, userData, setUserData } = useContext(UserContext)
  const [recipeList, setRecipeList] = useState()
  const [displayRecipes, setDisplayRecipes] = useState()

  const getLoggedUser = () => {
    console.log(loggedUser)
  }
  const getRecipes = async () => {
    const response = await Fetch('recipes/', 'GET')
    setRecipeList(response.data)
    const list = recipeList.map((recipe, index) => {
      //You'll have to add a map for ingredients after postgress deployment
      const { author_credit, id, ingredients, instructions, protein, title, total_carbohydrate, total_fat } = recipe
      return (
        <ul style={style.ul} key={id}>
          <li key={index + 0} style={style.li}>
            {title}
          </li>
          <li key={index + 1} style={style.li}>
            Ingredients: {ingredients}
          </li>
          <li key={index + 2} style={style.li}>
            Instructions: {instructions}
          </li>
          {/* add calories */}
          <li key={index + 3} style={style.li}>
            Total Fat: {total_fat}
          </li>
          <li key={index + 4} style={style.li}>
            Total Carbohydrates: {total_carbohydrate}
          </li>
          <li key={index + 5} style={style.li}>
            Protein: {protein}
          </li>
          <li key={index + 6} style={style.li}>
            Author of recipe: {author_credit}
          </li>
        </ul>
      )
    })
    setDisplayRecipes(list)

    console.log(recipeList, 'recipelist')
  }
  useEffect(() => {
    getRecipes()
  }, [loggedUser])

  return (
    <div>
      <h1>Choose</h1>
      {displayRecipes ? <ul>{displayRecipes}</ul> : ''}
      {loggedUser ? <h3>{loggedUser}</h3> : ''}
      <Button value='checkLoggedIN' onClick={getLoggedUser} />
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
