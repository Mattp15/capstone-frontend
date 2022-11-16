import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button/index'
import { isValidPassword } from '../Forms/Login'
const RecipeChoose = () => {
  const [displayRecipe, setDisplayRecipe] = useState()
  const [recipeList, setRecipeList] = useState()
  const [favoriteRecipes, setFavoriteRecipes] = useState()
  const { loggedUser, usersThings, setUsersThings } = useContext(UserContext)

  useEffect(() => {
    getRecipes()
    initiate()
  }, [])
  //TODO needs a function to remove recipes from recipeList that are either
  //*user_thing dislike = true, user_thing in recipe * dislike = false, pull recipes with Favorite = true first.
  //TODO needs a way to delete recipes in user_thing that are not TRUE for either dislike or favorite

  const getRecipes = async () => {
    const response = await Fetch('recipes/', 'GET', '')
    setRecipeList(response.data)
  }
  const initiate = async () => {
    //TODO Use this as a "would you like to continue your list or start over" for initiation to populate state
    const response = await Fetch('things/', 'GET', '')
    setUsersThings(response.data)
  }
  const nextRecipe = async (name) => {
    switch (name) {
      default:
        break
      case 'Dislike':
        const dislikeResponse = await Fetch('things/' + displayRecipe.id, 'POST', { dislike: true })
        if (dislikeResponse.status === 200) {
          console.log(dislikeResponse.data, dislikeResponse.message, dislikeResponse.status, 'dislike')
        }
        break
      case 'Favorite':
        const favoriteResponse = await Fetch('things/' + displayRecipe.id, 'POST', { favorite: true })
        if (favoriteResponse.status === 200) {
          console.log(favoriteResponse.data, favoriteResponse.message, 'favorite')
        }
        break
      case 'Pass':
        const passResponse = await Fetch('things/' + displayRecipe.id, 'POST', { dislike: false })
        if (passResponse.status === 200) {
          console.log(passResponse.data, passResponse.message, 'pass')
        }

        break
      case 'Select':
        const selectResponse = await Fetch('things/' + displayRecipe.id, 'POST', { dislike: false })
        if (selectResponse.status === 200) {
          console.log(selectResponse.data, selectResponse.message, 'select')
        }
        break
      case 'Start':
        // const ffs = await initiate()
        console.log('bla')
        console.log(recipeList[0])
        if (usersThings) {
          for (const i of usersThings) {
            setRecipeList((prev) => prev, recipeList.unshift(i.recipe_id))
          }
          console.log(recipeList[0], '2nd')
        }
    }
    //If user has favorite recipes, they'll show first
    // if (favoriteRecipes) {
    //   // for (i in favoriteRecipes){
    //   //     if()
    //   // }
    //   setDisplayRecipe()
    // }
    if (recipeList) {
      //Shuffling array on python side//TODO shuffle array on python side

      setDisplayRecipe(recipeList[0])
      setRecipeList((prev) => prev, recipeList.shift())
      console.log(displayRecipe, 'displayRecipe')
    }
  }

  return (
    <div style={style.container}>
      <h1>Choose</h1>
      {displayRecipe ? (
        <ul style={style.ul}>
          <li key='fav' style={style.li}>
            {usersThings[0].title}
          </li>
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
        {!displayRecipe ? (
          <Button
            value='Initiate'
            onClick={() => {
              nextRecipe('Start')
            }}
          />
        ) : (
          ''
        )}
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
