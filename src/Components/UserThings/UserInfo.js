import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import { Button } from '../Button/index'
//This will be for the user to update their account information (consider added a (forgot password) feature)
const UserInfo = () => {
  const { loggedUser, setLoggedUser, userData } = useContext(UserContext)
  const [thingsDisplay, setThingsDisplay] = useState()
  const [singleThing, setSingleThing] = useState()
  const { usersThings } = useContext(UserContext)
  const handleClick = () => {
    //prolly use a Nav tag to change to a page for chnaging email/password require correct password to change password
  }

  return (
    <div>
      <h1>Account Info</h1>
      {loggedUser ? <p>{loggedUser}</p> : ''}
      <Button value='update email' onClick={handleClick} />
      <Button value='Change Password' />
      {usersThings ? (
        <ul>
          {usersThings.map((x) => {
            return <li key={x.id}>{x.recipe_id.title}</li>
          })}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}
export default UserInfo
