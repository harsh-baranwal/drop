import React from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Avatar from '../components/Avatar'

const Notifications = () => {
  return (
    <Layout page={"Notify"}>
        <Card>
            <div className="flex gap-3">
            <Avatar />
            <p className='my-4'><a href="" className="font-medium hover:underline">Lucas Millward</a> liked your droplet.</p>
            </div>
            <hr className='w-full my-3' />

            <div className="flex gap-3">
            <Avatar />
            <p className='my-4'><a href="" className="font-medium hover:underline">Lucas Millward</a> liked your droplet.</p>
            </div>
            <hr className='w-full my-3' />

            <div className="flex gap-3">
            <Avatar />
            <p className='my-4'><a href="" className="font-medium hover:underline">Lucas Millward</a> liked your droplet.</p>
            </div>
        </Card>
    </Layout>
  )
}

export default Notifications