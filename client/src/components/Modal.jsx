import React from "react"

const Modal = ({ show, setShow, content, title, link }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="modal relative flex w-full max-w-md flex-col gap-5 rounded-lg bg-white p-6 shadow-xl transition-colors duration-300 dark:bg-gray-800">
        <button
          className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => {
            setShow(false)
          }}
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold dark:text-white">{title}</h2>
        <span className="dark:text-gray-300">{content}</span>
        <div className="flex gap-3">
          <button className="flex-1 rounded bg-[#ff4500] px-4 py-2 text-white transition-colors duration-300 hover:bg-[#e03d00] dark:bg-[#ff6b35] dark:hover:bg-[#ff4500]">
            <a href={link} target="_blank" rel="noreferrer">
              Visit
            </a>
          </button>
          <button
            className="flex-1 rounded bg-gray-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
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
