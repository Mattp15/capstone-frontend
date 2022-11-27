import React, { useState, useEffect } from 'react'
import UserContext from '../../App'
import Fetch from '../../Resources/Fetch'
import { style } from '../../Resources/Style'
import { NavContainer } from '../Navigation'
import '../../index.css'
const RecipeShow = () => {
  const [recipe, setRecipe] = useState()
  const [ingredients, setIngredients] = useState()
  const [instructions, setInstructions] = useState()

  //   const [usersList] = useContext(UserContext)

  const getRecipe = async () => {
    const id = window.location.href.split('/').pop()
    const response = await Fetch('recipes/' + id, 'GET')
    setRecipe(response.data)
    setIngredients(response.data.ingredients.split(','))
    setInstructions(response.data.instructions.split('|'))
  }

  useEffect(() => {
    getRecipe()
  }, [])
  return (
    <div>
      <NavContainer />
      <div style={style.container}>
        {recipe ? (
          <>
            <h1 className='form-header shadow'>{recipe.title}</h1>
            <div className='here' style={{ width: '325px', height: '243px', overflow: 'hidden' }}>
              <img src={recipe.image} alt={'Image of ' + recipe.title} className='roulette-img' />
            </div>
          </>
        ) : (
          ''
        )}
        <div style={{ width: '390px', display: 'flex', alignItems: 'center', flexFlow: 'column nowrap' }}>
          {ingredients ? (
            <ul clasName='show-ing'>
              {ingredients.map((line, index) => {
                return (
                  <li key={index} style={style.li} classname='show-li'>
                    {line}
                  </li>
                )
              })}
            </ul>
          ) : (
            ''
          )}
          {instructions ? (
            <ol style={style.ol}>
              {instructions.map((instruction, index) => {
                return (
                  <li key={index + 'instruction'} style={style.instructions}>
                    {instruction}
                  </li>
                )
              })}
            </ol>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeShow
