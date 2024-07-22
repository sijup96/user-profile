
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './components/user/SignUp'
import Home from './components/user/Home'
import SignIn from './components/user/SignIn'
import ProfileUpdate from './components/user/ProfileUpdate'
import AdminDashboard from './components/admin/AdminDashboard'

function App() {
  const user=localStorage.getItem('token')

  return (
  <Routes>
    <Route path='/profile' element={<ProfileUpdate/>}/>
    <Route path='/signUp' element={<SignUp/>}/>
    <Route path='/login' element={<SignIn/>}/>
    {user && <Route path='/' element={<Home/>}/>}
    <Route path='/'element={<Navigate replace to='/login'/>}/>
    <Route path='/admin' element={<AdminDashboard/>}/>
  </Routes>
  )
}

export default App