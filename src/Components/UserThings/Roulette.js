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
    roulette-container page-fade-in'
    >
      <NavContainer />
      <h1 className='title' style={{ zIndex: '1' }}>
        <span className='title-left'>Recipe</span> <span className='title-right'>Roulette</span>
      </h1>
      {/* {!displayRecipe ? <img src={require('../../images/sushi1.png')} alt='cute sushi' width='200px' style={{ marginLeft: '90px' }} /> : ''} */}
      {displayRecipe && recipeList[0] ? <img src={require('../../images/sushi1.png')} alt='cute sushi' width='100px' style={{ position: 'absolute', top: '620px', left: '-10px', transform: 'scaleX(-1)', zIndex: '-1' }} /> : ''}
      <div className='roulette-start-container'>
        {!displayRecipe ? (
          <Button
            value={'Continue List'}
            onClick={() => {
              nextRecipe('Start')
            }}
            className='button roulette-start'
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
            className='button roulette-start'
            style={style.rouletteButton}
          />
        ) : (
          ''
        )}
      </div>

      {!displayRecipe ? (
        <div className='karage-wrapper'>
          <img src={require('../../images/karage.png')} alt='cute karage' width='200px' />{' '}
        </div>
      ) : (
        ''
      )}
      {/* {!displayRecipe ? <img src={require('../../images/pizza.png')} alt='cute pizza' width='200px' style={{ marginRight: '170px', marginTop: '-90px' }} /> : ''} */}

      {/* add keyframes to this */}
      <div className='recipe-card'>
        {displayRecipe && recipeList[0] ? (
          <ul style={style.recipeCardContent} className='recipe-card-content'>
            <div className='title-container'>
              <List pkey='0' value={recipeList[0].title} className='card-title' />
            </div>

            <li key='img' style={style.li}>
              <div style={style.imageContainer}>
                <img src={recipeList[0].image} alt={recipeList[0].title} className='roulette-img' />
              </div>
            </li>
            <li key='7' style={style.li}>
              <a className='source' href={recipeList[0].author_credit} target='_blank' rel='noreferrer noopener'>
                Source
              </a>
            </li>
            <div className='time'>
              <li key='1' style={style.li}>
                <span style={{ fontWeight: 'normal' }}>Total Time</span> <br />
                {recipeList[0].time}
              </li>
              <li key='2' style={style.li}>
                <span style={{ fontWeight: 'normal' }}>Servings </span> <br />
                {recipeList[0].servings}
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
      {/* end of keyframes */}
      {!displayRecipe ? <p className='footer-register'>The information on this website is for general informatiional purposes only. Letuce Turnip the Beet makes no representation or warranty, express or implied. Your use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for.</p> : ''}

      <div className='roulette-button-container'>
        {displayRecipe && recipeList[0] ? (
          <Button
            value='Dislike'
            onClick={() => {
              nextRecipe('Dislike')
            }}
            className='roulette-button dislike'
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
            className='roulette-button pass'
          />
        ) : (
          ''
        )}
        {displayRecipe && recipeList[0] ? (
          <Button
            value='Favorite'
            onClick={() => {
              nextRecipe('Favorite')
            }}
            className='roulette-button favorite'
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
            className='roulette-button select'
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Roulette
