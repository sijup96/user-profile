import Header from './Header'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/appStore';
import { Link } from 'react-router-dom';

const Home = () => {
  const user=useSelector((state:RootState)=>state.user)
  
  
  return (
    <div>
      <Header />
      <h1 className="font-bold text-3xl py-4 text-center text-black underline">
        WELCOME TO DASHBOARD
      </h1>
      <div className="border-2 text-black p-4 flex flex-col items-center">
        <img className="border-2 w-64 h-64 mb-5" src={user.userInfo?.image || 'https://res.cloudinary.com/daxr1ryey/image/upload/v1721921348/User_Avatar/qdv0ydnlseno2jklavil.png'} alt="user-profile" />
        <h2 className="my-2 ">User Name: {user.userInfo?.name}</h2>
        <h2 className="my-2">Email: {user?.userInfo?.email}</h2>
        <Link to={'/profile'} className="bg-green-500 text-white px-5 py-2 rounded cursor-pointer mt-5 hover:bg-green-600">
          Update Profile
        </Link>
      </div>
    </div>
  )
}

export default Home
