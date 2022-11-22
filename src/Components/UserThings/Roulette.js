import React, { useState, useContext, useEffect, useCallback } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button/index'
import Cookies from 'js-cookie'
import { style } from '../../Resources/Style'
import { NavContainer } from '../Navigation'
import { useNavigate } from 'react-router-dom'

const Roulette = () => {
  const [displayRecipe, setDisplayRecipe] = useState()
  const [recipeList, setRecipeList] = useState()
  const { usersThings, setUsersThings, usersList, setUsersList } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getRecipes()
    initiate()
  }, [])
  useCallback(() => {
    // getUsersList()
  }, [usersList])

  const initiate = async () => {}
  const getUsersList = async () => {
    const gettingUsersList = await Fetch('user/list', 'GET')
    console.log(gettingUsersList)
    setUsersList(gettingUsersList.data)
  }
  const getRecipes = async () => {
    const response = await Fetch('recipes/', 'GET')
    setRecipeList(response.data)
  }
  const addToList = ({ id }) => {
    const response = Fetch('user/list', 'POST', { id: id })
  }
  const nextRecipe = async (name) => {
    if (!recipeList[1]) {
      navigate('/user/list')
    }
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

              favs.push(i.recipe_id)
            } else {
              setRecipeList((prev) => [...prev.filter((fil) => fil.id !== i.recipe_id.id)])
            }
          }

          setDisplayRecipe(true)
          setRecipeList((prev) => [...favs, ...prev])
          for (const j of usersList) {
            setRecipeList((prev) => [...prev.filter((fil) => fil.id !== j.recipe_id.id)])
          }
        }

        break
      case 'Pass':
        const passResponse = await Fetch('things/' + recipeList[0].id, 'POST', { favorite: false, dislike: false })
        if (passResponse.status === 200) {
          console.log('item skipped')
          setRecipeList((prev) => [prev.shift(), ...prev])
        } else if (passResponse.status === 409) {
          console.log(passResponse.message)
        }

        break
      case 'new':
        for (const x of usersThings) {
          if (!x.favorite && !x.dislike) {
            console.log(x)
            const deletePassed = await Fetch('things/' + x.id, 'DELETE')
            console.log(deletePassed)
          }
        }
        const newListResponse = await Fetch('user/list', 'DELETE', { id: 0 })
        console.log(newListResponse)
        if (newListResponse) {
          setUsersList(null)
          nextRecipe('Start')
        }

        break
    }
    console.log(usersList)
    // setUserCookie(Cookies.get('Name'))
    // console.log(userCookie, Cookies.get('session'))
  }

  return (
    <div style={style.container}>
      <NavContainer />
      <h1>Choose</h1>
      {!displayRecipe ? (
        <Button
          value='Continue?'
          onClick={() => {
            nextRecipe('Start')
          }}
        />
      ) : (
        ''
      )}
      {usersList && !displayRecipe ? (
        <Button
          value='New List?'
          onClick={() => {
            nextRecipe('new')
          }}
        />
      ) : (
        ''
      )}
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
        {displayRecipe && recipeList[0] ? (
          <Button
            value='Favorite'
            onClick={() => {
              nextRecipe('Favorite')
            }}
          />
        ) : (
          ''
        )}
        {displayRecipe && recipeList[0] ? (
          <Button
            value='Dislike'
            onClick={() => {
              nextRecipe('Dislike')
            }}
          />
        ) : (
          ''
        )}
        {displayRecipe && recipeList[0] ? (
          <Button
            value='Pass'
            onClick={() => {
              nextRecipe('Pass')
            }}
          />
        ) : (
          ''
        )}
        {displayRecipe && recipeList[0] ? (
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

export default Roulette
