import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import Modal from './Modal'
import { projectsAPI } from '../services/api'

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchFeaturedProjects();
    }, []);

    const fetchFeaturedProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await projectsAPI.getFeaturedProjects();
            setProjects(response.data.projects || []);
        } catch (error) {
            console.error('Error fetching featured projects:', error);
            setError(`Failed to fetch featured projects: ${error.response?.data?.message || error.message}`);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    const handleShowModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    if (loading) {
        return (
            <section className='lg:-my-6 bg-[#e7e7e7] flex flex-col items-center justify-center w-full mt-60' id='projects'>
                <h1 className='text-[#ff4500] text-[90px] text-center'>Projects</h1>
                <div className='text-center text-2xl text-gray-600 mt-8'>Loading projects...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className='lg:-my-6 bg-[#e7e7e7] flex flex-col items-center justify-center w-full mt-60' id='projects'>
                <h1 className='text-[#ff4500] text-[90px] text-center'>Projects</h1>
                <div className='text-center text-2xl text-red-600 mt-8'>
                    <p>Error loading projects:</p>
                    <p className='text-lg mt-2'>{error}</p>
                    <button 
                        onClick={fetchFeaturedProjects}
                        className='mt-4 bg-[#ff4500] text-white px-6 py-2 rounded hover:bg-[#e03d00]'
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className='lg:-my-6 bg-[#e7e7e7] flex flex-col items-center justify-center w-full mt-60' id='projects'>
            <h1 className='text-[#ff4500] text-[90px] text-center'>Projects</h1>
            
            {projects.length === 0 ? (
                <div className='text-center text-2xl text-gray-600 mt-8'>
                    <p>No featured projects available.</p>
                    <p className='text-lg mt-2'>Please check the admin panel to add and feature projects.</p>
                </div>
            ) : (
                <div className='lg:max-w-[1200px] w-full mx-auto lg:p-12 flex flex-col p-4 gap-32'>
                    {projects.map((project, index) => (
                        <Card
                            key={project._id}
                            background={project.imageUrl || '/default-project.png'}
                            tech={project.technologies.map(tech => ({ src: tech.icon, alt: tech.name }))}
                            title={project.title}
                            desc={project.description}
                            number={String(index + 1).padStart(2, '0')}
                            github={project.githubUrl}
                            link={project.liveUrl}
                            align={index % 2 === 0 ? 'right' : 'left'}
                            setShow={() => handleShowModal(project)}
                        />
                    ))}
                </div>
            )}

            <div className='mt-16'>
                <Link 
                    to="/projects" 
                    className='bg-[#ff4500] text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-[#e03d00] transition-colors duration-300'
                >
                    View All Projects
                </Link>
            </div>

            {showModal && selectedProject && (
                <Modal
                    link={selectedProject.liveUrl}
                    title={selectedProject.title}
                    content={selectedProject.longDescription || selectedProject.description}
                    show={showModal}
                    setShow={setShowModal}
                />
            )}
        </section>
    )
}

export default Projects