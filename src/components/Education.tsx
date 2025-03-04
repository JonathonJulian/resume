import React from 'react';

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
  achievements?: string[];
}

interface EducationProps {
  educations: EducationItem[];
}

const Education: React.FC<EducationProps> = ({ educations }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-primary mb-4">Education</h2>

      {educations.length === 0 ? (
        <p className="italic text-secondary">No education data available.</p>
      ) : (
        <div className="space-y-4">
          {educations.map((education, index) => (
            <div key={index} className="border-l-4 border-gray-500 pl-4 py-2 mb-4">
              <div className="flex justify-between items-start flex-wrap">
                <h3 className="text-xl font-medium text-primary">
                  {education.degree} in {education.field}
                </h3>
                <span className="text-sm font-medium text-secondary whitespace-nowrap bg-[#2c2c2c] px-2 py-1 rounded-md">
                  {education.startDate} - {education.endDate}
                </span>
              </div>
              <h4 className="text-lg text-gray-300 mb-2">
                {education.institution}
              </h4>

              {education.description && (
                <p className="text-secondary mb-2">{education.description}</p>
              )}

              {education.achievements && education.achievements.length > 0 && (
                <div className="mt-3 bg-[#252525] p-3 rounded-md border border-gray-800">
                  <h5 className="font-medium text-primary mb-2">Achievements</h5>
                  <ul className="list-disc list-inside space-y-1 text-secondary">
                    {education.achievements.map((achievement, i) => (
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

export default Education;