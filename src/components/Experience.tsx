import React from 'react';

interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
  titleColor?: string;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-primary mb-4">Professional Experience</h2>

      {experiences.length === 0 ? (
        <p className="italic text-secondary">No experience data available.</p>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={index} className="border-l-4 border-gray-500 pl-4 py-2 mb-4">
              <div className="flex justify-between items-start flex-wrap">
                <h3 className={`text-xl font-medium ${experience.titleColor || 'text-primary'}`}>
                  {experience.position}
                </h3>
                <span className="text-sm font-medium text-secondary whitespace-nowrap bg-[#2c2c2c] px-2 py-1 rounded-md">
                  {experience.startDate} - {experience.endDate}
                </span>
              </div>
              <h4 className="text-lg text-gray-300 mb-2">{experience.company}</h4>
              <p className="text-secondary mb-2">{experience.description}</p>

              {experience.achievements && experience.achievements.length > 0 && (
                <div className="mt-3 bg-[#252525] p-3 rounded-md border border-gray-800">
                  <h5 className="font-medium text-primary mb-2">Key Achievements</h5>
                  <ul className="list-disc list-inside space-y-1 text-secondary">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Experience;