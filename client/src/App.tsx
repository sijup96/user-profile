
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/user/Home'
import SignIn from './components/user/SignIn'
import ProfileUpdate from './components/user/ProfileUpdate'
import AdminDashboard from './components/admin/AdminDashboard'
import Protected from './components/user/Protected'
import AdminProtected from './components/admin/AdminProtected'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<SignIn />} />

      <Route element={<AdminProtected />}>
        <Route path='/admin' element={<AdminDashboard />} />
      </Route>
      <Route element={<Protected />}>
        <Route path='/profile' element={<ProfileUpdate />} />
        <Route path='/' element={<Home />} />
      </Route>


    </Routes>
  )
}

export default App