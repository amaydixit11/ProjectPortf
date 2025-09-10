import React from "react";

interface Role {
  title: string;
  period: string;
  description: string;
}

interface TimelineItem {
  organization: string;
  roles: Role[];
  logoUrl?: string;
}

const experienceData: TimelineItem[] = [
  {
    organization: "MOSIP via C4GT",
    roles: [
      {
        title: "Summer Intern, C4GT DMP'25",
        period: "May, 2025 - August, 2025",
        description:
          "Worked on MOSIP Inji Stack, enabling Inji Certify to issue Verifiable Credentials (VCs) in the mDoc (ISO/IEC 18013-5) format. Implemented data element and namespace mapping, digest calculation, Mobile Security Object (MSO) construction, and CBOR encoding for compliance with the mso_mdoc profile. Integrated the mDoc issuance workflow with OpenID4VCI protocol.",
      },
      {
        title: "Project Intern, C4GT Sprint'2",
        period: "March, 2025 - May, 2025",
        description:
          "Worked on MOSIP Inji Stack, implementing a Revocation Mechanism for Verifiable Credentials (VCs). Compliant with W3C Verifiable Credentials Data Model 2.0 and BitString StatusList v1.0. Developed APIs for credential status updates, cryptographic proofs, and decentralized revocation.",
      },
    ],
    logoUrl: "https://avatars.githubusercontent.com/u/39733477?s=280&v=4",
  },
  {
    organization: "OpenLake Club, IIT Bhilai",
    roles: [
      {
        title: "Coordinator",
        period: "April, 2025 - Present",
        description:
          "Leading technical initiatives and fostering open-source culture within the institute. Orchestrating workshops, hackathons, and collaborative projects that bridge academic learning with real-world development.",
      },
      {
        title: "Core Member",
        period: "April, 2024 - March, 2025",
        description:
          "Active contributor to open-source projects and community building initiatives. Participated in organizing technical events and mentoring junior members.",
      },
    ],
    logoUrl: "https://avatars.githubusercontent.com/u/61535687?s=280&v=4",
  },
  {
    organization: "OSDAG, IIT Bombay",
    roles: [
      {
        title: "FOSSEE Summer Fellow",
        period: "May, 2025 - July, 2025",
        description:
          "Selected for fellowship focusing on open-source structural design software. Contributed to OSDAG's mission of democratizing engineering design tools through collaborative development.",
      },
    ],
    logoUrl: "https://avatars.githubusercontent.com/u/19796505?v=4",
  },
];

export const ExperienceTimeline: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
        Experience
      </h2>

      <div className="relative">
        {/* Main vertical line - positioned to align with company logos */}
        <div className="absolute left-6 top-0 bottom-0 w-0.25 bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-12">
          {experienceData.map((company, companyIndex) => (
            <div key={companyIndex} className="relative">
              <div className="flex gap-6">
                {/* Company logo with proper positioning */}
                <div className="relative z-10 flex-shrink-0">
                  <img
                    src={company.logoUrl}
                    alt={`${company.organization} logo`}
                    className="w-12 h-12 rounded object-cover border-2 border-gray-200 dark:border-gray-700 bg-white"
                  />
                </div>

                {/* Company content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {company.organization}
                  </h3>

                  {/* Roles container with proper bounds */}
                  <div className="space-y-6">
                    {company.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="relative">
                        <div className="pl-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white pr-4">
                              {role.title}
                            </h4>
                            <span className="text-sm font-medium text-gray-500 flex-shrink-0">
                              {role.period}
                            </span>
                          </div>

                          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
