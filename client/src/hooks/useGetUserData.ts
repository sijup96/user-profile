import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../utils/appStore'
import axios from 'axios'

const useGetUserData = () => {    
const dispatch=useDispatch()
const userInfo=useSelector((state:RootState)=>state.user)
const getUserInfo=async ()=>{
    const response=await axios.get("http://localhost:3000/getUser",{withCredentials:true})
    console.log(response.data);
    
}
getUserInfo()
}

export default useGetUserData
