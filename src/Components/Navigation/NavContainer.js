import React from 'react'
import { LogoutButton, UsersRecipeList } from './index'
import UserRecipeList from './UsersRecipeList'

const NavContainer = () => {
  return (
    <div>
      <LogoutButton />
      <UserRecipeList />
    </div>
  )
}
export default NavContainer
