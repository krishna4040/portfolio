import React, { useState } from "react"
import { projectsAPI } from "../../services/api"

const ProjectForm = ({
  onProjectCreated,
  editProject = null,
  onCancel = null,
}) => {
  const [formData, setFormData] = useState({
    title: editProject?.title || "",
    description: editProject?.description || "",
    longDescription: editProject?.longDescription || "",
    githubUrl: editProject?.githubUrl || "",
    liveUrl: editProject?.liveUrl || "",
    imageUrl: editProject?.imageUrl || "",
    technologies: editProject?.technologies || [],
    isFeatured: editProject?.isFeatured || false,
    isVisible:
      editProject?.isVisible !== undefined ? editProject.isVisible : true,
  })
  const [techInput, setTechInput] = useState({ name: "", icon: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleTechChange = (e) => {
    setTechInput({
      ...techInput,
      [e.target.name]: e.target.value,
    })
  }

  const addTechnology = () => {
    if (techInput.name && techInput.icon) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, { ...techInput }],
      })
      setTechInput({ name: "", icon: "" })
    }
  }

  const removeTechnology = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (editProject) {
        await projectsAPI.updateProject(editProject._id, formData)
      } else {
        await projectsAPI.createProject(formData)
      }
      onProjectCreated()
      if (!editProject) {
        setFormData({
          title: "",
          description: "",
          longDescription: "",
          githubUrl: "",
          liveUrl: "",
          imageUrl: "",
          technologies: [],
          isFeatured: false,
          isVisible: true,
        })
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow transition-colors duration-300 dark:bg-gray-700">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        {editProject ? "Edit Project" : "Add New Project"}
      </h2>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 dark:border-red-600 dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Live URL
            </label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Long Description
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows={5}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Technologies
          </label>
          <div className="mb-2 flex gap-2">
            <input
              type="text"
              name="name"
              placeholder="Technology name"
              value={techInput.name}
              onChange={handleTechChange}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <input
              type="text"
              name="icon"
              placeholder="Icon Key"
              value={techInput.icon}
              onChange={handleTechChange}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <span
                key={index}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                {tech.name}
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="mr-2"
            />
            Featured Project
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
              className="mr-2"
            />
            Visible
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-orange-600 px-6 py-2 text-white transition-colors duration-300 hover:bg-orange-700 disabled:opacity-50 dark:bg-[#ff6b35] dark:hover:bg-[#ff4500]"
          >
            {loading
              ? "Saving..."
              : editProject
                ? "Update Project"
                : "Create Project"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-gray-600 px-6 py-2 text-white transition-colors duration-300 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
