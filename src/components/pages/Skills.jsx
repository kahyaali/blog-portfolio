import React from 'react';
import { FiTrendingUp, FiCode, FiDatabase, FiLayout, FiZap, FiTool } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Skills = () => {
  const [skills] = useLocalStorage('skills', [
    { name: 'Asp.Net Mvc', level: 70, category: 'backend', icon: FiCode },
    { name: 'Asp.Net Dotnet Core', level: 70, category: 'backend', icon: FiCode },
    { name: 'Asp.Net Web Api', level: 70, category: 'backend', icon: FiCode },
     { name: 'MsSql', level: 70, category: 'backend', icon: FiCode },
      { name: 'SqLite', level: 70, category: 'backend', icon: FiCode },
       { name: 'Devexpress', level: 70, category: 'backend', icon: FiCode },
        { name: 'Dapper', level: 70, category: 'backend', icon: FiCode },
    { name: 'React', level: 60, category: 'frontend', icon: FiZap },
    { name: 'Javascript', level: 70, category: 'styling', icon: FiLayout },
    { name: 'Jquery', level: 70, category: 'styling', icon: FiDatabase },
    { name: 'Css', level: 70, category: 'styling', icon: FiTool },
    { name: 'Bootstrap', level: 80, category: 'styling', icon: FiZap }
  ]);

  const categories = {
    frontend: { name: 'Frontend', color: 'blue', skills: [] },
    backend: { name: 'Backend', color: 'green', skills: [] },
    styling: { name: 'Stil & Tasarım', color: 'purple', skills: [] },
    state: { name: 'State Yönetimi', color: 'orange', skills: [] },
    tools: { name: 'Araçlar', color: 'red', skills: [] }
  };

  skills.forEach(skill => {
    if (categories[skill.category]) {
      categories[skill.category].skills.push(skill);
    }
  });

  const getColorClass = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FiTrendingUp className="text-blue-600 text-3xl" />
          <h2 className="text-3xl font-bold text-gray-800">Yetenekler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(categories).map(([key, category]) => (
            category.skills.length > 0 && (
              <div key={key}>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {skill.icon && <skill.icon className="text-gray-600" />}
                          <span className="font-medium text-gray-700">{skill.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${getColorClass(category.color)} h-full rounded-full transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Ek Yetenekler */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Yumuşak Yetenekler</h3>
          <div className="flex flex-wrap gap-3">
            {['Takım Çalışması', 'Problem Çözme', 'İletişim', 'Zaman Yönetimi', 'Liderlik', 'Yaratıcılık'].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;