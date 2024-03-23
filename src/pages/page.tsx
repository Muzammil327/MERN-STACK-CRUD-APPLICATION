import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='my-8 w-6/12 mx-auto flex flex-col gap-8'>
        <Link to="/crud" className='bg-red-500 py-3 px-8 text-white'>MERN STACK CRUD</Link>
        <Link to="/authentication/register" className='bg-red-500 py-3 px-8 text-white'>MERN STACK Authentication</Link>
    </div>
  )
}
