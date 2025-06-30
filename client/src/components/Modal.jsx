import React from "react"

const Modal = ({ show, setShow, content, title, link }) => {
  return (
    <div>
      <label className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm"></label>
      <div
        className={`modal show pause-scroll bg flex w-full flex-col gap-5 bg-cover lg:w-[400px] ${show ? "show" : null}`}
      >
        <button
          className="absolute right-4 top-3"
          onClick={() => {
            setShow(false)
          }}
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold">{title}</h2>
        <span>{content}</span>
        <div className="flex gap-3">
          <button className="btn solid danger flex-1">
            <a href={link} target="_blank" rel="noreferrer">
              Visit
            </a>
          </button>
          <button
            className="btn solid bw flex-1"
            onClick={() => {
              setShow(false)
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
