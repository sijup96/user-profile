import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../utils/appStore';
import axios from 'axios';
import { clearCredentials } from '../../utils/userSlice';

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.user)
  const { adminInfo } = useSelector((state: RootState) => state.admin)
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    try {
      const url = 'http://localhost:3000/logout'
      const response = await axios.post(url, { token: userInfo?.token })
      console.log('jkhdsjf', response.data);
      if (response.data.status) {

        dispatch(clearCredentials());
        navigate('/')
      }

    } catch (error) {
      console.log(error);

    }
  }
  const adminLogout = () => {

  }

  return (
    <>
      <div className='py-5 px-5 bg-blue-500 flex relative '>
      <div className='text-slate-300 text-xl w-1/2 flex '><Link to={'/'}>Home</Link> </div>
        <div className='text-slate-300 text-xl w-1/2 justify-center flex'>Welcome {userInfo?.name}</div>
        {(userInfo && <div className='mr-10 space-x-3 w-1/2 flex items-center justify-end'>
          <button onClick={handleLogout} className='rounded-md p-2 bg-indigo-600' >Logout</button>
        </div>)}
        {(adminInfo &&
          <button onClick={adminLogout} className='rounded-md p-2 bg-indigo-600 absolute right-20 bottom-3' > Logout</button>)
          || (!userInfo && <Link to={"/admin-login"} className='rounded-md p-2 bg-indigo-600 absolute right-20 bottom-3' > Admin Login</Link>)
        }

      </div>
    </>
  )
}

export default Header
