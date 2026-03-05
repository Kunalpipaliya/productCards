import { Link } from '@mui/material'
import React from 'react'
import Home from '../Pages/Home'

const Header = () => {
    const currentUserEmail=JSON.parse(localStorage.getItem("currentUser"))
    const handleLogout=()=>{
        localStorage.removeItem("currentUser")
        window.location.href="/"
    }
  return (

    <div>
        <div className="px-5 py-2 d-flex justify-content-between bg-white align-items-center shadow-sm">
            <h2>Logo</h2>
            <div className='d-flex gap-3'>

            <Link href="/home" className='text-decoration-none text-dark'>Home</Link>
            <Link href={currentUserEmail?"/dashboard":"/"} className='text-decoration-none text-dark'>Profile</Link>
            </div>
            {
                currentUserEmail?
                <button className="btn btn-dark" type='button' onClick={handleLogout}>Logout</button>
                :<div className='d-flex gap-2'>
                    <Link className='btn btn-primary text-decoration-none text-white' href="/">Login</Link>
                    <Link className='btn btn-primary text-decoration-none text-white' href="/signup">Sign up</Link>
                </div>
            }
        </div>
    </div>
  )
}

export default Header
