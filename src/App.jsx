import { Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./helpers/ProtectedRoute"
import Statistics from "./pages/Statistics"
import EventPage from "./pages/EventsPage"
import UsersPage from "./pages/UsersPage"
import Home from "./pages/Home"
import Events from "./pages/Events"
import ParticipantDashboard from "./pages/ParticipantDashboard"
import SingleEvent from "./pages/SingleEvent"


function App() {

  return (

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route  path='/dashboard' element={<ProtectedRoute role='organizer'><Dashboard /></ProtectedRoute>}>
       <Route index element={<ProtectedRoute role='organizer'><Statistics/></ProtectedRoute>} />
       <Route  path="/dashboard/events" element={<ProtectedRoute role='organizer'><EventPage /></ProtectedRoute>} />
       <Route  path="/dashboard/single-event" element={<ProtectedRoute role='organizer'><SingleEvent /></ProtectedRoute>} />
       <Route  path="/dashboard/users" element={<ProtectedRoute role='organizer'><UsersPage /></ProtectedRoute>} />
      </Route>
      <Route path='/home' element={<ProtectedRoute ><Home/></ProtectedRoute>} >
       <Route index element={<ParticipantDashboard/>} />
       <Route path="/home/events" element={<Events/>} />
      </Route>
     

    </Routes>
  )
}

export default App
