import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth.js'
import {logout} from "../../store/authSlice.js"

function Logout() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
<button
  onClick={logoutHandler}
  className="inline-block px-6 py-2 cursor-pointer bg-slate-700 text-gray-200 font-semibold rounded-full shadow-md 
             hover:bg-indigo-600 hover:shadow-indigo-300/30 transition-all duration-300 
             active:scale-95"
>
  Logout
</button>

  )
}

export default Logout
