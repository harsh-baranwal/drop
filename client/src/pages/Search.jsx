import React from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Avatar from '../components/Avatar'

const Search = () => {
  return (
    <Layout page="Search">
        <Card>
          <div className="relative">
            <input type="text" name="" id="" className="border-[1px] border-gray-300 p-2 pl-4 pr-12 rounded-full w-full" placeholder='Search anything...' />
            <button className="bg-primary text-white p-2 rounded-full absolute right-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            </button>
          </div>

          <div className="flex justify-between px-7 my-4">
          <div className="flex gap-3">
            <Avatar />
            <p className='py-4'><a href="" className="font-medium hover:underline">Harsh Baranwal</a> is on trending.</p>
          </div>
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-5 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          </div>

          <div className="flex justify-between px-7 my-4">
          <div className="flex gap-3">
            <Avatar />
            <p className='py-4'><a href="" className="font-medium hover:underline">Shahrukh Khan</a> is on trending.</p>
          </div>
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-5 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          </div>

          <div className="flex justify-between px-7 my-4">
          <div className="flex gap-3">
            <Avatar />
            <p className='py-4'><a href="" className="font-medium hover:underline">Kit Harrington</a> is on trending.</p>
          </div>
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-5 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          </div>
        </Card>
    </Layout>
  )
}

export default Search