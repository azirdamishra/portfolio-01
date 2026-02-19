import React from 'react'
import { Link } from 'react-router-dom'
import { hero } from '../assets/images'
import CTA from '../components/CTA'
import { arrow } from '../assets/icons'

const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hello, I'm <span className='blue-gradient_text font-semibold drop-shadow'>Adriza</span>
      </h1>

      {/* Hero: Photo + Bio */}
      <div className='mt-10 flex flex-col lg:flex-row gap-10 items-center lg:items-start'>
        <div className='flex-shrink-0'>
          <img
            src={hero}
            alt="Adriza"
            className='w-64 h-64 lg:w-72 lg:h-72 object-cover rounded-2xl shadow-lg border-2 border-blue-200/50'
          />
        </div>
        <div className='flex-1 flex flex-col gap-4 text-slate-600'>
          <p className='text-lg leading-relaxed'>
            Software Engineer based in India, specializing in technical education through hands-on learning and building applications.
          </p>
          <p className='text-lg leading-relaxed'>
            I blend creativity with logic—design for the eye, fashion for expression, and code to bring ideas to life. When I'm not shipping features, you'll find me exploring UI/UX, staying curious about trends, and turning ideas into reality.
          </p>
        </div>
      </div>

      {/* Link cards */}
      <div className='mt-16 grid sm:grid-cols-2 gap-6'>
        <Link
          to="/about/experience"
          className='group flex flex-col p-6 rounded-xl bg-blue-500/10 border border-blue-400/30 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-200'
        >
          <h3 className='text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors'>
            Work Experience
          </h3>
          <p className='mt-2 text-slate-600 text-sm'>
            Roles, skills, and the journey so far.
          </p>
          <span className='mt-4 inline-flex items-center gap-2 text-blue-600 font-medium text-sm'>
            View timeline
            <img src={arrow} className='w-4 h-4' alt="" />
          </span>
        </Link>

        <Link
          to="/blog"
          className='group flex flex-col p-6 rounded-xl bg-blue-500/10 border border-blue-400/30 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-200'
        >
          <h3 className='text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors'>
            Blog
          </h3>
          <p className='mt-2 text-slate-600 text-sm'>
            Thoughts on design, fashion, and code.
          </p>
          <span className='mt-4 inline-flex items-center gap-2 text-blue-600 font-medium text-sm'>
            Read more
            <img src={arrow} className='w-4 h-4' alt="" />
          </span>
        </Link>
      </div>
      
      <hr className='border-slate-200 mt-16'/>
      <CTA />
    </section>
  )
}

export default About
