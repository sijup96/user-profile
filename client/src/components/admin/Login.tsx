import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addAdmin } from '../../utils/adminSlice'
import { RootState } from '../../utils/appStore';

const Login = () => {
    const [errors,setErrors]=useState<string[]>([])
    const email=useRef<HTMLInputElement>(null)
    const password=useRef<HTMLInputElement>(null)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {adminInfo}=useSelector((state:RootState)=>state.admin)
    useEffect(()=>{
      if(adminInfo)
        navigate('/admin')
    },[])

    const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      try{
      const url='http://localhost:3000/admin/signIn';
      const data={
        email:email.current?.value,
        password:password.current?.value
      }
      const response=await axios.post(url,data,{withCredentials:true})
      if(response.data.success){
        console.log(response.data);
        
        dispatch(addAdmin(response.data.data))
        navigate('/admin')
      }
    }catch(error){

    }
    }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Admin SignIn
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={email}
                  autoComplete="email"
                  placeholder="Enter email address"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {
                errors.includes('emailError') && (<p className="text-red-700 text-sm pl-2">Enter a valid email..</p>)
              }
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={password}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {
                errors.includes('passwordError') && (<p className="text-red-700 text-sm pl-2">Password must be between 8 and 15 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character.</p>)
              }
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                signIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
