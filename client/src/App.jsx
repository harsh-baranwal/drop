import React from 'react'
import Auth from './pages/Auth.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Profile from './pages/Profile.jsx';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Followers from './pages/Followers.jsx';

const App = () => {
    const user = useSelector((state)=>state.authReducer.authData)
  return (
    <div>
        <Routes>
            <Route path = "/" element = { user ? <Navigate to = "home" /> : <Navigate to = "auth" />} />

            <Route path = "/home" element = { user ? <Home/> : <Navigate to = "../auth" />} />

            <Route path = "/auth" element = { user ? <Navigate to = "../home" /> : <Auth />} />

            <Route path = "/profile/:id" element = { user ? <Profile /> : <Navigate to = "../auth" />} />

            <Route path = "/search" element = { user ? <Search /> : <Navigate to = "../auth" />} />

            <Route path = "/followers" element = { user ? <Followers /> : <Navigate to = "../auth" />} />
        </Routes>
    </div>
  )
}

export default App