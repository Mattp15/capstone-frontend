import React, { useState, useEffect } from 'react'
import UserContext from '../../App'
import Fetch from '../../Resources/Fetch'

const RecipeShow = () => {
  const [recipe, setRecipe] = useState()
  const [ingredients, setIngredients] = useState()
  const [instructions, setInstructions] = useState()

  //   const [usersList] = useContext(UserContext)

  const getRecipe = async () => {
    const id = window.location.href.split('/').pop()
    const response = await Fetch('/recipes/' + id, 'GET')
    setRecipe(response.data)
    setIngredients(response.data.ingredients.split(','))
    console.log(ingredients, 'ingredients')
    setInstructions(response.data.instructions.split('|'))
    console.log(instructions, 'instructions')
  }

  useEffect(() => {
    getRecipe()
  }, [])
  return (
    <div style={style.container}>
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={'Image of ' + recipe.title} />
        </>
      ) : (
        ''
      )}
      {ingredients ? (
        <ul style={style.ul}>
          {ingredients.map((line, index) => {
            return (
              <li key={index} style={style.li}>
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
  )
}

export default RecipeShow

const style = {
  buttonContainer: {},
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  li: {
    lineHeight: '2rem',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  instructions: {
    margin: '15px',
    lineHeight: '1.5rem',

    // marginRight: 'auto',
    // marginLeft: '0',
  },
  ol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '20px',
    width: '90%',
  },
}
