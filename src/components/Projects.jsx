import React, { useState } from 'react'
import Card from './Card'
import Modal from './Modal'
import project1 from '../assets/projects/Project1.png'
import project2 from '../assets/projects/Project2.png'
import project3 from '../assets/projects/Project3.png'
import project4 from '../assets/projects/Project4.png'

import HTML from "../assets/stack/HTML.png"
import CSS from "../assets/stack/CSS.png"
import tailwind from "../assets/stack/Tailwind.png"
import Js from "../assets/stack/Javascript.svg"
import ts from '../assets/stack/Typescript.svg'
import react from "../assets/stack/React.png"
import redux from "../assets/stack/Redux.svg"
import vite from '../assets/skills/vite.png'
import axios from '../assets/skills/axios.png'
import reactform from '../assets/skills/form.svg'
import zod from '../assets/skills/zod.png'
// import chart from '../assets/stack/Chartjs.svg'
import nextCircle from "../assets/stack/NextJsCircle.png"
import node from "../assets/stack/NodeJs.svg"
import nodemon from '../assets/skills/nodemon.png'
import express from "../assets/stack/Express.png"
import mongo from "../assets/stack/MongoDB.svg"
import cloudinary from '../assets/skills/cloudinary.jpg'
import razorpay from '../assets/skills/Razorpay.svg'
import swagger from '../assets/skills/swagger.png'
import socket from '../assets/skills/socket.png'
import firebase from '../assets/skills/firebase.png'
import git from "../assets/stack/Git.svg"
import github from "../assets/stack/Github.svg"

const Projects = () => {

    const [showC1, setShowC1] = useState(false);
    const [showC2, setShowC2] = useState(false);
    const [showC3, setShowC3] = useState(false);
    const [showC4, setShowC4] = useState(false);

    return (
        <section className=' lg:-my-6 bg-[#e7e7e7] flex flex-col items-center justify-center w-full mt-60' id='projects'>
            <h1 className='text-[#ff4500] text-[90px] text-center'>Projects</h1>
            <div className='lg:max-w-[1200px] w-full mx-auto lg:p-12 flex flex-col p-4 gap-32'>
                <Card
                    background={project1}
                    tech={[HTML, CSS, tailwind, ts, nextCircle, redux, zod, node, express, mongo, razorpay, cloudinary]}
                    title={"Study Notion"}
                    desc={"Its a modern Ed-tech platform for teachers and students"}
                    number={"01"}
                    github={"https://github.com/krishna4040/study-notion"}
                    link={"https://study-notion-ten-snowy.vercel.app/"}
                    align={"right"}
                    setShow={setShowC1}
                />
                <Card
                    background={project2}
                    tech={[HTML, CSS, Js, react, redux, vite, node, express, mongo, socket, swagger]}
                    title={"Together"}
                    desc={"A platform for real time messaging audio and video call"}
                    number={"02"}
                    align={"left"}
                    setShow={setShowC2}
                    link={"https://together-social-media.netlify.app/"}
                    github={"https://github.com/krishna4040/Together"}
                />
                <Card
                    background={project3}
                    tech={[HTML, CSS, Js, react, redux, vite, axios, reactform, node, express, nodemon, firebase]}
                    title={"Recyclez"}
                    number={"03"}
                    align={"right"}
                    desc={"It is a waste Redistribution System"}
                    setShow={setShowC3}
                    github={"https://github.com/krishna4040/Recyclez"}
                />
                <Card
                    background={project4}
                    tech={[HTML, CSS, Js, vite, tailwind, git, github]}
                    title={"Dev Detectives"}
                    number={"04"}
                    align={"left"}
                    desc={"This is a modern web app that uses github api to fetch user accounts and details"}
                    setShow={setShowC4}
                    github={"https://github.com/krishna4040/dev-detective"}
                    link={"https://github-profile-get.netlify.app/"}
                />
            </div>
            {showC1 && <Modal link={""} title={"Study Notion"} content={"🚀 Dive into Study Notion – the super cool, all-in-one education platform that totally changes how we learn and teach! 📚 It's like magic for education, using the MERN tech stack to make learning smooth, efficient, and loads of fun! 🌟✨ #StudyNotion #LearningRevolution"} show={showC1} setShow={setShowC1} />}
            {showC3 && <Modal link={""} title={"Recyclez"} content={"♻️ Get ready for Recylez – the awesome waste redistribution system made with the super cool MERN stack! 🌐 It's here to tackle waste in small areas, big organizations, and team up with NGOs in bustling cities. 🏙️ Log in, and boom! You're either a waste supplier or a waste receiver, making waste redistribution a breeze! 🔄🌍 #Recylez #WasteWarrior"} show={showC3} setShow={setShowC3} />}
            {showC4 && <Modal link={"https://github-profile-get.netlify.app/"} title={"Dev Detectives"} content={"This is a modern web app that uses github api to fetch user accounts and details"} show={showC4} setShow={setShowC4} />}
            {showC2 && <Modal link={"https://together-social-media.netlify.app/"} title={"Together"} content={"🌐 Welcome to the latest social media sensation! 🚀 It's got everything – posts, chats, and even audio and video calls! 📱💬 Plus, stay connected with your pals in the coolest way. 🤝 Thanks to the magic of WebRTC, real-time communication is at your fingertips! 🎉🔗 #SocialMediaVibes #WebRTCmagic"} show={showC2} setShow={setShowC2} />}
        </section>
    )
}

export default Projects