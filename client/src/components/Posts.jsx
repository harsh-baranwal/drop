import React, { useEffect } from 'react'
import PostCard from './PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../actions/postAction'
import { useParams } from 'react-router-dom'

const Posts = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)

  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])
  return (
    <div>
        {loading ? <span className="text-center font-bold text-2xl">Loading Posts</span>
        : posts.map((post, id) => {
            return <PostCard data={post} id={id} />
        })}
        {/* <PostCard /> */}
    </div>
  )
}

export default Posts