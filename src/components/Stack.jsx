import React, { useLayoutEffect, useRef } from 'react'

import HTML from "../assets/stack/HTML.png"
import CSS from "../assets/stack/CSS.png"
import tailwind from "../assets/stack/Tailwind.png"
import Js from "../assets/stack/Javascript.svg"
import typescript from "../assets/stack/Typescript.svg"
import react from "../assets/stack/React.png"
import redux from "../assets/stack/Redux.svg"
import next from "../assets/stack/Next.svg"
import node from "../assets/stack/NodeJs.svg"
import express from "../assets/stack/Express.png"
import mongo from "../assets/stack/MongoDB.svg"
import vercel from "../assets/stack/Vercel.svg"
import git from "../assets/stack/Git.svg"
import github from "../assets/stack/Github.svg"

import socket from '../assets/skills/socket.png'
import redis from '../assets/skills/redis.svg'
import nginix from '../assets/skills/nginix.svg'
import kafka from '../assets/skills/kafka.png'
import firebase from '../assets/skills/firebase.png'
import vite from '../assets/skills/vite.png'

import blob from '../assets/userAsset/blobvector.png'

import { gsap } from 'gsap'

const arr = [
    HTML, CSS, tailwind, Js, typescript, react,
    redux, next, vite, vercel, node, express, mongo, socket, firebase, redis,
    nginix, kafka, git, github
];

const Stack = () => {

    const blobRef = useRef(null);
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(blobRef.current, {}, {
                top: '54%',
                left: '56%',
                repeat: -1,
                yoyo: true
            })
        })
        return () => ctx.revert();
    }, [])

    return (
        <section className='relative flex flex-col w-full gap-8 p-4 my-40 lg:p-20 lg:flex-row ' id='skills'>
            <div className='flex flex-col w-full lg:w-1/2'>
                <h4 className='text-5xl font-semibold text-[#ff4500]'><span className='text-8xl'>M</span>e and <br /> My Tech Stack</h4>
                <div className='w-full mt-4 text-justify lg:w-5/6'>
                    <p className='m-4'>
                        <em>Hello there!</em> 👋 I'm Krishna Jain, a full stack Web-developer on a mission to craft user-centric and robust applications. Currently navigating the challenging seas of BE(IT) at UIET, Panjab University, I specialize in the MERN stack and have a knack for Next.js and Typescript - the dynamic duo demanded by today's tech realm.
                    </p>
                    <p className='m-4'>
                        I'm not just a developer; I'm a part-time freelancer and a full-time learner. As I'm delving into the fascinating world of DevOps and the cloud, I'm constantly on the lookout for the next big thing in tech. I get my kicks from collaborating on real-world projects that have the power to make a difference. 💡
                    </p>
                    <p className='m-4'>
                        Ready to turn ideas into reality, I bring a blend of creativity and precision to the code game. Let's build something amazing together, shall we? 😉
                    </p>
                </div>

            </div>
            <div className='relative flex flex-wrap justify-center lg:w-[40%] w-full gap-8'>
                {
                    arr.map((icon, index) => {
                        return <img src={icon} alt="tech" key={index} className='lg:w-[85px] w-20 transition-all duration-500 hover:scale-125' />
                    })
                }
                <img ref={blobRef} src={blob} alt="blob" className='absolute top-1/2 left-1/2 z-[-1] translate-x-[-50%] translate-y-[-50%]' />
            </div>
            <span className='absolute text-[14rem] font-semibold select-none bottom-[-31.5%] right-3 text-[#e7e7e7] hidden lg:block'>Skills</span>
        </section>
    )
}

export default Stack