import React from 'react'
import Layout from '../components/Layout'
import PostForm from '../components/PostForm'
import InfoCard from '../components/InfoCard'
import Posts from '../components/Posts'

const Profile = () => {
  return (
    <Layout>
        <InfoCard />
        <PostForm />
        <Posts />
    </Layout>
  )
}

export default Profile