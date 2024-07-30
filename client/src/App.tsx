
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/user/Home'
import SignIn from './components/user/SignIn'
import ProfileUpdate from './components/user/ProfileUpdate'
import AdminDashboard from './components/admin/AdminDashboard'
import Protected from './components/user/Protected'
import AdminProtected from './components/admin/AdminProtected'
import Login from './components/admin/Login'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { clearCredentials } from './utils/userSlice'
import { useEffect } from 'react'
import UpdateUser from './components/admin/UpdateUser'
import useGetUserData from './hooks/useGetUserData'
function App() {
  const userData = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null
  const dispatch = useDispatch()
  useGetUserData()

  const fetchUser = async () => {
    const data = {
      token: userData?.token
    }
    const response = await axios.post('http://localhost:3000/userExist', { data })
    if (!response.data.status) {
      dispatch(clearCredentials())
    }
  }
  useEffect(() => {
    fetchUser();
    return
  }, [])
  return (
    <Routes>
      <Route path='/login' element={<SignIn />} />
      <Route path='/admin-Login' element={<Login />} />
      <Route element={<AdminProtected />}>
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/updateUser/:userId' element={<UpdateUser/>}/>
      </Route>
      <Route element={<Protected />}>
        <Route path='/profile' element={<ProfileUpdate />} />
        <Route path='/' element={<Home />} />
      </Route>


    </Routes>
  )
}

export default App