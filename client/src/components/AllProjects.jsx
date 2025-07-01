import React, { useState, useEffect } from "react"
import { projectsAPI } from "../services/api"
import Card from "./Card"
import Modal from "./Modal"

const AllProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await projectsAPI.getAllProjects()
      setProjects(response.data.projects || [])
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError(
        `Failed to fetch projects: ${err.response?.data?.message || err.message}`,
      )
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (project) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e7e7e7] transition-colors duration-300 dark:bg-gray-800">
        <div className="text-2xl text-[#ff4500] dark:text-[#ff6b35]">
          Loading projects...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center bg-[#e7e7e7] px-4 transition-colors duration-300 dark:bg-gray-800">
        <h1 className="mb-8 text-center text-[90px] text-[#ff4500] dark:text-[#ff6b35]">
          All Projects
        </h1>
        <div className="text-center">
          <div className="mb-4 text-2xl text-red-600 dark:text-red-400">
            Error loading projects:
          </div>
          <div className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            {error}
          </div>
          <button
            onClick={fetchProjects}
            className="rounded-lg bg-[#ff4500] px-6 py-3 text-xl font-semibold text-white transition-colors duration-300 hover:bg-[#e03d00] dark:bg-[#ff6b35] dark:hover:bg-[#ff4500]"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="flex w-full flex-col items-center justify-center bg-[#e7e7e7] pb-16 pt-32 transition-colors duration-300 lg:-my-6 dark:bg-gray-800">
      <h1 className="mb-8 text-center text-[90px] text-[#ff4500] dark:text-[#ff6b35]">
        All Projects
      </h1>
      <div className="mx-auto flex w-full flex-col gap-32 p-4 lg:max-w-[1200px] lg:p-12">
        {projects.length === 0 ? (
          <div className="text-center text-2xl text-gray-600 dark:text-gray-300">
            <p>No projects found.</p>
            <p className="mt-2 text-lg">
              Please check the admin panel to add projects.
            </p>
          </div>
        ) : (
          projects.map((project, index) => (
            <Card
              key={project._id}
              background={project.imageUrl || "/default-project.png"}
              tech={project.technologies.map((tech) => ({
                src: tech.icon,
                alt: tech.name,
              }))}
              title={project.title}
              desc={project.description}
              number={String(index + 1).padStart(2, "0")}
              github={project.githubUrl}
              link={project.liveUrl}
              align={index % 2 === 0 ? "right" : "left"}
              setShow={() => handleShowModal(project)}
            />
          ))
        )}
      </div>

      {showModal && selectedProject && (
        <Modal
          link={selectedProject.liveUrl}
          title={selectedProject.title}
          content={
            selectedProject.longDescription || selectedProject.description
          }
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </section>
  )
}

export default AllProjects
