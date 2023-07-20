import React, { useState } from 'react'
import Card from './Card'
import { useSelector } from 'react-redux';
import { likePost } from '../api/PostRequest';

const PostCard = ({data}) => {
  const {user} = useSelector((state) => state.authReducer.authData)

  const mediaFolder = import.meta.env.VITE_APP_MEDIA_FOLDER

  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length);

  const [comments, setComments] = useState(data.comments.length);

  const handleLike = () => {
    setLiked((prev)=>!prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev-1) : setLikes((prev) => prev+1)
  }

  const formatter = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });

  return (
    <Card>

      <div className="flex justify-between">
        <div className="flex gap-3">
            <img src={user.profileImage ? mediaFolder + user.profileImage : mediaFolder + "profile.png"} className="rounded-full w-14" />
            <div className="py-1">
              <p className=""><a href="" className="font-medium hover:underline">{data.fullname}</a> shared a droplet.</p>
              <p className="text-gray-500">{formatter.format(Date.parse(data.createdAt))}</p>
            </div>
        </div>
        <button className="mb-8"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-gray-500 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg></button>
        </div>
        <p className="tracking-tight leading-5 mt-3">{data.desc}</p>

        <div className="rounded-md">
            <img src={data.image ? import.meta.env.VITE_APP_MEDIA_FOLDER + data.image : ""} alt="" className="rounded-md my-3 w-full" />
        </div>
        <div className="flex gap-4 my-3">
            <button className="flex gap-1" onClick={handleLike}> { liked ? <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-red-600 stroke-red-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg></span> : <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-red-600 hover:stroke-red-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg></span> } {likes}</button>

            <button className="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg> {data.comments}</button>

            <button className="flex gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg> {data.mirror}</button>
        </div>

        <div className="flex gap-3">
        <img src={user.profilePicture ? mediaFolder + user.profilePicture : mediaFolder + "profile.png"} className="rounded-full w-14" />
          <input type="text" name="" id="" className="w-full rounded-full p-3 pl-4 border-gray-400 border-[1px]" placeholder="Leave a comment"/>
        </div>

        <div className="flex justify-between mt-4">
        <div className="flex gap-3">
        <img src={user.profilePicture ? mediaFolder + user.profilePicture : mediaFolder + "profile.png"} className="rounded-full w-14" />
          <p className="py-4 bg-gray-200 rounded-full px-5"><a href="" className="font-medium hover:underline">Lucas Millward</a> This is insane!! 🤩</p>
        </div>
        <button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-500 w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg></button>
        </div>
    </Card>
  )
}


export default PostCard