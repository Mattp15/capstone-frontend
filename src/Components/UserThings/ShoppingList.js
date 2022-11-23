import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { style } from '../../Resources/Style'
import { List } from '../List/index'
import { NavContainer } from '../Navigation'
import Fetch from '../../Resources/Fetch'

const ShoppingList = () => {
  const [dairy, setDairy] = useState()
  const [dryGood, setDryGood] = useState()
  const [frozen, setFrozen] = useState()
  const [meat, setMeat] = useState()
  const [produce, setProduce] = useState()
  const [spice, setSpice] = useState()
  const [lineStyle, setLineStyle] = useState('li')
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
    // console.log(dairy[0][0][0], dairy[0][0][1].amount)
    // console.log(dryGood)
    // console.log(frozen)
    // console.log(meat)
    // console.log(produce)
    // console.log(spice)
  }, [shoppingList, usersThings, usersList, count])
  const handleClick = (e) => {
    console.log(e)
  }

  return (
    <div style={style.container}>
      <NavContainer />
      {dairy ? (
        <div style={style.container}>
          <h3>Dairy</h3>
          <ul style={style.ul}>
            {dairy.map((x, i) => {
              return <List key={'dairy' + i} value={Math.ceil(x[0][1].amount) + ' --- ' + x[0][0]} />
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {dryGood ? (
        <div style={style.container}>
          <h3>Dry Goods</h3>
          <ul style={style.ul}>
            {dryGood.map((x, i) => {
              return (
                <div style={style.liContainer}>
                  <List key={'dryGoods' + i} value={Math.ceil(x[0][1].amount) + ' --- ' + x[0][0]} />
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
          <h3>Frozen</h3>
          <ul style={style.ul}>
            {frozen.map((x, i) => {
              return <List key={'frozen' + i} value={Math.ceil(x[0][1].amount) + ' --- ' + x[0][0]} />
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {meat ? (
        <div style={style.container}>
          <h3>Meat</h3>
          <ul style={style.ul}>
            {meat.map((x, i) => {
              return <List key={'meat' + i} value={Math.ceil(x[0][1].amount) + ' --- ' + x[0][0]} />
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {produce ? (
        <div style={style.container}>
          <h3>Produce</h3>
          <ul style={style.ul}>
            {produce.map((x, i) => {
              return <List key={+i} value={Math.ceil(x[0][1].amount) + ' --- ' + x[0][0]} />
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {spice ? (
        <div style={style.container}>
          <h3>Spices</h3>
          <ul style={style.ul}>
            {spice.map((x, i) => {
              return <List key={'spices' + i} value={Math.ceil(x[0][1].amount) + ' --- ' + x[0][0]} />
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
