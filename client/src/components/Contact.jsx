import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import Button from "./Button"
import axios from "axios"
import { RiSendPlaneFill } from "react-icons/ri"

const Contact = () => {
  const form = useForm()
  const { register, reset, handleSubmit, formState } = form
  const { errors, isSubmitSuccessful } = formState

  useEffect(() => {
    isSubmitSuccessful ? reset() : null
  }, [isSubmitSuccessful])

  const sumbitHandler = (data) => {
    const { name, email, subject, message } = data
    try {
      const response = axios.post(
        "https://portfolio-mailing.onrender.com/api/createEntry",
        {
          name,
          email,
          subject,
          message,
        },
      )
      if (!response) {
        throw new Error("Api call failed")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section id="contact" className="-mt-4 w-full bg-[#e7e7e7] p-10">
      <div>
        <h2 className="text-5xl capitalize text-[#ff4500] lg:ml-20 lg:p-8 lg:text-7xl">
          Contact Me
        </h2>
        <p className="ml-1 text-sm capitalize lg:ml-28 lg:text-5xl">
          Questions , Thoughts , Or Just Want To Say Hello
        </p>
        <form
          noValidate
          onSubmit={handleSubmit(sumbitHandler)}
          className="mx-20 my-8 flex w-full flex-col justify-center gap-10 lg:gap-0"
        >
          <input
            className="-ml-20 h-10 w-full px-4 py-0 text-lg font-medium shadow-md lg:m-7 lg:ml-7 lg:w-[1200px] lg:px-8"
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: true })}
          />
          <input
            className="-ml-20 h-10 w-full px-4 py-0 text-lg font-medium shadow-md lg:m-7 lg:ml-7 lg:w-[1200px] lg:px-8"
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: true })}
          />
          <input
            className="-ml-20 h-10 w-full px-4 py-0 text-lg font-medium shadow-md lg:m-7 lg:ml-7 lg:w-[1200px] lg:px-8"
            type="text"
            placeholder="Enter Your Subject"
            {...register("subject", { required: true })}
          />
          <textarea
            className="-ml-20 h-auto w-full px-4 py-0 pt-4 text-lg font-medium shadow-md lg:m-7 lg:ml-7 lg:w-[1200px] lg:px-8"
            cols="30"
            rows="10"
            placeholder="Enter Your Message"
            {...register("message", { required: true })}
          ></textarea>
          <button className='relative z-10 -ml-20 flex w-fit items-center justify-center gap-3 bg-[#ff4500] px-9 py-3 text-2xl text-white shadow-lg transition-all duration-700 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-[-1] before:origin-left before:scale-x-0 before:bg-white before:transition-all before:duration-700 before:content-[""] hover:scale-90 hover:bg-white hover:text-black before:hover:scale-x-100 lg:ml-7'>
            <p>Send Message</p>
            <RiSendPlaneFill />
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
