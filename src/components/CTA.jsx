import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className='cta'>
        <p className='cta-text'>Have a project in mind? 
            <br className='sm:block hidden'/>
            <span className='text-black-500 font-medium'>Let's build something together!</span>
        </p>
        <Link to="/contact" className='btn'>
            Contact
        </Link>
    </section>
  )
}

export default CTA