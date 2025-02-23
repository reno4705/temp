/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button onClick={()=>navigate("/register")}>Register new Employee</button>
        <h1>Registered Employee Details</h1>
        <div>
            
        </div>
    </div>
  )
}

export default Home