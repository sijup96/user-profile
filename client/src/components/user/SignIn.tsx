import axios from "axios";
import { useEffect, useRef, useState } from "react"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from "../../utils/userSlice";
import validate from "../../utils/validate";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../utils/appStore";

const SignIn = () => {
  const navigate=useNavigate()
  const [isSignInForm, setIsSignInForm] = useState(true)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<string[]>([])
  const dispatch = useDispatch()
  const {userInfo}=useSelector((state:RootState)=>state.user)
  const [data, setData] = useState({
    name: '',
    email: "",
    password: "",
  })
  useEffect(()=>{
    if(userInfo)
      navigate('/')
  },[])
  // set data
  const handleChange = ({ currentTarget: input }: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [input.name]: input.value })
  }
  // Confirm password
  const handleConfirmPassword = () => {
    if (data.password !== passwordRef.current?.value)
      setErrors(prevErrors => [...prevErrors, 'confirmPasswordError']);
    else
      setErrors(errors => errors.filter(e => e !== 'confirmPasswordError'))
  }
  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (isSignInForm) {
        const url = 'http://localhost:3000/signIn'
        const response = await axios.post(url, data,{withCredentials:true})
        if(response.data.success){
        dispatch(setCredentials(response.data.data))
         navigate('/')
        }
      } else {
        if (!validate({ data, setErrors })){
          if(passwordRef.current?.value===""){
            setErrors((prevError)=>[...prevError,'confirmPasswordError'])
          }
          return
        }
        const url = 'http://localhost:3000/signUp'
        const response = await axios.post(url, data)
        dispatch(setCredentials(response.data))
        navigate('/')
      }

    } catch (error: any) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        if (error.response.status === 401) {
          setErrors(error.response.data.errors)
        } else if (error.response.status === 404) {
          setErrors([error.response.data.message])
        } else {
          setErrors([error.response.data.message])
        }
      }
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
            {isSignInForm ? "Sign in to your account" : "Create an account"}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
            {
              (!isSignInForm) && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    User name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={data.name}
                      onChange={handleChange}
                      autoComplete="name"
                      placeholder="Enter user name"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {
                    errors.includes('nameError') && (<p className="text-red-700 text-sm pl-2">Enter a valid name.</p>)
                  }
                </div>
              )
            }
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="Enter email address"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {
                errors.includes('emailError') && (<p className="text-red-700 text-sm pl-2">Enter a valid email..</p>)
              }
              {
                errors.includes('existingUser') && (<p className="text-red-700 pl-2 text-sm">Email already exist..</p>)
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
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {
                errors.includes('passwordError') && (<p className="text-red-700 text-sm pl-2">Password must be between 8 and 15 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character.</p>)
              }
              {
                errors.includes('noUserFound') && (<p className="text-red-700 text-sm pl-2 text-center">invalid credentials..</p>)
              }
            </div>
            {
              !isSignInForm && (
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Re-enter password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      type="password"
                      ref={passwordRef}
                      autoComplete="current-password"
                      placeholder="Enter password"
                      onChange={handleConfirmPassword}
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {
                    errors.includes('confirmPasswordError') && (<p className="text-red-700 text-sm pl-2">Password does not match</p>)
                  }
                </div>
              )
            }

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSignInForm ? 'signIn' : 'signUp'}
              </button>
            </div>
          </form>
          {
            isSignInForm ? (<p className="mt-10 text-center text-sm text-gray-500">
              Not a member ?{' '}
              <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                onClick={() => { setIsSignInForm(!isSignInForm), setErrors([])}}>
                signUp
              </span>
            </p>) : <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account ?{' '}
              <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                onClick={() => { setIsSignInForm(!isSignInForm), setErrors([]) }}>
                signIn
              </span>
            </p>
          }
        </div>
      </div>
    </>
  )
}

export default SignIn
