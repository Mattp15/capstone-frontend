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
          <div className='show-recipe'>
            <div className='show-image-wrapper'>
              <h1 className='form-header shadow show-background' style={style.bigFont}>
                {recipe.title}
              </h1>
              <img src={recipe.image} alt={'Image of ' + recipe.title} className='show-image' />
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='recipe-ingredients'>
          {ingredients ? (
            <>
              <h2 className='form-header shadow showh2'>Ingredients</h2>
              <ul style={style.ingredientsList}>
                {ingredients.map((line, index) => {
                  return (
                    <li key={index} style={style.li} classname='show-li'>
                      {line}
                    </li>
                  )
                })}
              </ul>
            </>
          ) : (
            ''
          )}
          {instructions ? (
            <>
              <h2 className='form-header shadow showh2'>Instructions</h2>
              <ol className='recipe-instructions'>
                {instructions.map((instruction, index) => {
                  return <li key={index + 'instruction'}>{instruction}</li>
                })}
              </ol>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='show-bubbles-container'>
        <img src={require('../../images/bubblesbackground.png')} alt='bubbles' className='show-bubbles1' />
        <img src={require('../../images/bubblesbackground.png')} alt='bubbles' className='show-bubbles2' />
      </div>
    </div>
  )
}

export default RecipeShow
