import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button/index'
import Cookies from 'js-cookie'
import { NavLink } from 'react-router-dom'

const RecipeChoose = () => {
  const [displayRecipe, setDisplayRecipe] = useState()
  const [recipeList, setRecipeList] = useState()
  const { usersThings, userCookie, setUserCookie, usersList } = useContext(UserContext)
  useEffect(() => {
    getRecipes()
    initiate()
    setTimeout(() => {
      return
    }, 40)
  }, [])
  //TODO needs a function to remove recipes from recipeList that are either
  //*user_thing dislike = true, user_thing in recipe * dislike = false, pull recipes with Favorite = true first.
  //TODO needs a way to delete recipes in user_thing that are not TRUE for either dislike or favorite

  const getRecipes = async () => {
    const response = await Fetch('recipes/', 'GET')
    setRecipeList(response.data)
  }
  const initiate = async () => {}
  const nextRecipe = async (name) => {
    switch (name) {
      default:
        break
      case 'Dislike':
        const dislikeResponse = await Fetch('things/' + recipeList[0].id, 'POST', { dislike: true, favorite: false })
        if (dislikeResponse.status === 200) {
          console.log(dislikeResponse.message, recipeList[0].status, 'dislike')
        }
        setRecipeList((prev) => [prev.shift(), ...prev])

        break
      case 'Favorite':
        const favoriteResponse = await Fetch('things/' + recipeList[0].id, 'POST', { favorite: true, dislike: false })
        if (favoriteResponse.status === 200) {
          console.log(favoriteResponse.message, 'favorite')
        } else if (favoriteResponse.status === 409) {
          console.log(favoriteResponse.message)
        }
        addToList(recipeList[0])
        setRecipeList((prev) => [prev.shift(), ...prev])

        break
      case 'Select':
        addToList(recipeList[0])
        setRecipeList((prev) => [prev.shift(), ...prev])

        break
      case 'Start':
        if (usersThings) {
          const favs = []
          for (const i of usersThings) {
            if (i.favorite) {
              setRecipeList((prev) => {
                return [...prev.filter((fil) => fil.id !== i.recipe_id.id)]
              })
              console.log(i.favorite)
              favs.push(i.recipe_id)
            } else {
              setRecipeList((prev) => {
                return [...prev.filter((fil) => fil.id !== i.recipe_id.id)]
              })
            }
          }

          setDisplayRecipe(true)
          setRecipeList((prev) => [...favs, ...prev])
          for (const j of usersList) {
            setRecipeList((prev) => {
              return [...prev.filter((fil) => fil.id !== j.recipe_id.id)]
            })
          }
        }
        break
      case 'Pass':
        const passResponse = await Fetch('things/' + recipeList[0].id, 'POST', { favorite: false, dislike: false })
        if (passResponse.status === 200) {
          console.log('item skipped')
        } else if (passResponse.status === 409) {
          console.log(passResponse.message)
        }
        setRecipeList((prev) => [prev.shift(), ...prev])

        break
    }
    console.log(recipeList[0])
    console.log(displayRecipe)
    setUserCookie(Cookies.get('Name'))
    // console.log(userCookie, Cookies.get('session'))
  }
  const addToList = ({ id }) => {
    console.log(id)
    const response = Fetch('user/list', 'POST', { id: id })
    console.log(response.message)
  }
  return (
    <div style={style.container}>
      <h1>Choose</h1>
      <Button
        value='Swing'
        onClick={() => {
          nextRecipe()
        }}
      />
      {displayRecipe && recipeList[0] ? (
        <ul style={style.ul}>
          <li key='0' style={style.li}>
            {recipeList[0].title}
          </li>
          <li key='img' style={style.li}>
            <img src={recipeList[0].image} alt={recipeList[0].title} width='200' height='200' />
          </li>
          <li key='7' style={style.li}>
            <a href={recipeList[0].author_credit}>Source</a>
          </li>
          <li key='1' style={style.li}>
            Total Time: {recipeList[0].time}
          </li>
          <li key='2' style={style.li}>
            Servings: {recipeList[0].servings}
          </li>
          <li key='description'>{recipeList[0].description}</li>
          <li key='3' style={style.li}>
            Calories: {recipeList[0].calories}
          </li>
          <li key='4' style={style.li}>
            Total-Fat: {recipeList[0].fat}
          </li>
          <li key='5' style={style.li}>
            Total-Carbs: {recipeList[0].carbs}
          </li>
          <li key='6' style={style.li}>
            Protein: {recipeList[0].protein}
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
    // marginRight: 'auto',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    margin: '20px',
    width: '50%',
  },
}
