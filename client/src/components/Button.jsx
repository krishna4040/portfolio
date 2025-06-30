import React from 'react'

const Button = ({ text, border, className, setShow }) => {
    return (
        <button
            className={`bg-[#ff4500] py-3 px-9 hover:bg-white transition-all duration-700 relative shadow-lg z-10 text-white
                    before:content-[""] before:absolute before:bg-white before:top-0 before:right-0 before:left-0 before:bottom-0 before:z-[-1]
                    before:origin-left before:transition-all before:duration-700 before:scale-x-0 before:hover:scale-x-100
                    ${border ? 'hover:border-[3px]' : 'border-none'} hover:border-[#ff4500] hover:text-black w-fit ${className}`}
            onClick={() => { setShow(true) }}
        >
            {text}
        </button>
    )
}

export default Button