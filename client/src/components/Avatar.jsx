import React from 'react'
import AvatarImg from '/avatar.jpg'

const Avatar = ({size}) => {
  let width = 14;
  if (size == "big") {
    width = 24;
  }
  return (
    <div className="">
        <img src={ AvatarImg } className={`rounded-full w-14`} />
    </div>
  )
}

export default Avatar