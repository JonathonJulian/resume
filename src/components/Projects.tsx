import React from 'react';
import Icons from '../utils/icons';

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
}

interface ProjectsProps {
  projects: ProjectItem[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="project-card">
      <div className="mb-4 flex items-center">
        <h2 className="text-xl font-semibold mr-2">Projects</h2>
        <div className="text-gray-400">{Icons.kubernetes('sm')}</div>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col md:flex-row items-start gap-4">
              {project.image && (
                <div className="w-full md:w-24 md:h-24 flex-shrink-0 bg-black bg-opacity-30 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-300">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-gray-400 hover:text-gray-300 transition-colors special-link"
                    >
                      {Icons.external('xs')}
                      <span className="sr-only">View project</span>
                    </a>
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-3">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag text-xs px-2 py-1 inline-flex items-center">
                      {tech.toLowerCase().includes('kubernetes') && Icons.kubernetes('xxs')}
                      {tech.toLowerCase().includes('blockchain') && Icons.blockchain('xxs')}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;