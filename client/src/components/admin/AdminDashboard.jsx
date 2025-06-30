import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { projectsAPI, authAPI } from "../../services/api"
import ProjectForm from "./ProjectForm"
import ProjectList from "./ProjectList"
import GithubRepos from "./GithubRepos"
import AboutForm from "./AboutForm"
import SkillsManager from "./SkillsManager"
import WorkExperienceManager from "./WorkExperienceManager"
import ContactInfoForm from "./ContactInfoForm"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects")
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
    fetchProjects()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      navigate("/admin")
      return
    }

    try {
      const response = await authAPI.getProfile()
      setAdmin(response.data.admin)
    } catch (error) {
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminData")
      navigate("/admin")
    }
  }

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getAllProjectsAdmin()
      setProjects(response.data.projects)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminData")
    navigate("/admin")
  }

  const handleProjectCreated = () => {
    fetchProjects()
    setActiveTab("projects")
  }

  const handleProjectUpdated = () => {
    fetchProjects()
  }

  const handleProjectDeleted = () => {
    fetchProjects()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {admin?.username}</span>
              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("projects")}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === "projects"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("add-project")}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === "add-project"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Add Project
            </button>
            <button
              onClick={() => setActiveTab("github")}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === "github"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              GitHub Repos
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === "about"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === "skills"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === "experience"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === "contact"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Contact Info
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === "projects" && (
            <ProjectList
              projects={projects}
              onProjectUpdated={handleProjectUpdated}
              onProjectDeleted={handleProjectDeleted}
            />
          )}
          {activeTab === "add-project" && (
            <ProjectForm onProjectCreated={handleProjectCreated} />
          )}
          {activeTab === "github" && (
            <GithubRepos onProjectCreated={handleProjectCreated} />
          )}
          {activeTab === "about" && <AboutForm />}
          {activeTab === "skills" && <SkillsManager />}
          {activeTab === "experience" && <WorkExperienceManager />}
          {activeTab === "contact" && <ContactInfoForm />}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
