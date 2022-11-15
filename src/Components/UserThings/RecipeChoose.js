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
    const response = await Fetch('recipes/', 'GET', '')
    setRecipeList(response.data)
    console.log(recipeList, 'recipeList')
  }
  const initiate = async () => {
    setDisplayRecipe(recipeList[Math.floor(Math.random() * recipeList.length)])
    console.log(displayRecipe)
  }
  const nextRecipe = async (name) => {
    const userThings = {
      dislike: false,
      favorite: false,
      recipe_id: displayRecipe.id,
    }
    console.log(name, 'target')
    switch (name) {
      //fetch calls MUST have dislike or favorite
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
    //for dislike, it should be a post route, add the recipe to the users user_thing and truthy dislike bool
    //set up a switch state to react depending on the input (Favorite = POST route add to user_Thing and set favorite bool to true + add to usersRecipes + slice form state, , Skip = Slice from state maybe also add to User_Thing and set dislike to true?, Choose = Add to User_thing)
    // setRecipeList((prev) => {
    //   prev.splice(random, 1)
    // })

    //set up a display to user that the list is empty and disable the actions

    const newRecipe = await recipeList[Math.floor(Math.random() * recipeList.length)]
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
