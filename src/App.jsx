import { Routes,Route } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"


function App() {

  return (
   <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
   </Routes> 
  )
}

export default App
