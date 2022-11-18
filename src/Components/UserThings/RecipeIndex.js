import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
const RecipeIndex = () => {
  const [thingsDisplay, setThingsDisplay] = useState()
  const { usersThings } = useContext(UserContext)
  //! This will be where user can view their selected recipes for the current working list including distinct areas off sections for Favorited and disliked
  //* like a selectable that takes to a "favorites" and "disliked" edit page
  //TODO When a user deletes an item, the "DELTED" confirmation text can replace the item at location, with a setTimeout to be removed => fade out. Lower items should push up at this point
  const handleDelete = async ({ id }) => {
    const response = await Fetch('things/' + id, 'DELETE', '')
    setThingsDisplay((prev) => {
      return prev.filter((fil) => id !== fil.id)
    })
    console.log(thingsDisplay)
  }
  useEffect(() => {
    setThingsDisplay(usersThings)
  }, [usersThings])
  return (
    // {userThings ? " " : " "}
    <div style={style.container}>
      {thingsDisplay ? (
        <ul style={style.ul}>
          {thingsDisplay.map((x, i) => {
            return (
              <li
                style={style.li}
                key={i}
                onClick={() => {
                  handleDelete(x)
                }}
              >
                {x.recipe_id.title}
              </li>
            )
          })}
        </ul>
      ) : (
        ''
      )}
      {/* {thingsDisplay ? (
        <div>
          <p onClick={() => handleDelete(thingsDisplay[0])}>{thingsDisplay[0].id}</p>
          <p> {thingsDisplay[0].recipe_id.title}</p>{' '}
        </div>
      ) : (
        ''
      )} */}
    </div>
  )
}

export default RecipeIndex

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
