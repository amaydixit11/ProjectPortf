import React from "react";
import { Code } from "lucide-react";

// Technical Skills Widget
import React from "react";
import { Code } from "lucide-react";

const TechnicalSkillsWidget: React.FC = () => {
  const skillCategories = [
    {
      category: "Languages",
      skills: [
        "Go",
        "Python",
        "Rust",
        "TypeScript",
        "C/C++",
        "JavaScript",
        "SQL",
      ],
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
    },
    {
      category: "Backend & Frameworks",
      skills: ["Next.js", "FastAPI", "Node.js", "NestJS", "React", "Tauri"],
      color:
        "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MongoDB", "SQLite", "Supabase", "Neo4j", "Firebase"],
      color:
        "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
    },
    {
      category: "Systems & Protocols",
      skills: ["libp2p", "CRDT", "gRPC", "GraphQL", "BitTorrent BEP", "DHT", "OpenID4VCI"],
      color:
        "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
    },
    {
      category: "Tools & DevOps",
      skills: [
        "Docker",
        "GitHub Actions",
        "Git",
        "Linux",
        "CI/CD",
      ],
      color:
        "bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Code size={18} />
        Technical Skills
      </h3>
      <div className="space-y-4">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {category.category}
            </h4>
            <div className="flex flex-wrap gap-1">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className={`text-xs px-2 py-1 rounded ${category.color}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSkillsWidget;

