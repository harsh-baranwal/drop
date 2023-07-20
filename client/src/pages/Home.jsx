import React from 'react'
import Layout from '../components/Layout'
import PostForm from '../components/PostForm'
import Posts from '../components/Posts'

const Home = () => {
  return (
        <Layout page={'Home'}>
            <PostForm />
            <Posts />
        </Layout>
  )
}

export default Home