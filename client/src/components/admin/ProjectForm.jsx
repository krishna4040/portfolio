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
    shortDescription: editProject?.shortDescription || "",
    longDescription: editProject?.longDescription || "",
    githubUrl: editProject?.githubUrl || "",
    liveUrl: editProject?.liveUrl || "",
    youtubeUrl: editProject?.youtubeUrl || "",
    imageUrl: editProject?.imageUrl || "",
    images: editProject?.images || [],
    videos: editProject?.videos || [],
    features: editProject?.features || [],
    collaborators: editProject?.collaborators || [],
    startDate: editProject?.startDate
      ? new Date(editProject.startDate).toISOString().split("T")[0]
      : "",
    endDate: editProject?.endDate
      ? new Date(editProject.endDate).toISOString().split("T")[0]
      : "",
    status: editProject?.status || "completed",
    technologies: editProject?.technologies || [],
    isFeatured: editProject?.isFeatured || false,
    isVisible:
      editProject?.isVisible !== undefined ? editProject.isVisible : true,
  })
  const [techInput, setTechInput] = useState({ name: "", icon: "" })
  const [newImage, setNewImage] = useState("")
  const [newVideo, setNewVideo] = useState("")
  const [newFeature, setNewFeature] = useState("")
  const [newCollaborator, setNewCollaborator] = useState("")
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

  const addImage = () => {
    if (newImage.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage.trim()],
      })
      setNewImage("")
    }
  }

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  const addVideo = () => {
    if (newVideo.trim()) {
      setFormData({
        ...formData,
        videos: [...formData.videos, newVideo.trim()],
      })
      setNewVideo("")
    }
  }

  const removeVideo = (index) => {
    setFormData({
      ...formData,
      videos: formData.videos.filter((_, i) => i !== index),
    })
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  const addCollaborator = () => {
    if (newCollaborator.trim()) {
      setFormData({
        ...formData,
        collaborators: [...formData.collaborators, newCollaborator.trim()],
      })
      setNewCollaborator("")
    }
  }

  const removeCollaborator = (index) => {
    setFormData({
      ...formData,
      collaborators: formData.collaborators.filter((_, i) => i !== index),
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
          shortDescription: "",
          longDescription: "",
          githubUrl: "",
          liveUrl: "",
          youtubeUrl: "",
          imageUrl: "",
          images: [],
          videos: [],
          features: [],
          collaborators: [],
          startDate: "",
          endDate: "",
          status: "completed",
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              YouTube URL
            </label>
            <input
              type="url"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
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
            Short Description (for project cards)
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={2}
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

        {/* Images Section */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Additional Images
          </label>
          <div className="mb-2 flex gap-2">
            <input
              type="url"
              placeholder="Image URL"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addImage}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.images.map((image, index) => (
              <span
                key={index}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-600 dark:text-white"
              >
                Image {index + 1}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  �
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Demo Videos
          </label>
          <div className="mb-2 flex gap-2">
            <input
              type="url"
              placeholder="Video URL"
              value={newVideo}
              onChange={(e) => setNewVideo(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addVideo}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.videos.map((video, index) => (
              <span
                key={index}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-600 dark:text-white"
              >
                Video {index + 1}
                <button
                  type="button"
                  onClick={() => removeVideo(index)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  �
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Key Features
          </label>
          <div className="mb-2 flex gap-2">
            <input
              type="text"
              placeholder="Feature description"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addFeature}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-600 dark:text-white"
              >
                {feature.length > 30
                  ? `${feature.substring(0, 30)}...`
                  : feature}
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  �
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Collaborators Section */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Collaborators
          </label>
          <div className="mb-2 flex gap-2">
            <input
              type="text"
              placeholder="Collaborator name"
              value={newCollaborator}
              onChange={(e) => setNewCollaborator(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addCollaborator}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.collaborators.map((collaborator, index) => (
              <span
                key={index}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-600 dark:text-white"
              >
                {collaborator}
                <button
                  type="button"
                  onClick={() => removeCollaborator(index)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  �
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
