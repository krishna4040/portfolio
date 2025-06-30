import React, { useState, useEffect } from "react"
import { projectsAPI } from "../../services/api"

const GithubRepos = ({ onProjectCreated }) => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedRepos, setSelectedRepos] = useState([])

  useEffect(() => {
    fetchGithubRepos()
  }, [])

  const fetchGithubRepos = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await projectsAPI.getGithubRepos()
      setRepos(response.data.repos)
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch GitHub repositories",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleRepoSelect = (repo) => {
    setSelectedRepos((prev) => {
      const isSelected = prev.find((r) => r.id === repo.id)
      if (isSelected) {
        return prev.filter((r) => r.id !== repo.id)
      } else {
        return [...prev, repo]
      }
    })
  }

  const createProjectsFromRepos = async () => {
    if (selectedRepos.length === 0) {
      alert("Please select at least one repository")
      return
    }

    try {
      setLoading(true)
      for (const repo of selectedRepos) {
        const projectData = {
          title: repo.name,
          description: repo.description || "No description available",
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || "",
          technologies:
            repo.topics?.map((topic) => ({
              name: topic,
              icon: "/default-tech.png",
            })) || [],
          isVisible: true,
          isFeatured: false,
        }

        await projectsAPI.createProject(projectData)
      }

      setSelectedRepos([])
      onProjectCreated()
      alert(`Successfully created ${selectedRepos.length} projects!`)
    } catch (error) {
      console.error("Error creating projects:", error)
      alert("Failed to create projects from repositories")
    } finally {
      setLoading(false)
    }
  }

  if (loading && repos.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="text-center">Loading GitHub repositories...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="text-center text-red-600">
          {error}
          <button
            onClick={fetchGithubRepos}
            className="mx-auto mt-4 block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h2 className="text-2xl font-bold">GitHub Repositories</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Selected: {selectedRepos.length}
          </span>
          <button
            onClick={createProjectsFromRepos}
            disabled={loading || selectedRepos.length === 0}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Projects"}
          </button>
          <button
            onClick={fetchGithubRepos}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {repos.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No repositories found. Make sure your GitHub username is set
            correctly.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className={`cursor-pointer p-4 hover:bg-gray-50 ${
                  selectedRepos.find((r) => r.id === repo.id)
                    ? "bg-blue-50"
                    : ""
                }`}
                onClick={() => handleRepoSelect(repo)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!selectedRepos.find((r) => r.id === repo.id)}
                        onChange={() => handleRepoSelect(repo)}
                        className="mr-2"
                      />
                      <h3 className="text-lg font-medium text-gray-900">
                        {repo.name}
                      </h3>
                      {repo.language && (
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-gray-600">
                      {repo.description || "No description available"}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                      <span>
                        Updated:{" "}
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {repo.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GithubRepos
