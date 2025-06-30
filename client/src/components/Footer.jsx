import React from "react"
import { BsGithub } from "react-icons/bs"
import { BsInstagram } from "react-icons/bs"
import { FaTwitter } from "react-icons/fa"
import { AiFillLinkedin } from "react-icons/ai"
import { FcDocument } from "react-icons/fc"

const handles = [
  "https://github.com/krishna4040",
  "https://www.linkedin.com/in/krishna-jain-842539205/",
  "https://twitter.com/krishna5048",
  "https://www.instagram.com/_its__krish_/",
  "https://portfolio-mailing.onrender.com/api/download",
]

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#343d68] px-10 py-20 lg:p-20">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:flex-wrap lg:items-center">
        <ul className="flex gap-5 lg:flex-wrap lg:justify-between">
          <li>
            <a
              href="#projects"
              className="text-xl text-white transition-all duration-200 hover:text-[#ff4500]"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="text-xl text-white transition-all duration-200 hover:text-[#ff4500]"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-xl text-white transition-all duration-200 hover:text-[#ff4500]"
            >
              Contact Me
            </a>
          </li>
        </ul>
        <div className="flex gap-5 lg:flex-wrap lg:gap-4">
          <a href={handles[0]} target="_blank" rel="noreferrer">
            <BsGithub className="cursor-pointer text-4xl text-white transition-all duration-300 hover:text-[#ff4500]" />
          </a>
          <a href={handles[3]} target="_blank" rel="noreferrer">
            <BsInstagram className="cursor-pointer text-4xl text-white transition-all duration-300 hover:text-[#ff4500]" />
          </a>
          <a href={handles[2]} target="_blank" rel="noreferrer">
            <FaTwitter className="cursor-pointer text-4xl text-white transition-all duration-300 hover:text-[#ff4500]" />
          </a>
          <a href={handles[1]} target="_blank" rel="noreferrer">
            <AiFillLinkedin className="cursor-pointer text-4xl text-white transition-all duration-300 hover:text-[#ff4500]" />
          </a>
          <span className="tooltip bw top" data-tooltip="Download Resume">
            <a href={handles[4]} target="_blank" rel="noreferrer">
              <FcDocument className="cursor-pointer text-4xl text-white transition-all duration-300 hover:text-[#ff4500]" />
            </a>
          </span>
        </div>
        <span className="absolute bottom-0 left-0 -z-10 select-none text-7xl text-[#535c87]">
          Krishna Jain
        </span>
      </div>
    </footer>
  )
}

export default Footer
