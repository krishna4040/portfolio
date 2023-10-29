import React, { useLayoutEffect, useRef } from 'react'
import Button from './Button'
import pfp from '../assets/userAsset/pfp.jpg'
import circle from '../assets/userAsset/circle.png'
import cube from '../assets/userAsset/cube.png'
import dots from '../assets/userAsset/dots.png'
import plus from '../assets/userAsset/plus.png'
import zigzags from '../assets/userAsset/zigzags.png'
import { gsap } from 'gsap'

const Hero = ({ setIsModel }) => {

    const profile = useRef(null);
    const cubeRef = useRef(null);
    const dotsRef = useRef(null);
    const plusRef = useRef(null);
    const zigzagsRef = useRef(null);
    const circleRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(profile.current, {
                scale: 1
            }, {
                scale: 1.1,
                repeat: -1,
                filter: 'grayScale(1)',
                yoyo: true,
                duration: 1
            })
            gsap.to(cubeRef.current, {
                y: 50,
                rotateY: 360,
                repeat: -1,
                yoyo: true,
                duration: 0.8
            });
            gsap.to(dotsRef.current, {
                y: -20,
                repeat: -1,
                yoyo: true,
                duration: 0.5
            })
            gsap.to(plusRef.current, {
                top: '2%',
                left: '48%',
                repeat: -1,
                yoyo: true,
                duration: 0.5
            })
            gsap.to(zigzagsRef.current, {
                left: '5%',
                top: '2%',
                repeat: -1,
                yoyo: true,
                duration: 0.5
            })
            gsap.to(circleRef.current, {
                left: '5%',
                bottom: '10%',
                repeat: -1,
                yoyo: true,
                duration: 0.5
            })
        })
        return () => ctx.revert();
    }, [])

    return (
        <header className='relative flex flex-col justify-between gap-16 px-4 py-2 mt-16 lg:gap-0 lg:pb-32 lg:px-28 lg:flex-row'>
            <div className='flex flex-col justify-center w-full gap-5'>
                <p className='text-4xl text-[#343d68]'>Hi! Krishna Jain</p>
                <p className='text-4xl text-[#343d68]'>I am a <span className='text-[#4e45d5]'>{"Full Stack Developer"}</span></p>
                <p className='mt-[112px]'>I'm a software developer and here is my portfolio website. Here you'll learn about <br /> my journey as software developer</p>
                <Button text={"Hire Me"} border={1} />
            </div>
            <div className='relative p-10'>
                <img src={pfp} alt="Profile" className='' ref={profile} />
                <img src={circle} alt="circle" className='absolute bottom-0' ref={circleRef} />
                <img src={cube} alt="cube" className='absolute top-0 right-0' ref={cubeRef} />
                <img src={dots} alt="dots" className='absolute bottom-0 right-0' ref={dotsRef} />
                <img src={plus} alt="plus" className='absolute top-0 left-1/2' ref={plusRef} />
                <img src={zigzags} alt="zigzags" className='absolute top-0' ref={zigzagsRef} />
                <span className='absolute lg:-bottom-3 lg:left-2 text-[112px] text-[#e7e7e7] -bottom-64 lg:hidden'>krishna Jain</span>
            </div>
            <span className='absolute lg:-bottom-3 lg:left-2 text-[112px] text-[#e7e7e7] hidden lg:block'>krishna Jain</span>
        </header>
    )
}

export default Hero