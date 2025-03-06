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
    <section style={{
      position: 'sticky',
      top: '1rem',
      zIndex: 10,
      width: '100%',
      transition: 'all 0.3s ease'
    }}>
      <h2 className="text-2xl font-semibold text-primary mb-5">Skills</h2>

      {skills.length === 0 ? (
        <p className="italic text-secondary">No skills data available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[1200px]">
          {skills.map((skill, index) => (
            <div key={index} className="bg-[#1e1e1e] p-5 md:p-6 rounded-md border border-[#2a2a2a]">
              <h3 className="text-lg font-medium text-gray-300 mb-4 pb-2 border-b border-[#333]">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {skill.skills.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-[#252525] text-gray-300 rounded-full text-sm border border-[#333]">
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