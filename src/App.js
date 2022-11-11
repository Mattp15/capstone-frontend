import logo from './logo.svg'
import './App.css'
import { Landing } from './Components'
import { Login } from './Components/Forms'
import { Register } from './Components/Forms'

function App() {
  return (
    <div className='App'>
      <Landing />
      <Register />
      <Login />
    </div>
  )
}

export default App
