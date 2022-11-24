import React, { useState, useContext, useEffect, useCallback } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button/index'
import Cookies from 'js-cookie'
import { style } from '../../Resources/Style'
import { NavContainer } from '../Navigation'
import { useNavigate } from 'react-router-dom'
import { List } from '../List'
import '../../index.css' //TODO currently only forcing favorite/dislike priority with a restart after starting a new list :(
const Roulette = () => {
  const [displayRecipe, setDisplayRecipe] = useState()
  const [recipeList, setRecipeList] = useState()

  const { usersThings, setUsersThings, usersList, setUsersList } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getRecipes()
    initiate()
  }, [])

  const initiate = async () => {}

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
        }
        const dislikeThingRecall = await Fetch('things/', 'GET')
        setUsersThings(dislikeThingRecall.data)
        setRecipeList((prev) => [prev.shift(), ...prev])

        break
      case 'Favorite':
        const favoriteResponse = await Fetch('things/' + recipeList[0].id, 'POST', { favorite: true, dislike: false })
        if (favoriteResponse.status === 200) {
          console.log(favoriteResponse.message, 'favorite')
        } else if (favoriteResponse.status === 409) {
          console.log(favoriteResponse.message)
        }
        const favoriteThingRecall = await Fetch('things/', 'GET')
        setUsersThings(favoriteThingRecall.data)
        addToList(recipeList[0])
        setRecipeList((prev) => [prev.shift(), ...prev])

        break
      case 'Select':
        const selectThingRecall = await Fetch('things/', 'GET')
        setUsersThings(selectThingRecall.data)
        addToList(recipeList[0])
        setRecipeList((prev) => [prev.shift(), ...prev])

        break
      case 'Start':
        for (const x of usersThings) {
          if (!x.favorite && !x.dislike) {
            console.log(x)
            const deletePassed = await Fetch('things/' + x.id, 'DELETE')
          }
        }
        const newListResponse2 = await Fetch('user/list', 'DELETE', { id: 0 })
        if (newListResponse2) {
          setUsersList('')
        }
        if (usersThings) {
          console.log('start')
          const favs = []
          const startThingRecall = await Fetch('things/', 'GET')
          setUsersThings(startThingRecall.data)
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
          if (usersList) {
            for (const j of usersList) {
              setRecipeList((prev) => [...prev.filter((fil) => fil.id !== j.recipe_id.id)])
            }
          }
        }

        break
      case 'Pass':
        const passResponse = await Fetch('things/' + recipeList[0].id, 'POST', { favorite: false, dislike: false })
        if (passResponse.status === 200) {
          console.log('item skipped')
          setRecipeList((prev) => [prev.shift(), ...prev])
        } else if (passResponse.status === 409) {
          setRecipeList((prev) => [prev.shift(), ...prev])
        }
        const passThingRecall = await Fetch('things/', 'GET')
        setUsersThings(passThingRecall.data)
        break

      case 'new':
        const newThingRecall = await Fetch('things/', 'GET')
        setUsersThings(newThingRecall.data)
        for (const x of usersThings) {
          if (!x.favorite && !x.dislike) {
            console.log(x)
            const deletePassed = await Fetch('things/' + x.id, 'DELETE')
          }
        }
        const newListResponse = await Fetch('user/list', 'DELETE', { id: 0 })
        if (newListResponse) {
          setUsersList('')
          nextRecipe('Start')
        }
        break
    }

    //TODO can add a put route for 409
    // setUserCookie(Cookies.get('Name'))
    // console.log(userCookie, Cookies.get('session'))
  }

  return (
    <div
      style={style.container}
      className='
    container'
    >
      <NavContainer />
      <h1 className='title'>
        <span className='title-left'>Recipe</span> <span className='title-right'>Roulette</span>
      </h1>
      <div style={style.rouletteButtonContainer}>
        {!displayRecipe ? (
          <Button
            value='Continue List'
            onClick={() => {
              nextRecipe('Start')
            }}
            classProp='button'
            style={style.rouletteButton}
          />
        ) : (
          ''
        )}
        {!displayRecipe ? (
          <Button
            value='New List'
            onClick={() => {
              nextRecipe('new')
            }}
            classProp='button'
            style={style.rouletteButton}
          />
        ) : (
          ''
        )}
      </div>
      <div className='recipe-card'>
        {displayRecipe && recipeList[0] ? (
          <ul style={style.recipeCardContent} className='recipe-card-content'>
            <List key='0' value={recipeList[0].title} className='card-title' />

            <li key='img' style={style.li}>
              <img src={recipeList[0].image} alt={recipeList[0].title} width='200' height='auto' />
            </li>
            <li key='7' style={style.li}>
              <a href={recipeList[0].author_credit} target='_blank' rel='noreferrer noopener'>
                Source
              </a>
            </li>
            <div className='time'>
              <li key='1' style={style.li}>
                Total Time: {'  ' + recipeList[0].time}
              </li>
              <li key='2' style={style.li}>
                Servings: {recipeList[0].servings}
              </li>
            </div>
            <li key='description' className='description'>
              {recipeList[0].description}
            </li>

            <ul style={style.macros} className='macros'>
              <li key='3' style={style.li}>
                Calories: {recipeList[0].calories}
              </li>
              <li key='4' style={style.li}>
                Total-Fat: {recipeList[0].fat}g
              </li>
              <li key='5' style={style.li}>
                Total-Carbs: {recipeList[0].carbs}g
              </li>
              <li key='6' style={style.li}>
                Protein: {recipeList[0].protein}g
              </li>
            </ul>
          </ul>
        ) : (
          ''
        )}
      </div>
      <div className='roulette-button-container'>
        {displayRecipe && recipeList[0] ? (
          <Button
            value='Favorite'
            onClick={() => {
              nextRecipe('Favorite')
            }}
            className='roulette-button'
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
            className='roulette-button'
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
            className='roulette-button'
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
            className='roulette-button'
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Roulette
