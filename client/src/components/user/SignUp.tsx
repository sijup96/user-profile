import axios from "axios";
import { ChangeEvent, useState } from "react"
import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleChange = ({ currentTarget: input }: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [input.name]: input.value })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      
      const url = 'http://localhost:3000/api/users'
      const { data: res } = await axios.post(url, data)

      navigate('/login')
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }

  }
  return (
    <div className="bg-blue-900">
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* Left column container with background */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone"
              />
            </div>

            {/* Right column container with form */}
            <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
              <form onSubmit={handleSubmit}>
                {/* First name input */}
                <div className="relative mb-6" data-twe-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[5.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]"
                    placeholder="Type here..."
                    value={data.firstName}
                    name="firstName"
                    id="exampleFormControlInput1"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]   text-neutral-500  duration-200 ease-out  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                  >
                    First Name
                  </label>
                </div>
                {/* Last Name */}
                <div className="relative mb-6" data-twe-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[5.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]"
                    id="exampleFormControlInput2"
                    placeholder="Type here..."
                    value={data.lastName}
                    name="lastName"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                  >
                    Last Name
                  </label>
                </div>
                {/* Email input */}
                <div className="relative mb-6" data-twe-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[5.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]"
                    id="exampleFormControlInput3"
                    placeholder="Type here..."
                    value={data.email}
                    name="email"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                  >
                    Email address
                  </label>
                </div>

                {/* Password input */}
                <div className="relative mb-6" data-twe-input-wrapper-init>
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[5.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]"
                    id="exampleFormControlInpu4"
                    placeholder="Type here..."
                    value={data.password}
                    name="password"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput4"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                  >
                    Password
                  </label>
                </div>
                <div className='flex flex-col mb-3 text-stone-400'>
                  <label className='mb-3' htmlFor="image">Profile picture</label>
                  <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      setImage(file);
                    }
                  }} name="image" className='p-2 rounded ' type="file" id='image' placeholder='retype password' />
                </div>
                {error && <div className="text-center text-rose-700">
                  {error}
                </div>}
                {/* Submit button */}
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Register
                </button>

                {/* Divider */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                    OR
                  </p>
                </div>
                <Link
                  className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium  leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  style={{ backgroundColor: "#3b5998" }}
                  role="button"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  to={'/login'}
                >
                  {/* Facebook */}
                  <span className="me-2 fill-white [&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                    SignIn
                  </span>

                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignUp
