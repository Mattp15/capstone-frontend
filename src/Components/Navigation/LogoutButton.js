import React from 'react'
import Fetch from '../../Resources/Fetch'
import { Button } from '../Button/index'

const LogoutButton = () => {
  const handleClick = async () => {
    const response = await Fetch('user/logout', 'GET')
    if (response.status === 200) {
      //redirect to landing page
      console.log(response)
    }
  }
  return <Button value="I'm a logout Button" onClick={handleClick} />
}
export default LogoutButton
