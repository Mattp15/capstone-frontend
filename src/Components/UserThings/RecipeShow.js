import React, { useState, useEffect } from 'react'
import UserContext from '../../App'
import Fetch from '../../Resources/Fetch'
import { style } from '../../Resources/Style'
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
    <div style={style.container}>
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={'Image of ' + recipe.title} style={style.img} />
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

//TODO Probably make this in context

// const style = {
//   buttonContainer: {},
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//     flexDirection: 'column',
//   },
//   img: {
//     width: '100%',
//     height: 'auto',
//   },
//   instructions: {
//     margin: '15px',
//     lineHeight: '1.45rem',
//   },
//   li: {
//     lineHeight: '2rem',
//   },
//   ol: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     marginRight: '10%',
//     width: '98%',
//   },
//   ul: {
//     listStyleType: 'none',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//   },
// }
