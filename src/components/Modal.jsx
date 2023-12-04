import React from 'react'

const Modal = ({ show, setShow, content, title, link }) => {

    return (
        <div>
            <label className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm"></label>
            <div className={`flex flex-col gap-5 modal show pause-scroll lg:w-[400px] bg bg-cover w-full ${show ? 'show' : null}`}>
                <button className="absolute right-4 top-3" onClick={() => { setShow(false) }}>✕</button>
                <h2 className="text-3xl font-bold">{title}</h2>
                <span>{content}</span>
                <div className="flex gap-3">
                    <button className="flex-1 btn solid danger"><a href={link} target='_blank'>Visit</a></button>
                    <button className="flex-1 btn solid bw" onClick={() => { setShow(false) }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal