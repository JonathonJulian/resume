import React from 'react';

interface Skill {
  category: string;
  skills: string[];
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-primary mb-4">Skills</h2>

      {skills.length === 0 ? (
        <p className="italic text-secondary">No skills data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="bg-[#252525] p-4 rounded-md border border-gray-800">
              <h3 className="text-lg font-medium text-gray-300 mb-3 pb-2 border-b border-gray-700">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.skills.map((item, i) => (
                  <span key={i} className="px-3 py-1 skill-tag rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;