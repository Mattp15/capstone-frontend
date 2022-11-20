import React from 'react'
import { LogoutButton, UsersRecipeList } from './index'
import UserRecipeList from './UsersRecipeList'

const NavContainer = () => {
  return (
    <div>
      <h1>Nav Container</h1>
      <LogoutButton />
      <UserRecipeList />
    </div>
  )
}
export default NavContainer
