import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import { Button } from '../Button/index'
//This will be for the user to update their account information (consider added a (forgot password) feature)
const UserInfo = () => {
  const { loggedUser, setLoggedUser, userData } = useContext(UserContext)
  const handleClick = () => {
    //prolly use a Nav tag to change to a page for chnaging email/password require correct password to change password
  }
  return (
    <div>
      <h1>Account Info</h1>
      {loggedUser ? <p>{loggedUser}</p> : ''}
      <Button value='update email' onClick={handleClick} />
      <Button value='Change Password' />
    </div>
  )
}
export default UserInfo
