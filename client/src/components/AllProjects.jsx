import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../services/api';
import Card from './Card';
import Modal from './Modal';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsAPI.getAllProjects();
      setProjects(response.data.projects || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(`Failed to fetch projects: ${err.response?.data?.message || err.message}`);
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
      <div className="min-h-screen flex items-center justify-center bg-[#e7e7e7]">
        <div className="text-2xl text-[#ff4500]">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#e7e7e7] px-4">
        <h1 className="text-[#ff4500] text-[90px] text-center mb-8">All Projects</h1>
        <div className="text-center">
          <div className="text-2xl text-red-600 mb-4">Error loading projects:</div>
          <div className="text-lg text-gray-700 mb-6">{error}</div>
          <button 
            onClick={fetchProjects}
            className="bg-[#ff4500] text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-[#e03d00] transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="lg:-my-6 bg-[#e7e7e7] flex flex-col items-center justify-center w-full pt-32 pb-16">
      <h1 className="text-[#ff4500] text-[90px] text-center mb-8">All Projects</h1>
      <div className="lg:max-w-[1200px] w-full mx-auto lg:p-12 flex flex-col p-4 gap-32">
        {projects.length === 0 ? (
          <div className="text-center text-2xl text-gray-600">
            <p>No projects found.</p>
            <p className="text-lg mt-2">Please check the admin panel to add projects.</p>
          </div>
        ) : (
          projects.map((project, index) => (
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
          ))
        )}
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
  );
};

export default AllProjects;