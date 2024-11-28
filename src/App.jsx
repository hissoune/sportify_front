import { Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./helpers/ProtectedRoute"


function App() {

  return (

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route  path='/dashboard' element={<ProtectedRoute role='organizer'><Dashboard /></ProtectedRoute>}>

      </Route>

     

    </Routes>
  )
}

export default App
