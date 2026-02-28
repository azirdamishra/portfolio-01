import React from 'react'
import { Link } from 'react-router-dom'
import { hero } from '../assets/images'
import CTA from '../components/CTA'
import { arrow, download } from '../assets/icons'

const About = () => {
  return (
    <section className='max-container'>
      <div className='flex flex-wrap items-center justify-between gap-4 w-full'>
        <h1 className='head-text'>
          Hello, I'm <span className='blue-gradient_text font-semibold drop-shadow'>Adriza</span>
        </h1>
        <a
          href="/Adriza_resume.pdf"
          download="Adriza_Resume.pdf"
          className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/30 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-200 text-blue-600 font-medium text-sm shrink-0'
        >
          <img src={download} className='w-4 h-4' alt="" />
          Download Resume
        </a>
      </div>

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
          Software Engineer based in India who gets excited about hard problems. From optimizing gnarly systems to untangling complex architectures, I'm happiest when I'm deep in research mode, hunting for that elegant solution.
          </p>
          <p className='text-lg leading-relaxed'>
          I believe creativity and good design should go hand in hand - not just in how something works, but also in its look, feel, and interaction with the user. Fashion, for me, has become a way of living this philosophy; expressing ideas and identity through deliberate choices. That eye for detail and aesthetics carries directly into the interfaces and experiences I build.
          </p>
          <p className='text-lg leading-relaxed'>
          I love turning complex ideas into things people can actually understand, use, and enjoy. If your team needs someone who codes with both logic and a creative eye, and won't stop until they've found the better way; let's talk!
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
