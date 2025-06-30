import React from "react"
import { Link, useLocation } from "react-router-dom"
import kLogo from "../assets/userAsset/k.png"
import { BsFillMoonFill, BsSunFill } from "react-icons/bs"

const Navbar = ({ isDark, setIsDark }) => {
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  return (
    <nav className="flex w-full flex-col items-center justify-between p-4 lg:flex-row">
      <div className="relative w-full">
        <Link to="/">
          <img src={kLogo} alt="K" className="w-24" />
          <span className="absolute left-16 top-7 w-full text-[28px]">
            rishna Jain
          </span>
        </Link>
      </div>

      <ul className="flex w-full items-center justify-end gap-7 text-right">
        {isHomePage ? (
          <>
            <li>
              <a
                href="#projects"
                className="text-xl transition-all duration-200 hover:text-[#ff4500]"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="text-xl transition-all duration-200 hover:text-[#ff4500]"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-xl transition-all duration-200 hover:text-[#ff4500]"
              >
                Contact Me
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/"
                className="text-xl transition-all duration-200 hover:text-[#ff4500]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="text-xl transition-all duration-200 hover:text-[#ff4500]"
              >
                All Projects
              </Link>
            </li>
          </>
        )}
        <li
          className="text-xl transition-all duration-200 hover:text-[#ff4500]"
          onClick={() => {
            setIsDark((prev) => !prev)
          }}
        >
          {isDark ? <BsSunFill /> : <BsFillMoonFill />}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
