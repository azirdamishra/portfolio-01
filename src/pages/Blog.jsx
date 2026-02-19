import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'

const Blog = () => {
  return (
    <section className='max-container'>
      <Link 
        to="/about" 
        className='inline-flex items-center gap-2 text-slate-600 hover:text-blue-500 mb-8 transition-colors'
      >
        <img src={arrow} className='w-4 h-4 rotate-180' alt="" />
        Back to About
      </Link>

      <h1 className='head-text'>
        <span className='blue-gradient_text font-semibold drop-shadow'>Blog</span>
      </h1>

      <div className='mt-10 flex flex-col gap-4 text-slate-500'>
        <p className='text-lg'>
          Thoughts on design, fashion, and code—coming soon.
        </p>
        <p className='text-sm'>
          This is where I'll share tutorials, reflections, and things I'm learning along the way.
        </p>
      </div>
    </section>
  )
}

export default Blog
