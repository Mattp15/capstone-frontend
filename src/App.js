import logo from './logo.svg'
import './App.css'
import { Landing } from './Components'
import { Login, Register } from './Components/Forms/index'
import { UserInfo, ShoppingList, RecipeChoose, RecipeIndex } from './Components/UserThings/index'

const App = () => {
  return (
    <div className='App'>
      <Landing />
      <Register />
      <Login />
      <UserInfo />
      <ShoppingList />
      <RecipeChoose />
      <RecipeIndex />
    </div>
  )
}

export default App
