import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../utils/appStore';

const Header = () => {
  const {userInfo}=useSelector((state:RootState)=>state.user)
  console.log(userInfo)
    const handleLogout=()=>{
        localStorage.removeItem('token');
        window.location.reload()

    }
  return (
    <>
        <div style={{backgroundColor:'#1a1a1a'}} className='py-5 px-5 bg-white flex relative '>
        <div className='text-slate-300 w-1/2 justify-center flex'>Welcome {userInfo?.firstName}</div>
        {(userInfo && <div className='mr-10 space-x-3 w-1/2 flex items-center justify-end'>
            <p> {userInfo.name}</p>
            <button onClick={handleLogout}   className='rounded-md p-2 bg-indigo-600' >Logout</button>
            <Link to={"/edit-profile"} className='rounded-md p-2 bg-indigo-600' >Edit Profile</Link>
         </div>)}
         {/* {(adminInfo &&
          <button onClick={adminLogout}  className='rounded-md p-2 bg-indigo-600 absolute right-20 bottom-3' > Logout</button>)
          ||(!userInfo && <Link to={"/admin-login"} className='rounded-md p-2 bg-indigo-600 absolute right-20 bottom-3' > Admin Login</Link>)
         } */}
         
      </div>
      </>
  )
}

export default Header
