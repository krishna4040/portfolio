import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button'
import axios from 'axios'
import { RiSendPlaneFill } from 'react-icons/ri'

const Contact = () => {

    const form = useForm();
    const { register, reset, handleSubmit, formState } = form;
    const { errors, isSubmitSuccessful } = formState

    useEffect(() => {
        isSubmitSuccessful ? reset() : null
    }, [isSubmitSuccessful]);

    const sumbitHandler = (data) => {
        const { name, email, subject, message } = data;
        try {
            const response = axios.post('https://portfolio-mailing.onrender.com/api/createEntry', {
                name,
                email,
                subject,
                message,
            })
            if (!response) {
                throw new Error("Api call failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section id='contact' className='w-full bg-[#e7e7e7] -mt-4 p-10'>
            <div>
                <h2 className='lg:text-7xl text-5xl text-[#ff4500] capitalize lg:ml-20 lg:p-8'>Contact Me</h2>
                <p className='ml-1 text-sm capitalize lg:text-5xl lg:ml-28'>Questions , Thoughts , Or Just Want To Say Hello</p>
                <form noValidate onSubmit={handleSubmit(sumbitHandler)} className='flex flex-col justify-center w-full gap-10 mx-20 my-8 lg:gap-0'>
                    <input className='w-full -ml-20 lg:ml-7 h-10 py-0 text-lg font-medium shadow-md lg:w-[1200px] lg:px-8 lg:m-7 px-4' type="text" placeholder='Enter Your Name' {...register("name", { required: true })} />
                    <input className='w-full -ml-20 lg:ml-7 h-10 py-0 text-lg font-medium shadow-md lg:w-[1200px] lg:px-8 lg:m-7 px-4' type="email" placeholder='Enter Your Email' {...register("email", { required: true })} />
                    <input className='w-full -ml-20 lg:ml-7 h-10 py-0 text-lg font-medium shadow-md lg:w-[1200px] lg:px-8 lg:m-7 px-4' type="text" placeholder='Enter Your Subject' {...register("subject", { required: true })} />
                    <textarea className='w-full -ml-20 lg:ml-7 h-auto lg:px-8 px-4 py-0 pt-4 text-lg font-medium shadow-md lg:w-[1200px] lg:m-7' cols="30" rows="10" placeholder='Enter Your Message' {...register("message", { required: true })}></textarea>
                    <button className='bg-[#ff4500] py-3 px-9 hover:bg-white transition-all duration-700 relative shadow-lg z-10 text-white
                    before:content-[""] before:absolute before:bg-white before:top-0 before:right-0 before:left-0 before:bottom-0 before:z-[-1]
                    before:origin-left before:transition-all before:duration-700 before:scale-x-0 before:hover:scale-x-100
                    hover:text-black w-fit flex items-center justify-center gap-3 hover:scale-90 text-2xl -ml-20 lg:ml-7'>
                        <p>Send Message</p>
                        <RiSendPlaneFill />
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact