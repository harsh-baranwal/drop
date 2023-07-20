import React, { useState, useRef } from 'react'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../actions/uploadAction'

const PostForm = () => {
  const [image, setImage] = useState(null)
  const imageRef = useRef();
  const {user} = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const desc = useRef();

  const mediaFolder = import.meta.env.VITE_APP_MEDIA_FOLDER

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage(img)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData()
      const fileName = Date.now() + image.name
      data.append("name", fileName)
      data.append("file", image)
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    else {
      console.log(newPost);
    }
    dispatch(uploadPost(newPost))
    resetShare();
  }

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <Card>
      <div className="flex gap-2">
        <img src={user.profileImage ? mediaFolder + user.profileImage : mediaFolder + "profile.png"} className="rounded-full w-14" />
        <textarea name="" id="" ref={desc} className="w-full p-3 h-14 resize-none" required placeholder="Write anything freely..."></textarea>
      </div>

      <div className="flex justify-between mt-1">
      <div className="flex gap-4 mt-2">
        <button className="flex gap-2" onClick={()=>imageRef.current.click()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
</svg>
 Photos</button>

        <button className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"></path></svg> Mood</button>
      </div>

        <button className="bg-primary p-1 px-3 text-white rounded-md" onClick={handleSubmit}>Drop it!</button>
        <input type="file" name="myImage" id="" ref={imageRef} className="hidden" onChange={onImageChange}/>
      </div>
      {image && (
        <div className="relative ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-2 absolute top-2 left-3 cursor-pointer" onClick={()=>setImage(null)}>
          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
          </svg>
          <img src={URL.createObjectURL(image)} alt="" className="mt-2 w-full object-cover rounded-md" />
        </div>
      )}

    </Card>
  )
}

export default PostForm