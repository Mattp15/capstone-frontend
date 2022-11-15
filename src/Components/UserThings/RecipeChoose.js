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
  //TODO needs a function to remove recipes from recipeList that are either
  //*user_thing dislike = true, user_thing in recipe * dislike = false, pull recipes with Favorite = true first.
  //TODO needs a way to delete recipes in user_thing that are not TRUE for either dislike or favorite

  const getRecipes = async () => {
    const response = await Fetch('recipes/', 'GET', '')
    setRecipeList(response.data)
    console.log(recipeList, 'recipeList')
  }
  const initiate = async () => {
    setDisplayRecipe(recipeList[Math.floor(Math.random() * recipeList.length)])
    console.log(displayRecipe)
  }
  const nextRecipe = async (name) => {
    switch (name) {
      default:
        break
      case 'Dislike':
        const dislikeResponse = await Fetch('user/index/' + displayRecipe.id, 'POST', { dislike: true })
        if (dislikeResponse.status === 200) {
          console.log(dislikeResponse.data, 'data')
        }
        break
      case 'Favorite':
        const favoriteResponse = await Fetch('user/index/' + displayRecipe.id, 'POST', { favorite: true })
        if (favoriteResponse.status === 200) {
          console.log(favoriteResponse.data, 'data')
        }
        break
      case 'Pass':
        const passResponse = await Fetch('user/index/' + displayRecipe.id, 'POST', { dislike: false })
        if (passResponse.status === 200) {
          console.log(passResponse.data, 'data')
        }
        break
      case 'Select':
        const selectResponse = await Fetch('user/index/' + displayRecipe.id, 'POST', { dislike: false })
        if (selectResponse.status === 200) {
          console.log(selectResponse.data, 'data')
        }
        break
    }
    setDisplayRecipe(recipeList[Math.floor(Math.random() * recipeList.length)])
  }

  return (
    <div style={style.container}>
      <h1>Choose</h1>
      {displayRecipe ? (
        <ul style={style.ul}>
          <li key='0' style={style.li}>
            {displayRecipe.title}
          </li>
          <li key='img' style={style.li}>
            {displayRecipe.image}
          </li>
          <li key='1' style={style.li}>
            {displayRecipe.ingredients}
          </li>
          <li key='2' style={style.li}>
            {displayRecipe.calories}
          </li>
          <li key='3' style={style.li}>
            {displayRecipe.fat}
          </li>
          <li key='4' style={style.li}>
            {displayRecipe.carbohydrate}
          </li>
          <li key='5' style={style.li}>
            {displayRecipe.protein}
          </li>
          <li key='6' style={style.li}>
            {displayRecipe.author_credit}
          </li>
        </ul>
      ) : (
        ''
      )}
      <div style={style.buttonContainer}>
        {!displayRecipe ? <Button value='Start' onClick={initiate} /> : ''}
        {displayRecipe ? (
          <Button
            value='Favorite'
            onClick={() => {
              nextRecipe('Favorite')
            }}
          />
        ) : (
          ''
        )}
        {displayRecipe ? (
          <Button
            value='Dislike'
            onClick={() => {
              nextRecipe('Dislike')
            }}
          />
        ) : (
          ''
        )}
        {displayRecipe ? (
          <Button
            value='Pass'
            onClick={() => {
              nextRecipe('Pass')
            }}
          />
        ) : (
          ''
        )}
        {displayRecipe ? (
          <Button
            value='Select'
            onClick={() => {
              nextRecipe('Select')
            }}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default RecipeChoose

const style = {
  buttonContainer: {},
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  li: {
    margin: '5px',
    marginRight: 'auto',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    margin: '20px',
  },
}
