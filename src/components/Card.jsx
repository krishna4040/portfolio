import React from 'react'
import Button from './Button'
import { FaGithub } from 'react-icons/fa'
import { BiLink } from 'react-icons/bi'


const Card = ({ tech, title, desc, learn, background, align, number, github, link, setShow }) => {
    return (
        <div className={`shadow-2xl bg-cover lg:w-[90%] w-full lg:h-[500px] h-[300px] mx-auto flex items-center justify-center relative group
                after:content-[""] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-[#1f1f1f9a] after:z-0
                before:content-[""] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:scale-0 before:hover:scale-100 before:z-10
                before:origin-top-left before:transition-all before:duration-500 before:bg-gradient-to-br before:from-[#343d68] before:via-[#343d68be] before:to-[#343d687c]
                ${align === 'left' ? 'lg:ml-32' : ''}`}
            style={{ backgroundImage: `url(${background})` }}>

            <div className={`absolute text-white text-[200px] font-semibold z-[15] opacity-0 group-hover:opacity-100 ${align === 'right' ? 'right-[-45px] top-[-110px]' : 'left-[-45px] top-[-110px]'} hidden lg:block`}>
                {number}
            </div>

            <div className='z-20 flex flex-col gap-4 lg:p-8 p-6 transition-all duration-500 scale-50 lg:group-hover:scale-110 group-hover:scale-[0.65] lg:w-fit w-full lg:scale-100'>
                <div className='flex flex-wrap w-full lg:w-3/5'>
                    {
                        tech.map((icon, index) => <img src={icon} alt="tech" key={index} width={39} className={`m-[10px]`} />)
                    }
                </div>
                <h3 className='text-5xl leading-[3rem] text-white font-semibold'>{title}</h3>
                <p className='italic text-white lg:w-[70%] w-full'>{desc}</p>
                <div className='flex items-center gap-4'>
                    <Button text={"Read More"} border={0} setShow={setShow} />
                    <a href={github} target='_blank'><FaGithub className='text-4xl cursor-pointer text-white transition-all duration-500 hover:text-[#ff4500]' /></a>
                    <a href={link} target='_blank'><BiLink className='text-4xl cursor-pointer text-white transition-all duration-500 hover:text-[#ff4500]' /></a>
                </div>
            </div>
        </div>
    )
}

export default Card