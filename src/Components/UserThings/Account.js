import React, { useState, useContext, useEffect, useCallback } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { style } from '../../Resources/Style'
import { UserRecipeListComponent } from '.'
import { Button } from '../Button'
import { NavLink } from 'react-router-dom'
import '../../index.css'
const RecipeIndex = () => {
  const [thingsDisplay, setThingsDisplay] = useState()
  const { usersThings, setUserThings } = useContext(UserContext)
  const initiate = async () => {}
  useEffect(() => {}, [thingsDisplay])
  const handleDelete = async ({ id }) => {
    const response = await Fetch('things/' + id, 'DELETE', '')
    setThingsDisplay((prev) => {
      return prev.filter((fil) => id !== fil.id)
    })
    setUserThings((prev) => {
      return prev.filter((fil) => id !== fil.id)
    })
    console.log(thingsDisplay)
  }
  useEffect(() => {
    setThingsDisplay(usersThings)
    initiate()
  }, [usersThings, thingsDisplay])
  return (
    <div>
      {usersThings ? (
        <ul style={style.userThingsUl}>
          <h2 className='user-things-heading ' style={style.recipeIndexF}>
            Favorites
          </h2>
          {usersThings.map((x, i) => (x.favorite ? <UserRecipeListComponent type='button' key={i} zkey={x.id} style={style.li} value={x.recipe_id.title} status='Favorites' ids={x} className='user-things-recipes' /> : ''))}
          <h2 className='user-things-heading' style={style.recipeIndex}>
            Dislikes
          </h2>
          {usersThings.map((x, i) => (x.dislike ? <UserRecipeListComponent type='button' key={i} zkey={x.id} style={style.li} value={x.recipe_id.title} status='Dislikes' ids={x} className='user-things-recipes' /> : ''))}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}

export default RecipeIndex

// const list = recipeList.map((recipe) => {
//displays all recipes = maybe make a list of just titles or title + ingredients or title and image
//You'll have to add a map for ingredients after postgress deployment
//     const { author_credit, id, ingredients, instructions, protein, title, total_carbohydrate, total_fat } = recipe
//     return (
//       <ul style={style.ul}>
//         <li key={id + '_' + title} style={style.li}>
//           {title}
//         </li>
//         <li key={id + '_' + ingredients} style={style.li}>
//           Ingredients: {ingredients}
//         </li>
//         <li key={id + '_' + instructions} style={style.li}>
//           Instructions: {instructions}
//         </li>
//         {/* add calories */}
//         <li key={id + '_' + total_fat} style={style.li}>
//           Total Fat: {total_fat}
//         </li>
//         <li key={id + '_' + total_carbohydrate} style={style.li}>
//           Total Carbohydrates: {total_carbohydrate}
//         </li>
//         <li key={id + '_' + protein} style={style.li}>
//           Protein: {protein}
//         </li>
//         <li key={id + '_' + author_credit} style={style.li}>
//           Author of recipe: {author_credit}
//         </li>
//       </ul>
//     )
//   })
