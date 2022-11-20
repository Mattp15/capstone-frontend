import React, { useContext } from 'react'
import { Button } from '../Button/index'
import { LogoutButton, UsersRecipeList } from './index'
import UserRecipeList from '../UserThings/UsersRecipeList'
import { UserContext } from '../../App'
import { style } from '../../Resources/Style'

const NavContainer = () => {
  const { loggedUser } = useContext(UserContext)
  return (
    <div>
      <h1>Nav Container</h1>
      {loggedUser ? <LogoutButton /> : ''}
      <Button />
    </div>
  )
}
export default NavContainer
