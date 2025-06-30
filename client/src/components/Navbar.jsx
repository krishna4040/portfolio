import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import kLogo from '../assets/userAsset/k.png'
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs'

const Navbar = ({ isDark, setIsDark }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <nav className='flex flex-col items-center justify-between w-full p-4 lg:flex-row'>
            <div className='relative w-full'>
                <Link to="/">
                    <img src={kLogo} alt="K" className='w-24' />
                    <span className='absolute w-full top-7 left-16 text-[28px]'>rishna Jain</span>
                </Link>
            </div>

            <ul className='flex items-center justify-end w-full text-right gap-7'>
                {isHomePage ? (
                    <>
                        <li><a href='#projects' className='text-xl hover:text-[#ff4500] transition-all duration-200'>Projects</a></li>
                        <li><a href='#skills' className='text-xl hover:text-[#ff4500] transition-all duration-200'>Skills</a></li>
                        <li><a href='#contact' className='text-xl hover:text-[#ff4500] transition-all duration-200'>Contact Me</a></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/" className='text-xl hover:text-[#ff4500] transition-all duration-200'>Home</Link></li>
                        <li><Link to="/projects" className='text-xl hover:text-[#ff4500] transition-all duration-200'>All Projects</Link></li>
                    </>
                )}
                <li className='text-xl hover:text-[#ff4500] transition-all duration-200' onClick={() => { setIsDark(prev => !prev) }}>{isDark ? <BsSunFill /> : <BsFillMoonFill />}</li>
            </ul>

        </nav>
    )
}

export default Navbar