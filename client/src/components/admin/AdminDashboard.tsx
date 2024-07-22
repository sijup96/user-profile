import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const AdminDashboard = () => {
const [users,setUsers]=useState([])
const dispatch=useDispatch()
useEffect(()=>{
fetch('http://localhost:3000/admin/dashboard',{
    method:"GET"
})   .then(response=>response.json())
.then(data=>{
  console.log(data)

  setUsers(data)
})
.catch(error=>console.log(error))
},[])
console.log(users);

  return (
    <div>
      Admin
    </div>
  )
}

export default AdminDashboard
