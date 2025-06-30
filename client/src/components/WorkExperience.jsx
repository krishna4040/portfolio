import React, { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { workExperienceAPI } from '../services/api';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

const WorkExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await workExperienceAPI.getAllExperiences();
      setExperiences(response.data.experiences);
    } catch (err) {
      console.error('Error fetching work experiences:', err);
      setError(`Failed to fetch work experiences: ${err.response?.data?.message || err.message}`);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      return `${years} year${years > 1 ? 's' : ''}${months > 0 ? ` ${months} month${months > 1 ? 's' : ''}` : ''}`;
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50" id="experience">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Work Experience</h2>
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50" id="experience">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Work Experience</h2>
          <div className="text-center">
            <div className="text-2xl text-red-600 mb-4">Error loading work experience:</div>
            <div className="text-lg text-gray-700 mb-6">{error}</div>
            <button 
              onClick={fetchExperiences}
              className="bg-[#ff4500] text-white px-6 py-3 rounded-lg hover:bg-[#e03d00]"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section className="py-20 bg-gray-50" id="experience">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Work Experience</h2>
          <div className="text-center text-gray-600">
            <p>No work experience available.</p>
            <p className="text-sm mt-2">Please check the admin panel to add work experience.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50" id="experience">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Work Experience</h2>
        
        <VerticalTimeline>
          {experiences.map((experience) => (
            <VerticalTimelineElement
              key={experience._id}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: 'white',
                color: '#333',
                boxShadow: '0 3px 0 #ff4500',
                borderRadius: '8px'
              }}
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date={`${formatDate(experience.startDate)} - ${formatDate(experience.endDate)}`}
              iconStyle={{ background: '#ff4500', color: '#fff' }}
              icon={<FaBriefcase />}
            >
              <div className="experience-content">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{experience.position}</h3>
                    <h4 className="text-lg font-semibold text-[#ff4500] mb-2">{experience.company}</h4>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      {experience.location && (
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                          <span>{experience.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt />
                        <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
                      </div>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs capitalize">
                        {experience.employmentType}
                      </span>
                    </div>
                  </div>
                  
                  {experience.companyLogo && (
                    <img 
                      src={experience.companyLogo} 
                      alt={`${experience.company} logo`}
                      className="w-12 h-12 object-contain ml-4"
                    />
                  )}
                </div>

                <p className="text-gray-700 mb-4">{experience.description}</p>

                {experience.responsibilities && experience.responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Key Responsibilities:</h5>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {experience.responsibilities.map((responsibility, index) => (
                        <li key={index} className="text-sm">{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {experience.achievements && experience.achievements.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Key Achievements:</h5>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {experience.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-green-700">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {experience.companyWebsite && (
                  <a 
                    href={experience.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#ff4500] hover:text-[#e03d00] text-sm"
                  >
                    <FaExternalLinkAlt />
                    Company Website
                  </a>
                )}
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default WorkExperience;