export interface StudyMaterial {
  title: string;
  filePath: string;
  fileType: 'html' | 'pdf';
  description: string;
}

export interface CertificationMaterials {
  id: string;
  name: string;
  examCode: string;
  color: 'amber' | 'blue' | 'green' | 'purple' | 'red' | 'cyan' | 'orange' | 'pink';
  description: string;
  materials: StudyMaterial[];
}

export const studyMaterials: CertificationMaterials[] = [
  {
    id: 'aplus',
    name: 'CompTIA A+',
    examCode: 'Core 1 (220-1101) & Core 2 (220-1102)',
    color: 'amber',
    description: 'Entry-level IT certification covering hardware, networking, mobile devices, and operating systems.',
    materials: [
      {
        title: 'A+ Complete Study Guide',
        filePath: '/assets/pdfs/comptia-aplus-study-guide.html',
        fileType: 'html',
        description: 'Full exam domains, objectives, hardware specs, OS commands, and exam tips',
      },
    ],
  },
  {
    id: 'securityplus',
    name: 'CompTIA Security+',
    examCode: 'SY0-701',
    color: 'red',
    description: 'Foundational cybersecurity certification covering threats, cryptography, and risk management.',
    materials: [
      {
        title: 'Security+ Complete Study Guide',
        filePath: '/assets/pdfs/comptia-security-plus-study-guide.html',
        fileType: 'html',
        description: 'All domains: threats, architecture, implementation, incident response, and GRC',
      },
    ],
  },
  {
    id: 'networkplus',
    name: 'CompTIA Network+',
    examCode: 'N10-009',
    color: 'blue',
    description: 'Networking certification covering infrastructure, protocols, troubleshooting, and security.',
    materials: [
      {
        title: 'Network+ Complete Study Guide',
        filePath: '/assets/pdfs/comptia-network-plus-study-guide.html',
        fileType: 'html',
        description: 'Networking fundamentals, implementations, operations, security, and troubleshooting',
      },
    ],
  },
  {
    id: 'linuxplus',
    name: 'CompTIA Linux+',
    examCode: 'XK0-005',
    color: 'orange',
    description: 'Linux administration certification covering system management, security, and scripting.',
    materials: [
      {
        title: 'Linux+ Complete Study Guide',
        filePath: '/assets/pdfs/comptia-linux-plus-study-guide.html',
        fileType: 'html',
        description: 'System management, security, scripting, containers, and troubleshooting',
      },
    ],
  },
  {
    id: 'cloudplus',
    name: 'CompTIA Cloud+',
    examCode: 'CV0-004',
    color: 'cyan',
    description: 'Cloud computing certification covering architecture, deployment, security, and operations.',
    materials: [
      {
        title: 'Cloud+ Complete Study Guide',
        filePath: '/assets/pdfs/comptia-cloud-plus-study-guide.html',
        fileType: 'html',
        description: 'Cloud architecture, security, deployment, operations, and troubleshooting',
      },
    ],
  },
  {
    id: 'cysaplus',
    name: 'CompTIA CySA+',
    examCode: 'CS0-003',
    color: 'purple',
    description: 'Cybersecurity analyst certification covering threat detection, analysis, and incident response.',
    materials: [
      {
        title: 'CySA+ Complete Study Guide',
        filePath: '/assets/pdfs/comptia-cysa-plus-study-guide.html',
        fileType: 'html',
        description: 'Security operations, vulnerability management, incident response, and reporting',
      },
    ],
  },
  {
    id: 'pentestplus',
    name: 'CompTIA PenTest+',
    examCode: 'PT0-003',
    color: 'green',
    description: 'Penetration testing certification covering planning, scanning, exploitation, and reporting.',
    materials: [
      {
        title: 'PenTest+ Complete Study Guide',
        filePath: '/assets/pdfs/comptia-pentest-plus-study-guide.html',
        fileType: 'html',
        description: 'Planning, recon, attacks, exploits, reporting, and tools/code analysis',
      },
    ],
  },
  {
    id: 'caspplus',
    name: 'CompTIA CASP+',
    examCode: 'CAS-004',
    color: 'pink',
    description: 'Advanced security practitioner certification for enterprise security architecture and operations.',
    materials: [
      {
        title: 'CASP+ Complete Study Guide',
        filePath: '/assets/pdfs/comptia-casp-plus-study-guide.html',
        fileType: 'html',
        description: 'Security architecture, operations, engineering, cryptography, and GRC',
      },
    ],
  },
];
