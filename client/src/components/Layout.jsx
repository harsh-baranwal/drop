import React from 'react'
import Sidebar from './Sidebar'
import Bar from './Bar'
import ProfileButton from './ProfileButton'

const Layout = ({children, page}) => {
  return (
    <div>
    <Bar />
    <div className="md:flex mx-auto max-w-[60rem] gap-6">
        <Sidebar page={page} />

        <div className="md:w-[70%] mdmax:mx-2">
            {children}
            <div className="text-center font-medium py-2 mdmax:block hidden mb-24">
            <p><a href="http://github.com/harsh-baranwal/drop" target="_blank">Made</a> with ❤️ by <a href="http://linkedin.com/in/harshbaranwal" target="_blank" className="hover:underline">Harsh Baranwal</a></p></div>
        </div>
    </div>
    <ProfileButton />
    </div>
  )
}

export default Layout