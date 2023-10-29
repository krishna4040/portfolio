import React, { useLayoutEffect, useRef } from 'react'

import HTML from "../assets/stack/HTML.png"
import CSS from "../assets/stack/CSS.png"
import tailwind from "../assets/stack/Tailwind.png"
import bootstrap from "../assets/stack/Bootstrap.svg"
import material from "../assets/stack/MaterialUI.svg"
import Js from "../assets/stack/Javascript.svg"
import typescript from "../assets/stack/Typescript.svg"
import react from "../assets/stack/React.png"
import redux from "../assets/stack/Redux.svg"
import next from "../assets/stack/Next.svg"
import node from "../assets/stack/NodeJs.svg"
import express from "../assets/stack/Express.png"
import mongo from "../assets/stack/MongoDB.svg"
import chart from "../assets/stack/Chartjs.svg"
import graphql from "../assets/stack/Graphql.svg"
import vercel from "../assets/stack/Vercel.svg"
import bash from "../assets/stack/Bash.svg"
import docker from "../assets/stack/Docker.svg"
import git from "../assets/stack/Git.svg"
import github from "../assets/stack/Github.svg"

import blob from '../assets/userAsset/blobvector.png'

import {gsap} from 'gsap'

const arr = [
    HTML, CSS, tailwind, bootstrap, material, Js, typescript, react,
    redux, next, node, express, mongo, vercel, git, github
];

const Stack = () => {

    const blobRef = useRef(null);
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(blobRef.current,{},{
                top: '54%',
                left: '56%',
                repeat: -1,
                yoyo: true
            })
        })
        return () => ctx.revert();
    },[])

    return (
        <section className='relative flex flex-col w-full gap-8 p-4 my-40 lg:p-20 lg:flex-row ' id='skills'>
            <div className='flex flex-col w-full lg:w-1/2'>
                <h4 className='text-5xl font-semibold text-[#ff4500]'><span className='text-8xl'>M</span>e and <br /> My Tech Stack</h4>
                <div className='w-full mt-4 text-justify lg:w-5/6'>
                    <p className='m-4'>Hello there! I'm Krishna Jain, a passionate technologist with a knack for turning ideas into powerful digital solutions. I'm currently pursuing my BE(IT) at UIET , Panjab University, I've honed my skills in crafting elegant, efficient, and user-centric applications. My journey in the tech world has led me to specialize in the MERN (MongoDB, Express, React, Node.js) stack and an array of JavaScript libraries.</p>
                    <p className='m-4'>I'm excited to connect with fellow professionals who share a passion for technology and innovation. Let's explore how my proficiency in the MERN stack and JavaScript libraries can elevate your team's projects to new heights. Feel free to reach out, and let's embark on a journey of technological excellence together!"</p>
                </div>
            </div>
            <div className='relative flex flex-wrap justify-center lg:w-[40%] w-full gap-8'>
                {
                    arr.map((icon, index) => {
                        return <img src={icon} alt="tech" key={index} width={85} className='transition-all duration-500 hover:scale-125' />
                    })
                }
                <img ref={blobRef} src={blob} alt="blob" className='absolute top-1/2 left-1/2 z-[-1] translate-x-[-50%] translate-y-[-50%]' />
            </div>
            <span className='absolute text-[15rem] font-semibold select-none bottom-[-35.5%] right-3 text-[#e7e7e7] hidden lg:block'>Skills</span>
        </section>
    )
}

export default Stack