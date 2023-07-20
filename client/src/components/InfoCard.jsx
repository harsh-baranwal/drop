import React, { useEffect, useState } from "react";
import Card from './Card'
import ProfileModal from './ProfileModal';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import * as UserApi from "../api/UserRequests.js"
import InstaIcon from '/instagram.svg'

const InfoCard = () => {
  const {user} = useSelector((state) => state.authReducer.authData)
  const posts = useSelector((state) => state.postReducer.posts)

  const [modalOpened, setModalOpened] = useState(false);

  const params = useParams()

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({})

  const mediaFolder = import.meta.env.VITE_APP_MEDIA_FOLDER

  useEffect(() => {
    const fetchProfileUser = async() => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      }
      else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    }
    fetchProfileUser();
  }, [user])

  return (
    <Card>
      <div className="flex justify-between relative">
        <div className="flex gap-3">
          <img src={ profileUser.profileImage ? mediaFolder + profileUser.profileImage : mediaFolder + "profile.png" } className="rounded-full w-32" />
          <span className="my-4">
            <h3 className="font-semibold text-2xl">{profileUser.fullname}</h3>
            <p className="block text-base">{"@" + profileUser.username}</p>
            {user._id === profileUserId ? <button className="text-white mt-1 text-base p-1 px-3 rounded-md bg-primary" onClick={() => setModalOpened(true)}>Edit Profile</button> : <button className="text-white mt-1 text-base p-1 px-3 rounded-md bg-primary">Follow</button> }
            </span>
          <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data = {user} />
        </div>


          <button className="absolute top-2 right-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hover:fill-current">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
      </div>

      <p className="px-5 text-gray-500 my-4">{profileUser.about ? profileUser.about : "Tell something about yourself..."}</p>
      <div className="text-gray-500 mx-14">

        <p className='flex gap-2 my-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-[#333333] w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg> {profileUser.location ? profileUser.location : "Location"}</p>

        <p className="flex gap-2 my-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-[#333333] w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg> {profileUser.profession ? profileUser.profession : "Profession"}</p>

        <div className="flex justify-between w-36">
          <div className="font-medium text-[#333333]">
            <p>Posts</p>
            <p>Followers</p>
            <p>Following</p>
          </div>
          <div className="">
            <p>{posts.filter((post) => post.userId === user._id).length}</p>
            <p>{user.followers.length}</p>
            <p>{user.followings.length}</p>
          </div>
        </div>
      </div>
        {profileUser.isAdmin ? 
          <div className="flex justify-center w-full">
            <img src={InstaIcon} className="w-7" />:&nbsp;<a href="https://instagram.com/harshrbaranwal" target="_blank" className="hover:underline">harshrbaranwal</a>
          </div> : ""
        }
    </Card>
  )
}

export default InfoCard