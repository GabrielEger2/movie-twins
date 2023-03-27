import './App.css'
import Navbar from './components/Navbar'

import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div>
      <Outlet />
      <Navbar />
    </div>
  )
}

export default App
