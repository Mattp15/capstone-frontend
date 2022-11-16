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
    const response = await Fetch('recipes/', 'GET')
    setRecipeList(response.data)
  }
  const initiate = async () => {
    //Empty function to initiate a refresh
  }
  const nextRecipe = async (name) => {
    console.log(usersThings)
    switch (name) {
      default:
        break
      case 'Dislike':
        const dislikeResponse = await Fetch('things/' + displayRecipe.id, 'POST', { dislike: true, favorite: false })
        if (dislikeResponse.status === 200) {
          console.log(dislikeResponse.message, dislikeResponse.status, 'dislike')
        }
        break
      case 'Favorite':
        const favoriteResponse = await Fetch('things/' + displayRecipe.id, 'POST', { favorite: true, dislike: false })
        if (favoriteResponse.status === 200) {
          console.log(favoriteResponse.message, 'favorite')
        } else if (favoriteResponse.status === 409) {
          console.log(favoriteResponse.message)
        }
        break
      case 'Pass':
        const passResponse = await Fetch('things/' + displayRecipe.id, 'POST', { dislike: false, favorite: false })
        if (passResponse.status === 200) {
          console.log(passResponse.message, 'pass')
        }

        break
      case 'Select':
        const selectResponse = await Fetch('things/' + displayRecipe.id, 'POST', { dislike: false, favorite: false })
        if (selectResponse.status === 200) {
          console.log(selectResponse.message, 'select')
        }
        break
      case 'Start':
        // const ffs = await initiate()
        if (usersThings) {
          //TODO get filter to work
          const filteredList = []
          //! Also doesn't work
          //   const filteredList = recipeList.map((x) => {
          //     console.log(x.id)
          //     return usersThings.filter((j) => j.recipe_id.id !== x.id)
          //   })
          //! SOmethings wrong with this
          //   for (const i of recipeList) {
          //     for (const j of usersThings) {
          //       if (i.id !== j.recipe_id.id) {
          //         //This doesn't work
          //         filteredList.push(i)
          //         console.log(i.id, j.recipe_id.id)
          //       }
          //     }
          //   }

          //   setRecipeList(filteredList)
          if (usersThings) {
            for (const i of usersThings) {
              if (i.favorite) {
                console.log(i.favorite)
                setRecipeList((prev) => [recipeList.unshift(i.recipe_id), ...prev])
              }
            }
          }
        }
        break
    }

    console.log(recipeList, 'list filtered and favorites added')

    if (recipeList) {
      //Shuffling array on python side//TODO shuffle array on python side
      //TODO this below doesn't work, figure out a way to filter matching id with favorite recipe to take them out of recipe list, before unshifting
      //   if (!recipeList[0].user_id) {
      //     console.log('out of user_id')
      //   }
      setDisplayRecipe(recipeList[0])
      setRecipeList((prev) => prev, recipeList.shift())
    }
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
