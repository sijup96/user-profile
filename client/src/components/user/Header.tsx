import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../utils/appStore';
import axios from 'axios';
import { clearCredentials } from '../../utils/userSlice';

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    try {
      const url = 'http://localhost:3000/logout'
      const response = await axios.post(url, { token: userInfo?.token })
      if (response.data.status) {

        dispatch(clearCredentials());
        navigate('/')
      }

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <div className='py-5 px-5 bg-blue-500 flex relative '>
      <div className='text-slate-300 text-xl w-1/2 flex '><Link to={'/'}>Home</Link> </div>
        <div className='text-slate-300 text-xl w-1/2 justify-center flex'>Welcome {userInfo?.name}</div>
        {(userInfo && <div className='mr-10 space-x-3 w-1/2 flex items-center justify-end'>
          <button onClick={handleLogout} className='rounded-md p-2 bg-indigo-600' >Logout</button>
        </div>)}

      </div>
    </>
  )
}

export default Header
