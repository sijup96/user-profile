import { useSelector } from 'react-redux'
import { RootState } from '../../utils/appStore'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtected = () => {
    const {adminInfo}=useSelector((state:RootState)=>state.admin)
    return adminInfo?<Outlet/>:<Navigate to={'/adminLogin'} replace/>
}

export default AdminProtected
