import React from 'react'
import { BsGithub } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { FaTwitter } from 'react-icons/fa'
import { AiFillLinkedin } from 'react-icons/ai'
import { FcDocument } from 'react-icons/fc'

const handles = [
    "https://github.com/krishna4040",
    "https://www.linkedin.com/in/krishna-jain-842539205/",
    "https://twitter.com/krishna5048",
    "https://www.instagram.com/_its__krish_/",
    'https://portfolio-mailing.onrender.com/api/download'
]

const Footer = () => {
    return (
        <footer className='relative bg-[#343d68] lg:p-20 px-10 py-20 w-full overflow-hidden'>
            <div className='flex flex-col items-center justify-between gap-4 lg:flex-wrap lg:items-center lg:flex-row'>
                <ul className='flex gap-5 lg:justify-between lg:flex-wrap'>
                    <li><a href='#projects' className='text-white text-xl hover:text-[#ff4500] transition-all duration-200'>Projects</a></li>
                    <li><a href='#skills' className='text-white text-xl hover:text-[#ff4500] transition-all duration-200'>Skills</a></li>
                    <li><a href='#contact' className='text-white text-xl hover:text-[#ff4500] transition-all duration-200'>Contact Me</a></li>
                </ul>
                <div className='flex gap-5 lg:gap-4 lg:flex-wrap'>
                    <a href={handles[0]} target='_blank'><BsGithub className='cursor-pointer text-white text-4xl transition-all duration-300 hover:text-[#ff4500]' /></a>
                    <a href={handles[3]} target='_blank'><BsInstagram className='cursor-pointer text-white text-4xl transition-all duration-300 hover:text-[#ff4500]' /></a>
                    <a href={handles[2]} target='_blank'><FaTwitter className='cursor-pointer text-white text-4xl transition-all duration-300 hover:text-[#ff4500]' /></a>
                    <a href={handles[1]} target='_blank'><AiFillLinkedin className='cursor-pointer text-white text-4xl transition-all duration-300 hover:text-[#ff4500]' /></a>
                    <span className='tooltip bw top' data-tooltip="Download Resume"><a href={handles[4]} target='_blank'><FcDocument className='cursor-pointer text-white text-4xl transition-all duration-300 hover:text-[#ff4500]' /></a></span>
                </div>
                <span className='absolute left-0 bottom-0 text-[#535c87] text-7xl select-none -z-10'>Krishna Jain</span>
            </div>
        </footer>
    )
}

export default Footer