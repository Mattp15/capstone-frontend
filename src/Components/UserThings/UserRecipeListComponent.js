import React, { useState, useContext, useCallback } from 'react'
import { style } from '../../Resources/Style'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button'

const UserRecipeListComponent = ({ zkey, value, style, status, onClick, ids, type }) => {
  const [clicked, setClicked] = useState(false)
  const { usersThings, setUsersThings } = useContext(UserContext)
  const handleClick = () => {
    !clicked ? setClicked(true) : setClicked(false)
  }
  const handleDelete = async ({ id }) => {
    const response = await Fetch('things/' + id, 'DELETE', '')
    setUsersThings((prev) => {
      return prev.filter((fil) => id !== fil.id)
    })
    handleClick()
  }
  useCallback(() => {
    console.log('inefffect')
  }, [usersThings])
  return (
    <div>
      <li key={zkey} style={style} onClick={handleClick}>
        {value}
      </li>
      {clicked && type === 'button' ? (
        <Button
          value={'Delete from ' + status}
          xtyle='button'
          onClick={() => {
            handleDelete(ids)
          }}
        />
      ) : (
        ''
      )}
      {/* {clicked ? <Button key={key} value='Cancel' onClick={handleClick} style={style.userButton} /> : ''} */}
    </div>
  )
}
export default UserRecipeListComponent
