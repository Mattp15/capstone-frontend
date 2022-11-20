import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import Fetch from '../../Resources/Fetch'
import { style } from '../../Resources/Style'

const ShoppingList = () => {
  const { shoppingList, setShoppingList } = useContext(UserContext)
  useEffect(() => {
    console.log(shoppingList)
  }, [shoppingList])
}

export default ShoppingList
