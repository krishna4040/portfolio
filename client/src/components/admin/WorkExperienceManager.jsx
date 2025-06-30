import React, { useState, useEffect } from 'react';
import { workExperienceAPI } from '../../services/api';

const WorkExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    responsibilities: [''],
    technologies: [''],
    achievements: [''],
    companyLogo: '',
    companyWebsite: '',
    employmentType: 'full-time',
    isVisible: true,
    order: 0
  });

  const employmentTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' }
  ];

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await workExperienceAPI.getAllExperiencesAdmin();
      setExperiences(response.data.experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        responsibilities: formData.responsibilities.filter(item => item.trim() !== ''),
        technologies: formData.technologies.filter(item => item.trim() !== ''),
        achievements: formData.achievements.filter(item => item.trim() !== '')
      };

      if (editingExperience) {
        await workExperienceAPI.updateExperience(editingExperience._id, cleanedData);
      } else {
        await workExperienceAPI.createExperience(cleanedData);
      }
      
      fetchExperiences();
      resetForm();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setFormData({
      ...experience,
      startDate: experience.startDate ? experience.startDate.split('T')[0] : '',
      endDate: experience.endDate ? experience.endDate.split('T')[0] : '',
      responsibilities: experience.responsibilities.length > 0 ? experience.responsibilities : [''],
      technologies: experience.technologies.length > 0 ? experience.technologies : [''],
      achievements: experience.achievements.length > 0 ? experience.achievements : ['']
    });
  };

  const handleDelete = async (experienceId) => {
    if (window.confirm('Are you sure you want to delete this work experience?')) {
      try {
        await workExperienceAPI.deleteExperience(experienceId);
        fetchExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const resetForm = () => {
    setEditingExperience(null);
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      responsibilities: [''],
      technologies: [''],
      achievements: [''],
      companyLogo: '',
      companyWebsite: '',
      employmentType: 'full-time',
      isVisible: true,
      order: 0
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="text-center">Loading work experiences...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editingExperience ? 'Edit Work Experience' : 'Add New Work Experience'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Employment Type</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                {employmentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date (leave empty for current)</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Logo URL</label>
              <input
                type="url"
                name="companyLogo"
                value={formData.companyLogo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Website</label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
            {formData.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter responsibility"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('responsibilities', index)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('responsibilities')}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
            >
              Add Responsibility
            </button>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
            {formData.technologies.map((technology, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={technology}
                  onChange={(e) => handleArrayChange('technologies', index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter technology"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('technologies', index)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('technologies')}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
            >
              Add Technology
            </button>
          </div>

          {/* Achievements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter achievement"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('achievements', index)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('achievements')}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
            >
              Add Achievement
            </button>
          </div>

          <div className="flex items-center gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Order</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="mt-1 block w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
            >
              {editingExperience ? 'Update Experience' : 'Add Experience'}
            </button>
            {editingExperience && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Experiences List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Work Experiences</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {experiences.map((experience) => (
            <div key={experience._id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{experience.position}</h3>
                  <p className="text-md text-orange-600 font-medium">{experience.company}</p>
                  <p className="text-sm text-gray-600">
                    {experience.location} • {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">{experience.description}</p>
                  
                  {experience.technologies.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-700">Technologies: </span>
                      <span className="text-sm text-gray-600">{experience.technologies.join(', ')}</span>
                    </div>
                  )}
                  
                  <div className="mt-2 flex items-center gap-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                      experience.isVisible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {experience.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                      {experience.employmentType}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(experience._id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {experiences.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No work experiences found. Add your first experience!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceManager;