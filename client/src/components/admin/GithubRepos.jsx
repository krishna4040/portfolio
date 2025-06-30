import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../../services/api';

const GithubRepos = ({ onProjectCreated }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRepos, setSelectedRepos] = useState([]);

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  const fetchGithubRepos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await projectsAPI.getGithubRepos();
      setRepos(response.data.repos);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch GitHub repositories');
    } finally {
      setLoading(false);
    }
  };

  const handleRepoSelect = (repo) => {
    setSelectedRepos(prev => {
      const isSelected = prev.find(r => r.id === repo.id);
      if (isSelected) {
        return prev.filter(r => r.id !== repo.id);
      } else {
        return [...prev, repo];
      }
    });
  };

  const createProjectsFromRepos = async () => {
    if (selectedRepos.length === 0) {
      alert('Please select at least one repository');
      return;
    }

    try {
      setLoading(true);
      for (const repo of selectedRepos) {
        const projectData = {
          title: repo.name,
          description: repo.description || 'No description available',
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || '',
          technologies: repo.topics?.map(topic => ({
            name: topic,
            icon: '/default-tech.png'
          })) || [],
          isVisible: true,
          isFeatured: false
        };
        
        await projectsAPI.createProject(projectData);
      }
      
      setSelectedRepos([]);
      onProjectCreated();
      alert(`Successfully created ${selectedRepos.length} projects!`);
    } catch (error) {
      console.error('Error creating projects:', error);
      alert('Failed to create projects from repositories');
    } finally {
      setLoading(false);
    }
  };

  if (loading && repos.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center">Loading GitHub repositories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-red-600 text-center">
          {error}
          <button
            onClick={fetchGithubRepos}
            className="block mx-auto mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold">GitHub Repositories</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Selected: {selectedRepos.length}
          </span>
          <button
            onClick={createProjectsFromRepos}
            disabled={loading || selectedRepos.length === 0}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Projects'}
          </button>
          <button
            onClick={fetchGithubRepos}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {repos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No repositories found. Make sure your GitHub username is set correctly.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${
                  selectedRepos.find(r => r.id === repo.id) ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleRepoSelect(repo)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!selectedRepos.find(r => r.id === repo.id)}
                        onChange={() => handleRepoSelect(repo)}
                        className="mr-2"
                      />
                      <h3 className="text-lg font-medium text-gray-900">
                        {repo.name}
                      </h3>
                      {repo.language && (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">
                      {repo.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                      <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {repo.topics.map((topic) => (
                          <span
                            key={topic}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
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
  );
};

export default GithubRepos;