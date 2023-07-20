import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UnFollowUser, followUser } from '../actions/userAction'

const Users = ({person}) => {

  const {user} = useSelector((state) => state.authReducer.authData)

  const mediaFolder = import.meta.env.VITE_APP_MEDIA_FOLDER

  const [following, setFollowing] = useState(person.followers.includes(user._id));

  const dispatch = useDispatch()

  const handleFollow = () => {
    following ?
    dispatch(UnFollowUser(person._id, user)) :
    dispatch(followUser(person._id, user))

    setFollowing((prev)=>!prev)
  }

  return (
    <div className="flex justify-between mx-8 my-3">
                <div className="flex gap-3">
                    <img src={person.profileImage ? mediaFolder + person.profileImage : mediaFolder + "profile.png"} className="rounded-full w-14" />
                    <p className="font-medium hover:underline my-4">{person.fullname}</p>
                </div>
                <div className="">
                    <button onClick={handleFollow} className={following ? "bg-transparent text-primary border-2 border-primary rounded-md p-[0.40rem] px-6 my-2" : "bg-primary text-white rounded-md p-[0.40rem] px-6 my-2"}>{following ? "Unfollow" : "Follow"}</button>
                </div>
    </div>
  )
}

export default Users