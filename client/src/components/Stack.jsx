import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { skillsAPI, aboutAPI } from '../services/api';
import blob from '../assets/userAsset/blobvector.png';

const Stack = () => {
    const [skills, setSkills] = useState([]);
    const [aboutInfo, setAboutInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const blobRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(blobRef.current, {}, {
                top: '54%',
                left: '56%',
                repeat: -1,
                yoyo: true
            })
        })
        return () => ctx.revert();
    }, [])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [skillsResponse, aboutResponse] = await Promise.all([
                skillsAPI.getAllSkills(),
                aboutAPI.getAbout()
            ]);
            
            setSkills(skillsResponse.data.skills || []);
            setAboutInfo(aboutResponse.data.about);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(`Failed to fetch data: ${error.response?.data?.message || error.message}`);
            setSkills([]);
            setAboutInfo(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className='relative flex flex-col w-full gap-8 p-4 my-40 lg:p-20 lg:flex-row' id='skills'>
                <div className='text-center text-2xl text-gray-600'>Loading skills and about info...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className='relative flex flex-col w-full gap-8 p-4 my-40 lg:p-20 lg:flex-row' id='skills'>
                <div className='text-center'>
                    <div className='text-2xl text-red-600 mb-4'>Error loading data:</div>
                    <div className='text-lg text-gray-700 mb-6'>{error}</div>
                    <button 
                        onClick={fetchData}
                        className='bg-[#ff4500] text-white px-6 py-3 rounded-lg hover:bg-[#e03d00]'
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className='relative flex flex-col w-full gap-8 p-4 my-40 lg:p-20 lg:flex-row' id='skills'>
            <div className='flex flex-col w-full lg:w-1/2'>
                <h4 className='text-5xl font-semibold text-[#ff4500]'>
                    <span className='text-8xl'>M</span>e and <br /> My Tech Stack
                </h4>
                <div className='w-full mt-4 text-justify lg:w-5/6'>
                    {aboutInfo ? (
                        <div className='space-y-4'>
                            <p className='m-4'>
                                <em>Hello there!</em> I'm {aboutInfo.name}, {aboutInfo.title.toLowerCase()} on a mission to craft user-centric and robust applications.
                            </p>
                            <p className='m-4'>
                                {aboutInfo.bio}
                            </p>
                            <p className='m-4'>
                                Ready to turn ideas into reality, I bring a blend of creativity and precision to the code game. Let's build something amazing together, shall we?
                            </p>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            <p className='m-4 text-red-600'>
                                No about information available. Please check the admin panel to add your information.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            <div className='relative flex flex-wrap justify-center lg:w-[40%] w-full gap-8'>
                {skills.length > 0 ? (
                    skills.slice(0, 20).map((skill) => (
                        <div key={skill._id} className='group relative'>
                            <img 
                                src={skill.icon} 
                                alt={skill.name}
                                className='lg:w-[85px] w-20 transition-all duration-500 hover:scale-125'
                                onError={(e) => {
                                    e.target.src = '/assets/stack/default.png';
                                }}
                            />
                            <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10'>
                                {skill.name}
                                <div className='absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-800'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center text-gray-600'>
                        <p>No skills available.</p>
                        <p className='text-sm mt-2'>Please check the admin panel to add skills.</p>
                    </div>
                )}
                <img ref={blobRef} src={blob} alt="blob" className='absolute top-1/2 left-1/2 z-[-1] translate-x-[-50%] translate-y-[-50%]' />
            </div>
            <span className='absolute text-[14rem] font-semibold select-none bottom-[-31.5%] right-3 text-[#e7e7e7] hidden lg:block'>Skills</span>
        </section>
    );
}

export default Stack