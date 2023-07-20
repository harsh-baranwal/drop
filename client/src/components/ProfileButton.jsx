import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileButton = () => {
  const {user} = useSelector((state) => state.authReducer.authData)

  return (
      <Link to = {`/profile/${user._id}`}>
      <button className='w-16 h-16 rounded-full fixed bottom-10 mdmax:bottom-24 p-5 border-gray-300 border-[1px] right-10 bg-primary shadow-md text-center hover:shadow-md hover:bg-[#5f3fa9]'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
      </svg>  
      </button></Link>
  )
}

export default ProfileButton