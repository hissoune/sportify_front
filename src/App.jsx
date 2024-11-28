import { Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./helpers/ProtectedRoute"
import Statistics from "./pages/Statistics"
import EventPage from "./pages/EventsPage"
import UsersPage from "./pages/UsersPage"


function App() {

  return (

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route  path='/dashboard' element={<ProtectedRoute role='organizer'><Dashboard /></ProtectedRoute>}>
       <Route index element={<Statistics/>} />
       <Route  path="/dashboard/events" element={<EventPage />} />
       <Route  path="/dashboard/users" element={<UsersPage />} />
      </Route>

     

    </Routes>
  )
}

export default App
