import React from 'react'
import { Link } from 'react-router-dom'
import { skills, experiences } from '../constants'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import CTA from '../components/CTA'
import { arrow } from '../assets/icons'

const AboutExperience = () => {
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
        Experience & <span className='blue-gradient_text font-semibold drop-shadow'>Skills</span>
      </h1>

      {/* Tools section - above work experience */}
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>Tools & Skills</h3>
        <div className='mt-8 flex flex-wrap gap-x-8 gap-y-10'>
          {skills.map((skill) => (
            <div
              key={skill.name}
              className='group relative flex flex-col items-center pb-2'
            >
              <div className='block-container w-14 h-14'>
                <div className='btn-back rounded-xl'/>
                <div className='btn-front rounded-xl flex justify-center items-center'>
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className='w-1/2 h-1/2 object-contain'
                  />
                </div>
              </div>
              <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10'>
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Work experience section */}
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>Work Experience</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>I've worked with all sorts of companies, levelling up my skills and teaming up with smart people. Here's the rundown:</p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience) => (
              <VerticalTimelineElement 
                key={experience.company_name}
                date={experience.date}
                icon={<div className='flex justify-center items-center w-full h-full'>
                  <img 
                    src={experience.icon}
                    alt={experience.company_name}
                    className='w-[60%] h-[60%] object-contain'
                  />
                </div>}
                iconStyle={{
                  background: experience.iconBg
                }}
                contentStyle={{
                  borderBottom: '8px',
                  borderStyle: 'solid',
                  borderBottomColor: experience.iconBg,
                  boxShadow: 'none'
                }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {experience.title}
                  </h3>
                  <p className='text-black-500 font-medium font-base' style={{margin:0}}>
                    {experience.company_name}
                  </p>
                </div>
                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {experience.points.map((point, index) => (
                    <li key={`experience-point-${index}`} className='text-black-500/50 font-normal pl-1 text-sm'>
                      {point}
                    </li>
                  ))}
                </ul>
                {experience.tools && (
                  <div className='mt-4 pt-3 border-t border-slate-200'>
                    <p className='text-black-500/70 font-medium text-sm mb-2'>Tools:</p>
                    <p className='text-black-500/50 font-normal text-sm'>{experience.tools}</p>
                  </div>
                )}
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
      
      <hr className='border-slate-200'/>
      <CTA />
    </section>
  )
}

export default AboutExperience
