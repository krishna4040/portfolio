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
import bootstrap from "../assets/stack/Bootstrap.svg"
import material from "../assets/stack/MaterialUI.svg"
import Js from "../assets/stack/Javascript.svg"
import typescript from "../assets/stack/Typescript.svg"
import react from "../assets/stack/React.png"
import redux from "../assets/stack/Redux.svg"
import next from "../assets/stack/Next.svg"
import nextCircle from "../assets/stack/NextJsCircle.png"
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
import k8s from "../assets/stack/K8s.svg"

const landing = [
    { id: 1, title: "Parallax Effect", github: "https://github.com/krishna4040/Blog-website", link: "https://parallax-effect-demand.netlify.app/" },
    { id: 2, title: "Acme Rockets", github: "https://github.com/krishna4040/acme-rocket", link: "https://acme-grp.netlify.app/" },
    { id: 3, title: "Retro landing", github: "https://github.com/krishna4040/retro", link: "https://retro-landing.netlify.app/" },
    { id: 4, title: "Magma", github: "https://github.com/krishna4040/magma", link: "https://magma-animated.netlify.app/" },
    { id: 5, title: "Mordern Chair", github: "https://github.com/krishna4040/Modern-chair", link: "https://featured-chair.netlify.app/" },
    { id: 6, title: "Food Delivery", github: "", link: "" }
];

const utility = [
    { id: 1, title: "Password Generator", github: "https://github.com/krishna4040/Password-Generator", link: "https://randomized-password-generator.netlify.app/" },
    { id: 2, title: "Weather App", github: "https://github.com/krishna4040/Weather-app", link: "" },
    { id: 3, title: "Dev Detectives", github: "https://github.com/krishna4040/dev-detective", link: "https://github-profile-get.netlify.app/" },
    { id: 4, title: "Tic Tac Toe", github: "https://github.com/krishna4040/tic-tac-toe", link: "https://ttt-play.netlify.app/" },
    { id: 5, title: "Image Gallery", github: "https://github.com/krishna4040/ImageGallery", link: "https://collection-images.netlify.app/" },
]

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
                    tech={[HTML, CSS, Js, nextCircle, tailwind, react, node, mongo, redux, git, github]}
                    title={"Study Notion"}
                    desc={"Its a full fleged Edtech platform for teachers and students"}
                    number={"01"}
                    github={utility[0].github}
                    link={utility[0].link}
                    align={"right"}
                    setShow={setShowC1}
                />
                <Card
                    background={project2}
                    tech={[HTML, CSS, Js, nextCircle, tailwind, redux, vercel]}
                    title={"Together"}
                    desc={"A platform for real time messaging audio and video call"}
                    number={"02"}
                    align={"left"}
                    setShow={setShowC2}
                />
                <Card
                    background={project3}
                    tech={[HTML, CSS, Js, nextCircle, tailwind, vercel, graphql, k8s]}
                    title={"Recyclez"}
                    number={"03"}
                    align={"right"}
                    desc={"It is a waste Redistribution System"}
                    setShow={setShowC3}
                />
                <Card
                    background={project4}
                    tech={[HTML, CSS, Js, nextCircle, tailwind]}
                    title={"Dev Detectives"}
                    number={"04"}
                    align={"left"}
                    desc={"This is a morden web app that uses github api to fecth user accounts and details"}
                    setShow={setShowC4}
                />
            </div>
            {showC1 && <Modal link={utility[0].link} title={"Study Notion"} content={"Study Notion is a cutting-edge, all-in-one educational technology platform that redefines the way we learn and teach. It's designed to address the modern challenges in education while leveraging the power of MERN technology stack to provide a seamless, efficient, and engaging learning experience."}  show={showC1} setShow={setShowC1} />}
            {showC3 && <Modal link={utility[0].link} title={"Recyclez"} content={"Recylez is a waste redistribution system built using the mern stack. It targets individuals in small area and big organisation and ngos in big cities. it assigns user roles as supplier and receiver at each succesuful login and helps in redistributing waste"}  show={showC3} setShow={setShowC3} />}
            {showC4 && <Modal link={utility[0].link} title={"Dev Detectives"} content={"This is a morden web app that uses github api to fecth user accounts and details"}  show={showC4} setShow={setShowC4} />}
            {showC2 && <Modal link={utility[0].link} title={"Together"} content={"This is a morden social media platform with all the features such as posting , chatting , audio and video calling , connecting with friends. i ve used webRtc to integrate Real time communication features."}  show={showC2} setShow={setShowC2} />}
        </section>
    )
}

export default Projects