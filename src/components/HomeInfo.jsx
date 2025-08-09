import React from 'react'
import { Link } from 'react-router-dom';
import {arrow} from '../assets/icons'

const InfoBox = ({ text, link, btnText }) => (
    <div className='sm:text-xl sm:leading-snug text-center bg-blue-500/30 backdrop-blur-sm rounded-lg py-4 px-8 text-white mx-5 border border-blue-400/50 relative'>
        <p className='font-medium'>{text}</p>
        <Link to={link} className='font-medium mt-4 text-sm px-2 py-1 inline-flex items-center bg-[#00ff00]/30 backdrop-blur-sm rounded-lg border border-[#00ff00]/50 hover:bg-[#00ff00]/40 transition-colors absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-black'>
            {btnText}
            <img src={arrow} className='w-3 h-3 object-contain ml-1'/>
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center bg-blue-500/30 backdrop-blur-sm rounded-lg py-4 px-8 text-white mx-5 border border-blue-400/50'>
            Namaste! I am <span className='font-semibold'>Adriza</span>👋
            <br/>
            A Software Engineer from India
        </h1>
    ),
    2: (
        <InfoBox 
            text="Worked with many companies and picked up many skills along the way"
            link="/about"
            btnText="Nice to meet you! Learn more"
        />
    ),
    3: (
        <InfoBox 
            text="Led multiple products over the years. Curious about the impact?"
            link="/projects"
            btnText="Visit my portfolio"
        />
    ),
    4: (
        <InfoBox 
            text="Need some work done or looking for a dev? I'm a few keystrokes away :)"
            link="/contact"
            btnText="Let's talk!"
        />
    ),
}

const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] || null; 
}

export default HomeInfo