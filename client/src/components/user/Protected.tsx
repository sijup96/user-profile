import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../utils/appStore'

const Protected = () => {

    const { userInfo } = useSelector((state: RootState) => state.user)
    return userInfo ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default Protected
