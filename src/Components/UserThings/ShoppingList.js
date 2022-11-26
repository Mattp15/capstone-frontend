import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { style } from '../../Resources/Style'
import { List } from '../List/index'
import { NavContainer } from '../Navigation'
import Fetch from '../../Resources/Fetch'
import '../../index.css'
const ShoppingList = () => {
  const [dairy, setDairy] = useState()
  const [dryGood, setDryGood] = useState()
  const [frozen, setFrozen] = useState()
  const [meat, setMeat] = useState()
  const [produce, setProduce] = useState()
  const [spice, setSpice] = useState()

  const { shoppingList, setShoppingList, usersThings, usersList, count, setLoggedUser, setCount } = useContext(UserContext)
  useContext(() => {
    refresh()
    console.log('yes')
  }, [count])
  const refresh = async () => {
    const response = Fetch('user/user', 'GET')
    setLoggedUser(response)
  }

  useEffect(() => {
    if (shoppingList) {
      const dairyArray = []
      const dryGoodArray = []
      const frozenArray = []
      const meatArray = []
      const produceArray = []
      const spiceArray = []
      for (const i in shoppingList) {
        if (shoppingList.hasOwnProperty(i)) {
          switch (shoppingList[i].category) {
            default:
              break
            case 'dairy':
              dairyArray.push({ [i]: shoppingList[i] })
              break
            case 'dry good':
              dryGoodArray.push({ [i]: shoppingList[i] })
              break
            case 'frozen':
              frozenArray.push({ [i]: shoppingList[i] })
              break
            case 'meat':
              meatArray.push({ [i]: shoppingList[i] })
              break
            case 'produce':
              produceArray.push({ [i]: shoppingList[i] })
              break
            case 'spice':
              spiceArray.push({ [i]: shoppingList[i] })
              break
          }
        }
      }
      const clean = (arr) => {
        const tempList = []
        for (const i in arr) {
          tempList.push(Object.entries(arr[i]))
        }
        return tempList
      }

      setDairy(clean(dairyArray))
      setDryGood(clean(dryGoodArray))
      setFrozen(clean(frozenArray))
      setMeat(clean(meatArray))
      setProduce(clean(produceArray))
      setSpice(clean(spiceArray))
    }
  }, [shoppingList])

  return (
    <div style={style.container} className='page-fade-in center'>
      <NavContainer />
      <div className='shopping-image-container'>
        <img src={require('../../images/bubblesbackground.png')} alt='bubbles' className='bubbles' />
        <img src={require('../../images/bubblesbackground.png')} alt='bubbles' className='bubbles2' />
        <img src={require('../../images/bubblesbackground.png')} alt='bubbles' className='bubbles3' />
      </div>

      <h1 className='form-header'>Users recipes List</h1>
      {dairy ? (
        <div style={style.container}>
          <h2 className='form-header'>Dairy</h2>
          <ul style={style.ul}>
            {dairy.map((x, i) => {
              return <List pkey={'dairy' + i} value={Math.ceil(x[0][1].amount) + '- ' + x[0][0]} type='strikeThrough' />
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {dryGood ? (
        <div style={style.container}>
          <h2 className='form-header list-header'>Dry Goods</h2>
          <ul style={style.ul}>
            {dryGood.map((x, i) => {
              return (
                <div>
                  <List pkey={'dryGoods' + i} value={Math.ceil(x[0][1].amount) + '- ' + x[0][0]} type='strikeThrough' />
                </div>
              )
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {frozen ? (
        <div style={style.container}>
          <h2 className='form-header'>Frozen</h2>
          <ul style={style.ul}>
            {frozen.map((x, i) => {
              return <List pkey={'frozen' + i} value={Math.ceil(x[0][1].amount) + '- ' + x[0][0]} />
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {meat ? (
        <div style={style.container}>
          <h2 className='form-header'>Meat</h2>
          <ul style={style.ul}>
            {meat.map((x, i) => {
              return <List pkey={'meat' + i} value={Math.ceil(x[0][1].amount) + '- ' + x[0][0]} type='strikeThrough' />
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {produce ? (
        <div style={style.container}>
          <h2 className='form-header'>Produce</h2>
          <ul style={style.ul}>
            {produce.map((x, i) => {
              return <List pkey={+i} value={Math.ceil(x[0][1].amount) + '- ' + x[0][0]} type='strikeThrough' />
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {spice ? (
        <div style={style.container}>
          <h2 className='form-header'>Spices</h2>
          <ul style={style.ul}>
            {spice.map((x, i) => {
              return <List pkey={'spices' + i} value={Math.ceil(x[0][1].amount) + '- ' + x[0][0]} type='strikeThrough' />
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default ShoppingList
