export interface CertDomain {
  name: string;
  weight: string;
  objectives: string[];
  keyTerms: string[];
  ports?: string[];
  commands?: string[];
  protocols?: string[];
  acronyms?: string[];
  studyNotes: string;
}

export interface Certification {
  id: string;
  name: string;
  examCode: string;
  description: string;
  passingScore: string;
  questionCount: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  prerequisites: string;
  domains: CertDomain[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'comptia-aplus',
    name: 'CompTIA A+',
    examCode: '220-1101 / 220-1102',
    description: 'The industry standard for establishing a career in IT. Covers hardware, networking, mobile devices, and operating systems.',
    passingScore: '675 / 700 (scale 100-900)',
    questionCount: 'Max 90 per exam',
    duration: '90 minutes per exam',
    difficulty: 'Beginner',
    prerequisites: '9-12 months hands-on experience recommended',
    domains: [
      {
        name: 'Mobile Devices (Core 1)',
        weight: '15%',
        objectives: [
          'Install and configure laptop hardware and components',
          'Compare and contrast display components of mobile devices',
          'Set up and configure accessories and ports of mobile devices',
          'Configure basic mobile device network connectivity and application support',
          'Install and configure basic wired/wireless SOHO networks',
          'Compare and contrast wireless networking protocols',
          'Summarize the properties and purposes of services provided by networked hosts',
          'Explain common networking hardware',
          'Explain logical and physical network concepts',
          'Compare and contrast Internet connection types, network types, and their features',
          'Use appropriate networking tools'
        ],
        keyTerms: ['LCD', 'OLED', 'IPS', 'TN', 'VA', 'digitizer', 'inverter', 'WiFi calling', 'hotspot', 'Bluetooth', 'NFC', 'IR blaster', 'GPS', 'MDM', 'MAM'],
        ports: ['USB-A', 'USB-B', 'USB-C', 'Lightning', 'Thunderbolt', 'HDMI', 'DisplayPort', 'VGA', 'DVI'],
        protocols: ['802.11a/b/g/n/ac/ax', 'Bluetooth 5.x', 'NFC', 'RFID', 'Cellular: LTE, 5G'],
        acronyms: ['MDM - Mobile Device Management', 'MAM - Mobile Application Management', 'BYOD - Bring Your Own Device', 'COPE - Corporate Owned Personally Enabled', 'CYOD - Choose Your Own Device'],
        studyNotes: 'Focus on display types (LCD vs OLED), connector types (USB-C, Lightning, Thunderbolt), and wireless standards. Know 802.11 speeds: 802.11a=54Mbps, 802.11b=11Mbps, 802.11g=54Mbps, 802.11n=600Mbps, 802.11ac=3.5Gbps, 802.11ax(WiFi6)=9.6Gbps. Understand MDM/MAM for enterprise mobile management.'
      },
      {
        name: 'Networking (Core 1)',
        weight: '20%',
        objectives: [
          'Compare and contrast TCP and UDP protocols',
          'Compare and contrast common networking hardware',
          'Explain logical and physical network concepts',
          'Summarize services provided by networked hosts',
          'Install and configure basic wired/wireless SOHO networks',
          'Compare and contrast Internet connection types',
          'Use appropriate networking tools/software'
        ],
        keyTerms: ['TCP', 'UDP', 'IP', 'MAC address', 'subnet mask', 'gateway', 'DNS', 'DHCP', 'NAT', 'PAT', 'router', 'switch', 'hub', 'bridge', 'firewall', 'WAP', 'PoE', 'VLAN'],
        ports: ['20/21 FTP', '22 SSH', '23 Telnet', '25 SMTP', '53 DNS', '67/68 DHCP', '80 HTTP', '110 POP3', '143 IMAP', '443 HTTPS', '3389 RDP', '137-139 NetBIOS', '445 SMB'],
        protocols: ['TCP/IP', 'UDP', 'ICMP', 'ARP', 'DNS', 'DHCP', 'HTTP/HTTPS', 'FTP/SFTP', 'SSH', 'Telnet', 'SMTP', 'POP3', 'IMAP'],
        acronyms: ['TCP - Transmission Control Protocol', 'UDP - User Datagram Protocol', 'DNS - Domain Name System', 'DHCP - Dynamic Host Configuration Protocol', 'NAT - Network Address Translation', 'VLAN - Virtual Local Area Network', 'PoE - Power over Ethernet'],
        studyNotes: 'Memorize all common port numbers. Know the OSI model layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. IPv4 private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. APIPA range: 169.254.0.0/16. Understand subnetting basics and CIDR notation.'
      },
      {
        name: 'Hardware (Core 1)',
        weight: '25%',
        objectives: [
          'Explain basic cable types and their connectors, features, and purposes',
          'Identify common connector types',
          'Install RAM types',
          'Select, install and configure storage devices',
          'Install and configure motherboard components',
          'Explain the purposes and uses of various peripheral types',
          'Summarize power supply types and features',
          'Deploy and configure multifunction devices/printers',
          'Install and maintain various print technologies'
        ],
        keyTerms: ['DDR4', 'DDR5', 'DIMM', 'SO-DIMM', 'ECC', 'SATA', 'NVMe', 'M.2', 'PCIe', 'RAID', 'SSD', 'HDD', 'CPU', 'GPU', 'PSU', 'ATX', 'BIOS', 'UEFI', 'POST'],
        acronyms: ['RAID - Redundant Array of Independent Disks', 'BIOS - Basic Input/Output System', 'UEFI - Unified Extensible Firmware Interface', 'POST - Power-On Self-Test', 'PCIe - Peripheral Component Interconnect Express', 'NVMe - Non-Volatile Memory Express', 'ECC - Error Correcting Code'],
        studyNotes: 'RAID levels: RAID 0 (striping, no redundancy), RAID 1 (mirroring), RAID 5 (striping with parity, min 3 drives), RAID 6 (dual parity, min 4 drives), RAID 10 (mirror+stripe, min 4 drives). DDR4 speeds: 2133-3200 MHz. DDR5 starts at 4800 MHz. NVMe is much faster than SATA SSD. Know CPU socket types: LGA (Intel), AM4/AM5 (AMD).'
      },
      {
        name: 'Virtualization and Cloud Computing (Core 1)',
        weight: '11%',
        objectives: [
          'Summarize cloud-computing concepts',
          'Summarize aspects of client-side virtualization',
          'Compare and contrast cloud hosting and on-premises hosting',
          'Explain common cloud models'
        ],
        keyTerms: ['IaaS', 'PaaS', 'SaaS', 'public cloud', 'private cloud', 'hybrid cloud', 'community cloud', 'hypervisor', 'VM', 'container', 'VDI', 'sandbox'],
        acronyms: ['IaaS - Infrastructure as a Service', 'PaaS - Platform as a Service', 'SaaS - Software as a Service', 'VDI - Virtual Desktop Infrastructure', 'VM - Virtual Machine'],
        studyNotes: 'Cloud service models: IaaS (you manage OS up), PaaS (you manage apps/data), SaaS (provider manages everything). Hypervisor types: Type 1 (bare metal, e.g., VMware ESXi, Hyper-V) runs directly on hardware; Type 2 (hosted, e.g., VirtualBox, VMware Workstation) runs on top of OS. Containers share the host OS kernel (Docker).'
      },
      {
        name: 'Hardware and Network Troubleshooting (Core 1)',
        weight: '29%',
        objectives: [
          'Apply the best practice methodology to resolve problems',
          'Troubleshoot problems related to motherboards, RAM, CPU, and power',
          'Troubleshoot and diagnose problems with storage drives and RAID arrays',
          'Troubleshoot video, projector, and display issues',
          'Troubleshoot common issues with mobile devices',
          'Troubleshoot and resolve printer issues',
          'Troubleshoot problems with wired and wireless networks'
        ],
        keyTerms: ['POST beep codes', 'BSOD', 'kernel panic', 'SMART', 'chkdsk', 'defrag', 'ipconfig', 'ping', 'tracert', 'nslookup', 'netstat', 'pathping'],
        commands: ['ipconfig /all', 'ipconfig /release', 'ipconfig /renew', 'ping', 'tracert', 'nslookup', 'netstat -an', 'pathping', 'arp -a', 'chkdsk /f', 'sfc /scannow'],
        studyNotes: 'Troubleshooting methodology: 1) Identify the problem, 2) Establish a theory, 3) Test the theory, 4) Establish a plan of action, 5) Implement the solution, 6) Verify full system functionality, 7) Document findings. SMART errors indicate imminent drive failure. BSOD (Blue Screen of Death) indicates critical Windows error - note the stop code.'
      },
      {
        name: 'Operating Systems (Core 2)',
        weight: '31%',
        objectives: [
          'Identify basic features of Microsoft Windows editions',
          'Use the appropriate Microsoft command-line tool',
          'Use features and tools of the Microsoft Windows 10/11 OS',
          'Use the appropriate Windows settings',
          'Given a scenario, use the appropriate Windows Control Panel utility',
          'Configure Microsoft Windows networking on a client/desktop',
          'Apply the appropriate macOS features and tools',
          'Apply the appropriate Linux features and tools',
          'Summarize common OS types and their purposes'
        ],
        keyTerms: ['Registry', 'Task Manager', 'Device Manager', 'Event Viewer', 'Group Policy', 'MMC', 'PowerShell', 'CMD', 'WinPE', 'WinRE', 'System Restore', 'BitLocker'],
        commands: ['dir', 'cd', 'md/mkdir', 'rd/rmdir', 'copy', 'xcopy', 'robocopy', 'del', 'format', 'diskpart', 'gpupdate /force', 'gpresult', 'net user', 'net localgroup', 'tasklist', 'taskkill', 'shutdown', 'sfc /scannow', 'DISM', 'regedit', 'msconfig', 'msinfo32'],
        studyNotes: 'Windows editions: Home (basic), Pro (BitLocker, Remote Desktop, Group Policy), Enterprise (advanced management), Education. Key file systems: NTFS (Windows, permissions, encryption), FAT32 (max 4GB file), exFAT (flash drives, large files). Registry hives: HKLM (machine), HKCU (current user), HKCR (file associations), HKU (all users), HKCC (hardware profile).'
      },
      {
        name: 'Security (Core 2)',
        weight: '25%',
        objectives: [
          'Summarize various security measures and their purposes',
          'Compare and contrast wireless security protocols and authentication methods',
          'Detect, remove, and prevent malware using the appropriate tools and methods',
          'Explain common social-engineering attacks, threats, and vulnerabilities',
          'Manage and configure basic security settings in the Microsoft Windows OS',
          'Configure a workstation to meet best practices for security',
          'Explain the importance of prohibited content/activity and privacy, licensing, and policy concepts',
          'Use common data destruction and disposal methods'
        ],
        keyTerms: ['malware', 'virus', 'worm', 'trojan', 'ransomware', 'spyware', 'adware', 'rootkit', 'keylogger', 'phishing', 'social engineering', 'MFA', 'UAC', 'firewall', 'antivirus', 'encryption', 'TPM', 'BitLocker'],
        acronyms: ['MFA - Multi-Factor Authentication', 'UAC - User Account Control', 'TPM - Trusted Platform Module', 'AES - Advanced Encryption Standard', 'WPA2/WPA3 - WiFi Protected Access'],
        studyNotes: 'Malware types: Virus (attaches to files), Worm (self-replicating, no host needed), Trojan (disguised as legitimate), Ransomware (encrypts files for ransom), Rootkit (hides in OS), Keylogger (records keystrokes), Spyware (collects data). Wireless security: WEP (broken), WPA (TKIP), WPA2 (AES/CCMP), WPA3 (SAE). Always use WPA2 minimum, WPA3 preferred.'
      },
      {
        name: 'Software Troubleshooting (Core 2)',
        weight: '22%',
        objectives: [
          'Troubleshoot common Windows OS problems',
          'Troubleshoot common personal computer (PC) security issues',
          'Use best practice procedures for malware removal',
          'Troubleshoot common mobile OS and application issues',
          'Troubleshoot common mobile OS and application security issues'
        ],
        keyTerms: ['safe mode', 'system restore', 'recovery partition', 'factory reset', 'ADB', 'jailbreak', 'rooting', 'MDM', 'remote wipe'],
        commands: ['msconfig', 'bcdedit', 'bootrec /fixmbr', 'bootrec /fixboot', 'bootrec /rebuildbcd', 'sfc /scannow', 'DISM /Online /Cleanup-Image /RestoreHealth'],
        studyNotes: 'Malware removal steps: 1) Identify and research malware symptoms, 2) Quarantine infected system, 3) Disable System Restore, 4) Remediate infected systems (update AV, scan), 5) Schedule scans and run updates, 6) Enable System Restore and create restore point, 7) Educate end user. Safe Mode loads minimal drivers - use for troubleshooting.'
      },
      {
        name: 'Operational Procedures (Core 2)',
        weight: '22%',
        objectives: [
          'Implement best practices associated with documentation and support systems information management',
          'Explain basic change-management best practices',
          'Implement workstation backup and recovery methods',
          'Use common safety procedures',
          'Summarize environmental impacts and local environmental controls',
          'Explain the importance of prohibited content/activity and privacy, licensing, and policy concepts',
          'Use proper communication techniques and professionalism',
          'Identify the basics of scripting',
          'Use remote access technologies'
        ],
        keyTerms: ['SLA', 'ticketing system', 'change management', 'backup types', 'ESD', 'MSDS/SDS', 'RDP', 'VPN', 'SSH', 'scripting', 'PowerShell', 'Python', 'bash'],
        acronyms: ['SLA - Service Level Agreement', 'ESD - Electrostatic Discharge', 'MSDS - Material Safety Data Sheet', 'RDP - Remote Desktop Protocol', 'VPN - Virtual Private Network'],
        studyNotes: 'Backup types: Full (all data), Incremental (changes since last backup), Differential (changes since last full). 3-2-1 rule: 3 copies, 2 different media, 1 offsite. ESD can destroy components - always use anti-static wrist strap. Change management: document changes, get approval, test, implement, verify, document results.'
      }
    ]
  },
  {
    id: 'comptia-securityplus',
    name: 'CompTIA Security+',
    examCode: 'SY0-701',
    description: 'The most widely recognized cybersecurity certification. Validates core security skills for roles in security administration and systems administration.',
    passingScore: '750 (scale 100-900)',
    questionCount: 'Max 90',
    duration: '90 minutes',
    difficulty: 'Intermediate',
    prerequisites: 'CompTIA Network+ recommended, 2 years IT experience with security focus',
    domains: [
      {
        name: 'General Security Concepts',
        weight: '12%',
        objectives: [
          'Compare and contrast various types of security controls',
          'Summarize fundamental security concepts (CIA triad, AAA, Zero Trust)',
          'Explain the importance of change management processes',
          'Explain the importance of using appropriate cryptographic solutions',
          'Understand PKI, certificates, and digital signatures'
        ],
        keyTerms: ['CIA triad', 'confidentiality', 'integrity', 'availability', 'non-repudiation', 'authentication', 'authorization', 'accounting', 'AAA', 'zero trust', 'least privilege', 'defense in depth', 'PKI', 'certificate authority', 'digital signature', 'hashing', 'encryption', 'obfuscation'],
        acronyms: ['CIA - Confidentiality, Integrity, Availability', 'AAA - Authentication, Authorization, Accounting', 'PKI - Public Key Infrastructure', 'CA - Certificate Authority', 'MFA - Multi-Factor Authentication', 'SSO - Single Sign-On', 'RBAC - Role-Based Access Control', 'DAC - Discretionary Access Control', 'MAC - Mandatory Access Control'],
        studyNotes: 'Security controls categories: Technical (firewalls, encryption), Managerial (policies, procedures), Operational (training, physical security), Physical (locks, cameras). Control types: Preventive, Deterrent, Detective, Corrective, Compensating, Directive. Zero Trust: never trust, always verify. Verify explicitly, use least privilege, assume breach. Hashing algorithms: MD5 (128-bit, broken), SHA-1 (160-bit, deprecated), SHA-256 (256-bit, secure), SHA-3 (latest).'
      },
      {
        name: 'Threats, Vulnerabilities, and Mitigations',
        weight: '22%',
        objectives: [
          'Compare and contrast common threat actors and motivations',
          'Explain common threat vectors and attack surfaces',
          'Explain various types of vulnerabilities',
          'Given a scenario, analyze indicators of malicious activity',
          'Explain the purpose of mitigation techniques used to secure the enterprise'
        ],
        keyTerms: ['APT', 'threat actor', 'nation-state', 'hacktivist', 'insider threat', 'script kiddie', 'phishing', 'spear phishing', 'whaling', 'vishing', 'smishing', 'social engineering', 'SQL injection', 'XSS', 'CSRF', 'buffer overflow', 'race condition', 'zero-day', 'CVE', 'CVSS', 'IoC', 'TTPs'],
        acronyms: ['APT - Advanced Persistent Threat', 'CVE - Common Vulnerabilities and Exposures', 'CVSS - Common Vulnerability Scoring System', 'IoC - Indicator of Compromise', 'TTP - Tactics, Techniques, and Procedures', 'XSS - Cross-Site Scripting', 'CSRF - Cross-Site Request Forgery', 'SQLi - SQL Injection'],
        studyNotes: 'CVSS score: 0-3.9 Low, 4.0-6.9 Medium, 7.0-8.9 High, 9.0-10.0 Critical. Attack types: Phishing (email), Vishing (voice), Smishing (SMS), Whaling (executives). SQL injection: use parameterized queries to prevent. XSS: inject malicious scripts into web pages. Buffer overflow: write beyond allocated memory. Mitigations: input validation, patching, network segmentation, least privilege, MFA.'
      },
      {
        name: 'Security Architecture',
        weight: '18%',
        objectives: [
          'Compare and contrast security implications of different architecture models',
          'Apply security principles to secure enterprise infrastructure',
          'Compare and contrast concepts and strategies to protect data',
          'Explain the importance of resilience and recovery in security architecture'
        ],
        keyTerms: ['cloud security', 'IaaS', 'PaaS', 'SaaS', 'on-premises', 'hybrid', 'SASE', 'SD-WAN', 'VPC', 'DMZ', 'network segmentation', 'microsegmentation', 'zero trust network', 'data classification', 'DLP', 'encryption at rest', 'encryption in transit', 'HA', 'RTO', 'RPO', 'MTTR', 'MTBF'],
        acronyms: ['SASE - Secure Access Service Edge', 'SD-WAN - Software-Defined Wide Area Network', 'DMZ - Demilitarized Zone', 'DLP - Data Loss Prevention', 'HA - High Availability', 'RTO - Recovery Time Objective', 'RPO - Recovery Point Objective', 'MTTR - Mean Time to Repair', 'MTBF - Mean Time Between Failures'],
        studyNotes: 'DMZ sits between internet and internal network, hosts public-facing servers. Network segmentation limits blast radius of breaches. Data classification: Public, Internal, Confidential, Restricted/Top Secret. Encryption: AES-256 for data at rest, TLS 1.3 for data in transit. RTO = how quickly you must recover; RPO = how much data loss is acceptable. Backup strategies: 3-2-1 rule.'
      },
      {
        name: 'Security Operations',
        weight: '28%',
        objectives: [
          'Apply common security techniques to computing resources',
          'Explain the security implications of proper hardware, software, and data asset management',
          'Explain various activities associated with vulnerability management',
          'Explain security alerting and monitoring concepts and tools',
          'Given a scenario, modify enterprise capabilities to enhance security',
          'Given a scenario, implement and maintain identity and access management',
          'Explain the importance of automation and orchestration related to secure operations',
          'Explain appropriate incident response activities',
          'Given a scenario, use data sources to support an investigation'
        ],
        keyTerms: ['SIEM', 'SOAR', 'EDR', 'XDR', 'IDS', 'IPS', 'WAF', 'vulnerability scanner', 'penetration testing', 'threat hunting', 'incident response', 'forensics', 'chain of custody', 'IAM', 'PAM', 'MFA', 'SSO', 'SAML', 'OAuth', 'OpenID Connect', 'hardening', 'patch management'],
        ports: ['22 SSH', '443 HTTPS', '3389 RDP', '1433 MSSQL', '3306 MySQL', '5432 PostgreSQL', '8080 HTTP-alt', '8443 HTTPS-alt'],
        acronyms: ['SIEM - Security Information and Event Management', 'SOAR - Security Orchestration, Automation, and Response', 'EDR - Endpoint Detection and Response', 'XDR - Extended Detection and Response', 'IDS - Intrusion Detection System', 'IPS - Intrusion Prevention System', 'WAF - Web Application Firewall', 'PAM - Privileged Access Management', 'SAML - Security Assertion Markup Language'],
        studyNotes: 'SIEM collects and correlates logs from multiple sources. SOAR automates incident response. IDS detects and alerts; IPS detects and blocks. EDR monitors endpoints for threats. Key Windows Event IDs: 4624 (successful logon), 4625 (failed logon), 4648 (logon with explicit credentials), 4720 (user account created), 4732 (user added to group), 4776 (credential validation). Incident response phases: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.'
      },
      {
        name: 'Security Program Management and Oversight',
        weight: '20%',
        objectives: [
          'Summarize elements of effective security governance',
          'Explain elements of the risk management process',
          'Explain the processes associated with third-party risk assessment and management',
          'Summarize elements of effective security compliance',
          'Explain types and purposes of audits and assessments',
          'Given a scenario, implement security awareness practices'
        ],
        keyTerms: ['risk management', 'risk assessment', 'risk register', 'risk tolerance', 'risk appetite', 'BIA', 'BCP', 'DRP', 'SLA', 'MOU', 'MOA', 'NDA', 'vendor assessment', 'compliance', 'GDPR', 'HIPAA', 'PCI-DSS', 'SOX', 'NIST', 'ISO 27001', 'security awareness training'],
        acronyms: ['BIA - Business Impact Analysis', 'BCP - Business Continuity Plan', 'DRP - Disaster Recovery Plan', 'SLA - Service Level Agreement', 'MOU - Memorandum of Understanding', 'GDPR - General Data Protection Regulation', 'HIPAA - Health Insurance Portability and Accountability Act', 'PCI-DSS - Payment Card Industry Data Security Standard', 'SOX - Sarbanes-Oxley Act'],
        studyNotes: 'Risk = Threat x Vulnerability x Impact. Risk strategies: Accept (acknowledge risk), Avoid (eliminate activity), Transfer (insurance), Mitigate (reduce risk). Quantitative risk: SLE (Single Loss Expectancy) = Asset Value x Exposure Factor; ALE (Annual Loss Expectancy) = SLE x ARO. Qualitative risk uses subjective ratings. GDPR: EU data protection, right to be forgotten, 72-hour breach notification. HIPAA: US healthcare data protection. PCI-DSS: payment card data security.'
      }
    ]
  },
  {
    id: 'comptia-networkplus',
    name: 'CompTIA Network+',
    examCode: 'N10-009',
    description: 'Validates the essential knowledge and skills needed to confidently design, configure, manage, and troubleshoot any wired and wireless networks.',
    passingScore: '720 (scale 100-900)',
    questionCount: 'Max 90',
    duration: '90 minutes',
    difficulty: 'Intermediate',
    prerequisites: 'CompTIA A+ recommended, 9-12 months networking experience',
    domains: [
      {
        name: 'Networking Concepts',
        weight: '23%',
        objectives: [
          'Explain concepts related to the OSI model',
          'Compare and contrast networking appliances, applications, and functions',
          'Summarize cloud concepts and connectivity options',
          'Explain common networking ports, protocols, services, and traffic types',
          'Compare and contrast transmission media and transceivers',
          'Compare and contrast network topologies, architectures, and types'
        ],
        keyTerms: ['OSI model', 'TCP/IP model', 'encapsulation', 'PDU', 'frame', 'packet', 'segment', 'bit', 'router', 'switch', 'hub', 'bridge', 'firewall', 'load balancer', 'proxy', 'IDS/IPS', 'UTM', 'NGFW'],
        ports: ['20/21 FTP', '22 SSH/SFTP', '23 Telnet', '25 SMTP', '53 DNS', '67/68 DHCP', '69 TFTP', '80 HTTP', '110 POP3', '119 NNTP', '123 NTP', '143 IMAP', '161/162 SNMP', '389 LDAP', '443 HTTPS', '445 SMB', '514 Syslog', '636 LDAPS', '993 IMAPS', '995 POP3S', '1433 MSSQL', '1521 Oracle', '3306 MySQL', '3389 RDP', '5060/5061 SIP'],
        protocols: ['TCP', 'UDP', 'ICMP', 'ARP', 'RARP', 'IPv4', 'IPv6', 'BGP', 'OSPF', 'EIGRP', 'RIP', 'STP', 'RSTP', 'VTP', 'CDP', 'LLDP'],
        acronyms: ['OSI - Open Systems Interconnection', 'PDU - Protocol Data Unit', 'UTM - Unified Threat Management', 'NGFW - Next-Generation Firewall', 'STP - Spanning Tree Protocol', 'RSTP - Rapid Spanning Tree Protocol', 'BGP - Border Gateway Protocol', 'OSPF - Open Shortest Path First', 'EIGRP - Enhanced Interior Gateway Routing Protocol'],
        studyNotes: 'OSI Layers (Please Do Not Throw Sausage Pizza Away): Physical, Data Link, Network, Transport, Session, Presentation, Application. Layer devices: Hub=L1, Switch=L2, Router=L3, Firewall=L3-L7. IPv4 classes: A (1-126, /8), B (128-191, /16), C (192-223, /24). IPv6: 128-bit, 8 groups of 4 hex digits. Loopback: 127.0.0.1 (IPv4), ::1 (IPv6). APIPA: 169.254.0.0/16.'
      },
      {
        name: 'Network Implementation',
        weight: '19%',
        objectives: [
          'Compare and contrast routing technologies and bandwidth management concepts',
          'Given a scenario, configure switching technologies and features',
          'Given a scenario, select and configure wireless devices and technologies',
          'Summarize cloud access and connectivity methods'
        ],
        keyTerms: ['static routing', 'dynamic routing', 'OSPF', 'BGP', 'EIGRP', 'RIP', 'VLAN', 'trunking', '802.1Q', 'STP', 'PoE', 'LACP', 'port aggregation', 'QoS', 'DSCP', 'CoS', 'WPA2', 'WPA3', 'SSID', 'BSS', 'ESS', 'channel bonding', 'MIMO', 'MU-MIMO'],
        protocols: ['OSPF', 'BGP', 'EIGRP', 'RIPv2', '802.1Q', '802.3ad LACP', '802.11ax WiFi6', 'WPA3-SAE'],
        acronyms: ['VLAN - Virtual Local Area Network', 'STP - Spanning Tree Protocol', 'LACP - Link Aggregation Control Protocol', 'QoS - Quality of Service', 'DSCP - Differentiated Services Code Point', 'MIMO - Multiple Input Multiple Output', 'SSID - Service Set Identifier'],
        studyNotes: '802.11 standards: 802.11a (5GHz, 54Mbps), 802.11b (2.4GHz, 11Mbps), 802.11g (2.4GHz, 54Mbps), 802.11n (2.4/5GHz, 600Mbps), 802.11ac/WiFi5 (5GHz, 3.5Gbps), 802.11ax/WiFi6 (2.4/5/6GHz, 9.6Gbps). Non-overlapping 2.4GHz channels: 1, 6, 11. VLAN tagging uses 802.1Q. STP prevents loops by blocking redundant paths. OSPF uses Dijkstra algorithm, link-state. BGP is the internet routing protocol (path vector).'
      },
      {
        name: 'Network Operations',
        weight: '17%',
        objectives: [
          'Given a scenario, use the appropriate statistics and sensors to ensure network availability',
          'Explain the purpose of organizational documents and policies',
          'Explain high availability and disaster recovery concepts and summarize which is the best solution'
        ],
        keyTerms: ['SNMP', 'syslog', 'NetFlow', 'IPFIX', 'bandwidth monitoring', 'latency', 'jitter', 'packet loss', 'baseline', 'SLA', 'MTTR', 'MTBF', 'RTO', 'RPO', 'HA', 'failover', 'load balancing', 'NTP', 'DNS', 'DHCP'],
        commands: ['ping', 'traceroute/tracert', 'nslookup', 'dig', 'netstat', 'arp', 'route', 'ipconfig/ifconfig', 'ip addr', 'nmap', 'tcpdump', 'Wireshark', 'show interfaces', 'show ip route', 'show vlan'],
        acronyms: ['SNMP - Simple Network Management Protocol', 'NTP - Network Time Protocol', 'IPFIX - IP Flow Information Export', 'MTTR - Mean Time to Repair', 'MTBF - Mean Time Between Failures'],
        studyNotes: 'SNMP versions: v1 (community strings, no encryption), v2c (bulk transfers), v3 (authentication + encryption, use this). Syslog severity levels 0-7: Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debug. NTP uses UDP port 123. Wireshark captures packets for analysis. NetFlow/IPFIX provides traffic flow data without full packet capture.'
      },
      {
        name: 'Network Security',
        weight: '20%',
        objectives: [
          'Explain the importance of basic network security concepts',
          'Summarize various types of attacks and their impact to the network',
          'Given a scenario, apply network security features, defense techniques, and solutions'
        ],
        keyTerms: ['firewall', 'ACL', 'NAC', 'RADIUS', 'TACACS+', '802.1X', 'VPN', 'IPSec', 'SSL/TLS', 'VLAN hopping', 'ARP spoofing', 'MAC flooding', 'DHCP starvation', 'DNS poisoning', 'DDoS', 'man-in-the-middle', 'evil twin', 'deauthentication attack', 'WPS attack'],
        ports: ['1812/1813 RADIUS', '49 TACACS+'],
        protocols: ['IPSec (AH + ESP)', 'SSL/TLS', 'RADIUS', 'TACACS+', '802.1X EAP'],
        acronyms: ['ACL - Access Control List', 'NAC - Network Access Control', 'RADIUS - Remote Authentication Dial-In User Service', 'TACACS+ - Terminal Access Controller Access-Control System Plus', 'VPN - Virtual Private Network', 'IPSec - Internet Protocol Security'],
        studyNotes: 'RADIUS uses UDP, encrypts only password. TACACS+ uses TCP, encrypts entire payload - preferred for device administration. 802.1X provides port-based NAC using EAP. VPN types: Site-to-site (connects networks), Remote access (individual users). IPSec modes: Transport (encrypts payload), Tunnel (encrypts entire packet). ARP spoofing: attacker sends fake ARP replies to associate their MAC with legitimate IP. Prevent with Dynamic ARP Inspection (DAI).'
      },
      {
        name: 'Network Troubleshooting',
        weight: '21%',
        objectives: [
          'Explain the network troubleshooting methodology',
          'Given a scenario, troubleshoot common cable connectivity issues and select the appropriate tools',
          'Given a scenario, use the appropriate network software tools and commands',
          'Given a scenario, troubleshoot common wireless connectivity issues',
          'Given a scenario, troubleshoot general networking issues'
        ],
        keyTerms: ['cable tester', 'toner probe', 'loopback plug', 'multimeter', 'OTDR', 'spectrum analyzer', 'Wi-Fi analyzer', 'packet sniffer', 'port scanner', 'bandwidth tester'],
        commands: ['ping', 'traceroute', 'pathping', 'nslookup', 'dig', 'netstat', 'arp -a', 'ipconfig /all', 'ifconfig', 'ip addr show', 'route print', 'nmap', 'tcpdump', 'show running-config', 'show interfaces status', 'show ip arp'],
        studyNotes: 'Troubleshooting methodology: 1) Identify problem, 2) Establish theory, 3) Test theory, 4) Plan of action, 5) Implement solution, 6) Verify functionality, 7) Document. Cable issues: attenuation (signal loss over distance), crosstalk (interference between wires), EMI (electromagnetic interference). Cat5e max 100m, Cat6 max 100m (55m for 10GbE). Fiber: single-mode (long distance, yellow), multi-mode (short distance, orange/aqua).'
      }
    ]
  },
  {
    id: 'comptia-linuxplus',
    name: 'CompTIA Linux+',
    examCode: 'XK0-005',
    description: 'Validates the skills required for Linux administration tasks including system management, security, scripting, and containers.',
    passingScore: '720 (scale 100-900)',
    questionCount: 'Max 90',
    duration: '90 minutes',
    difficulty: 'Intermediate',
    prerequisites: 'CompTIA A+ and Network+ recommended, 12 months Linux admin experience',
    domains: [
      {
        name: 'System Management',
        weight: '32%',
        objectives: [
          'Summarize Linux fundamentals',
          'Given a scenario, manage files and directories',
          'Given a scenario, configure and manage storage using the appropriate tools',
          'Given a scenario, configure and use the appropriate processes and services',
          'Given a scenario, use the appropriate networking tools or configuration files',
          'Given a scenario, build and install software'
        ],
        keyTerms: ['FHS', 'filesystem hierarchy', 'inode', 'hard link', 'soft link', 'mount', 'umount', 'LVM', 'RAID', 'ext4', 'XFS', 'Btrfs', 'swap', 'partition', 'MBR', 'GPT', 'GRUB', 'systemd', 'init', 'runlevel', 'target'],
        commands: ['ls -la', 'cd', 'pwd', 'mkdir', 'rm -rf', 'cp', 'mv', 'find', 'locate', 'grep', 'awk', 'sed', 'cat', 'less', 'head', 'tail', 'chmod', 'chown', 'chgrp', 'umask', 'mount', 'umount', 'df -h', 'du -sh', 'fdisk', 'parted', 'mkfs', 'fsck', 'lsblk', 'blkid', 'systemctl', 'journalctl', 'ps aux', 'top', 'htop', 'kill', 'killall', 'nice', 'renice', 'cron', 'at', 'tar', 'gzip', 'bzip2', 'xz'],
        studyNotes: 'FHS key directories: /bin (essential binaries), /etc (config files), /home (user homes), /var (variable data, logs), /tmp (temporary), /usr (user programs), /proc (process info), /sys (system info), /dev (devices), /mnt (mount points), /opt (optional software). File permissions: r=4, w=2, x=1. chmod 755 = rwxr-xr-x. Special permissions: SUID (4), SGID (2), Sticky bit (1). systemd targets: multi-user.target (runlevel 3), graphical.target (runlevel 5).'
      },
      {
        name: 'Security',
        weight: '21%',
        objectives: [
          'Summarize the importance of Linux security best practices',
          'Given a scenario, configure and implement appropriate Linux security technologies',
          'Given a scenario, apply the appropriate access controls'
        ],
        keyTerms: ['SELinux', 'AppArmor', 'iptables', 'nftables', 'firewalld', 'ufw', 'PAM', 'sudo', 'su', 'SSH keys', 'GPG', 'ACL', 'capabilities', 'chroot', 'namespace', 'cgroup', 'auditd', 'fail2ban'],
        commands: ['sudo', 'su -', 'visudo', 'ssh-keygen', 'ssh-copy-id', 'gpg', 'openssl', 'iptables -L', 'firewall-cmd', 'ufw status', 'setenforce', 'getenforce', 'sestatus', 'aa-status', 'getfacl', 'setfacl', 'auditctl', 'ausearch', 'passwd', 'chage', 'usermod', 'useradd', 'userdel'],
        studyNotes: 'SELinux modes: Enforcing (blocks and logs), Permissive (logs only), Disabled. SELinux contexts: user:role:type:level. AppArmor uses profiles (enforce/complain mode). PAM (Pluggable Authentication Modules) controls authentication. SSH key auth: generate with ssh-keygen, copy public key to ~/.ssh/authorized_keys. sudo grants temporary root access; su switches user. iptables chains: INPUT, OUTPUT, FORWARD. Default policies: ACCEPT or DROP.'
      },
      {
        name: 'Scripting, Containers, and Automation',
        weight: '19%',
        objectives: [
          'Given a scenario, create simple shell scripts to automate common tasks',
          'Summarize the purpose and use of Linux containers',
          'Given a scenario, deploy and configure automation tools'
        ],
        keyTerms: ['bash', 'sh', 'variables', 'loops', 'conditionals', 'functions', 'pipes', 'redirection', 'Docker', 'container', 'image', 'Dockerfile', 'docker-compose', 'Kubernetes', 'pod', 'Ansible', 'Puppet', 'Chef', 'Terraform', 'CI/CD'],
        commands: ['#!/bin/bash', 'echo', 'read', 'if/then/fi', 'for/do/done', 'while/do/done', 'case/esac', 'function', 'export', 'source', 'docker run', 'docker build', 'docker ps', 'docker images', 'docker pull', 'docker push', 'docker-compose up', 'kubectl get pods', 'ansible-playbook'],
        studyNotes: 'Bash script basics: #!/bin/bash shebang, variables with $VAR, command substitution with $(cmd), exit codes (0=success). Pipes: cmd1 | cmd2. Redirection: > (overwrite), >> (append), < (input), 2> (stderr), 2>&1 (stderr to stdout). Docker: containers are ephemeral, images are immutable. Dockerfile: FROM, RUN, COPY, CMD, EXPOSE, ENV. Kubernetes: pods (smallest unit), deployments, services, namespaces. Ansible: agentless, uses SSH, YAML playbooks.'
      },
      {
        name: 'Troubleshooting',
        weight: '28%',
        objectives: [
          'Given a scenario, analyze and troubleshoot storage issues',
          'Given a scenario, analyze and troubleshoot network resource issues',
          'Given a scenario, analyze and troubleshoot central processing unit (CPU) and memory issues',
          'Given a scenario, analyze and troubleshoot user access and file permissions',
          'Given a scenario, use systemd to diagnose and resolve common problems with a Linux system'
        ],
        keyTerms: ['dmesg', 'journalctl', 'syslog', 'kern.log', 'auth.log', 'strace', 'ltrace', 'lsof', 'fuser', 'vmstat', 'iostat', 'sar', 'free', 'top', 'ps', 'netstat', 'ss', 'tcpdump', 'nmap', 'systemctl', 'service'],
        commands: ['dmesg', 'journalctl -xe', 'systemctl status', 'df -h', 'du -sh', 'lsof', 'fuser', 'strace', 'ltrace', 'vmstat', 'iostat', 'sar', 'free -h', 'top', 'ps aux', 'netstat -tulpn', 'ss -tulpn', 'ip addr', 'ip route', 'ping', 'traceroute', 'dig', 'nslookup', 'tcpdump', 'nmap', 'id', 'whoami', 'groups', 'ls -la', 'stat', 'getfacl'],
        studyNotes: 'Key log files: /var/log/syslog or /var/log/messages (general), /var/log/auth.log or /var/log/secure (auth), /var/log/kern.log (kernel), /var/log/dmesg (boot). journalctl: -u (unit), -f (follow), -b (boot), --since, --until. systemctl: start, stop, restart, enable, disable, status, is-active, is-enabled. Common issues: disk full (df -h, du -sh), high CPU (top, ps), memory issues (free -h, vmstat), network (ip addr, ss, ping, dig).'
      }
    ]
  },
  {
    id: 'comptia-cloudplus',
    name: 'CompTIA Cloud+',
    examCode: 'CV0-004',
    description: 'Validates the skills needed to maintain and optimize cloud infrastructure services in a vendor-neutral context.',
    passingScore: '750 (scale 100-900)',
    questionCount: 'Max 90',
    duration: '90 minutes',
    difficulty: 'Intermediate',
    prerequisites: 'CompTIA Network+ and Server+ recommended, 2-3 years IT experience',
    domains: [
      {
        name: 'Cloud Architecture and Design',
        weight: '13%',
        objectives: [
          'Compare and contrast the different types of cloud models',
          'Given a scenario, apply the appropriate deployment model',
          'Explain the factors that contribute to capacity planning',
          'Explain the importance of high availability and scaling in cloud environments'
        ],
        keyTerms: ['public cloud', 'private cloud', 'hybrid cloud', 'multi-cloud', 'community cloud', 'IaaS', 'PaaS', 'SaaS', 'FaaS', 'serverless', 'microservices', 'SOA', 'API gateway', 'auto-scaling', 'elasticity', 'HA', 'fault tolerance', 'load balancing'],
        acronyms: ['IaaS - Infrastructure as a Service', 'PaaS - Platform as a Service', 'SaaS - Software as a Service', 'FaaS - Function as a Service', 'SOA - Service-Oriented Architecture', 'HA - High Availability', 'SLA - Service Level Agreement'],
        studyNotes: 'Cloud deployment models: Public (AWS, Azure, GCP - shared infrastructure), Private (dedicated, on-premises or hosted), Hybrid (mix of public/private), Multi-cloud (multiple providers). Service models: IaaS (VMs, storage, networking), PaaS (runtime, middleware, databases), SaaS (complete applications), FaaS/Serverless (event-driven functions). Scaling: Vertical (scale up - bigger instance), Horizontal (scale out - more instances). Auto-scaling adjusts capacity based on demand.'
      },
      {
        name: 'Security',
        weight: '20%',
        objectives: [
          'Given a scenario, configure identity and access management for cloud environments',
          'Given a scenario, secure a network in a cloud environment',
          'Given a scenario, apply the appropriate OS and application security controls',
          'Given a scenario, apply data security and compliance controls in cloud environments',
          'Given a scenario, implement measures to meet security requirements'
        ],
        keyTerms: ['IAM', 'RBAC', 'MFA', 'federation', 'SAML', 'OAuth', 'OpenID Connect', 'VPC', 'security group', 'NACL', 'WAF', 'DDoS protection', 'encryption at rest', 'encryption in transit', 'KMS', 'HSM', 'CASB', 'CSPM', 'shared responsibility model'],
        acronyms: ['IAM - Identity and Access Management', 'RBAC - Role-Based Access Control', 'VPC - Virtual Private Cloud', 'NACL - Network Access Control List', 'KMS - Key Management Service', 'HSM - Hardware Security Module', 'CASB - Cloud Access Security Broker', 'CSPM - Cloud Security Posture Management'],
        studyNotes: 'Shared responsibility model: Provider responsible for security OF the cloud (hardware, infrastructure); Customer responsible for security IN the cloud (data, IAM, OS patching). VPC provides isolated network environment. Security groups are stateful (track connections); NACLs are stateless (evaluate each packet). Encryption: use provider KMS or bring your own key (BYOK). CASB provides visibility and control over cloud app usage.'
      },
      {
        name: 'Deployment',
        weight: '23%',
        objectives: [
          'Given a scenario, integrate components into a cloud solution',
          'Given a scenario, provision a cloud environment',
          'Explain the process of implementing automation and orchestration in cloud environments'
        ],
        keyTerms: ['VM', 'container', 'Kubernetes', 'Docker', 'Terraform', 'CloudFormation', 'ARM templates', 'Ansible', 'CI/CD', 'DevOps', 'GitOps', 'blue-green deployment', 'canary deployment', 'rolling update', 'immutable infrastructure', 'IaC'],
        acronyms: ['IaC - Infrastructure as Code', 'CI/CD - Continuous Integration/Continuous Deployment', 'ARM - Azure Resource Manager'],
        studyNotes: 'Infrastructure as Code (IaC): Terraform (multi-cloud, HCL), CloudFormation (AWS, JSON/YAML), ARM templates (Azure). Deployment strategies: Blue-Green (two identical environments, switch traffic), Canary (gradual rollout to subset), Rolling (update instances one by one). Containers vs VMs: containers share OS kernel (lighter, faster), VMs have full OS (more isolated). Kubernetes: orchestrates containers, provides self-healing, scaling, service discovery.'
      },
      {
        name: 'Operations and Support',
        weight: '22%',
        objectives: [
          'Given a scenario, configure logging, monitoring, and alerting to maintain operational status',
          'Given a scenario, maintain efficient operation of a cloud environment',
          'Given a scenario, optimize cloud environments'
        ],
        keyTerms: ['CloudWatch', 'Azure Monitor', 'Stackdriver', 'log aggregation', 'metrics', 'dashboards', 'alerting', 'auto-scaling', 'cost optimization', 'reserved instances', 'spot instances', 'rightsizing', 'tagging', 'backup', 'snapshot', 'DR'],
        studyNotes: 'Cloud cost optimization: Reserved instances (1-3 year commitment, up to 75% savings), Spot/Preemptible instances (cheapest, can be interrupted), On-demand (pay per use, most expensive). Rightsizing: match instance type to actual workload needs. Tagging: organize resources by project, environment, owner for cost allocation. Monitoring: collect metrics (CPU, memory, network), set alarms, create dashboards. Backup strategies: snapshots (point-in-time), cross-region replication for DR.'
      },
      {
        name: 'Troubleshooting',
        weight: '22%',
        objectives: [
          'Given a scenario, troubleshoot common cloud infrastructure deployment issues',
          'Given a scenario, troubleshoot common networking issues in cloud environments',
          'Given a scenario, troubleshoot common performance issues in cloud environments',
          'Given a scenario, troubleshoot common security issues in cloud environments'
        ],
        keyTerms: ['latency', 'throughput', 'IOPS', 'throttling', 'quota limits', 'IAM permissions', 'security group rules', 'routing tables', 'DNS resolution', 'certificate errors', 'health checks', 'load balancer', 'auto-scaling events'],
        studyNotes: 'Common cloud issues: IAM permission errors (check policies, roles, trust relationships), network connectivity (security groups, NACLs, routing tables, VPC peering), performance (CPU throttling, IOPS limits, network bandwidth), cost spikes (check billing alerts, unused resources, data transfer costs). Always check cloud provider logs and metrics first. Use cloud-native troubleshooting tools (AWS CloudTrail, Azure Activity Log, GCP Audit Logs).'
      }
    ]
  },
  {
    id: 'comptia-cysa',
    name: 'CompTIA CySA+',
    examCode: 'CS0-003',
    description: 'Applies behavioral analytics to networks and devices to prevent, detect, and combat cybersecurity threats through continuous security monitoring.',
    passingScore: '750 (scale 100-900)',
    questionCount: 'Max 85',
    duration: '165 minutes',
    difficulty: 'Advanced',
    prerequisites: 'CompTIA Security+ or equivalent, 4 years hands-on security experience',
    domains: [
      {
        name: 'Security Operations',
        weight: '33%',
        objectives: [
          'Explain the importance of system and network architecture concepts in security operations',
          'Given a scenario, analyze indicators of potentially malicious activity',
          'Given a scenario, use appropriate tools or techniques to determine malicious activity',
          'Compare and contrast threat-intelligence and threat-hunting concepts',
          'Explain the importance of efficiency and process improvement in security operations'
        ],
        keyTerms: ['SIEM', 'SOAR', 'EDR', 'XDR', 'threat intelligence', 'threat hunting', 'IoC', 'IoA', 'TTPs', 'MITRE ATT&CK', 'kill chain', 'diamond model', 'STIX', 'TAXII', 'threat feeds', 'dark web monitoring', 'OSINT'],
        acronyms: ['SIEM - Security Information and Event Management', 'SOAR - Security Orchestration Automation Response', 'EDR - Endpoint Detection and Response', 'XDR - Extended Detection and Response', 'IoC - Indicator of Compromise', 'IoA - Indicator of Attack', 'TTP - Tactics Techniques Procedures', 'STIX - Structured Threat Information Expression', 'TAXII - Trusted Automated Exchange of Intelligence Information'],
        studyNotes: 'MITRE ATT&CK framework: Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact. Cyber Kill Chain: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, C2, Actions on Objectives. Diamond Model: Adversary, Capability, Infrastructure, Victim. Threat hunting: proactive search for threats that evade existing controls.'
      },
      {
        name: 'Vulnerability Management',
        weight: '30%',
        objectives: [
          'Given a scenario, implement vulnerability scanning methods and concepts',
          'Given a scenario, analyze output from vulnerability assessment tools',
          'Given a scenario, analyze data to prioritize vulnerabilities',
          'Given a scenario, recommend controls to mitigate attacks and software vulnerabilities',
          'Explain concepts related to vulnerability response, handling, and management'
        ],
        keyTerms: ['vulnerability scanner', 'Nessus', 'OpenVAS', 'Qualys', 'CVSS', 'CVE', 'NVD', 'patch management', 'false positive', 'false negative', 'credentialed scan', 'unauthenticated scan', 'OWASP Top 10', 'CWE', 'exploit', 'PoC', 'zero-day', 'patch Tuesday'],
        acronyms: ['CVSS - Common Vulnerability Scoring System', 'CVE - Common Vulnerabilities and Exposures', 'NVD - National Vulnerability Database', 'CWE - Common Weakness Enumeration', 'OWASP - Open Web Application Security Project', 'PoC - Proof of Concept'],
        studyNotes: 'CVSS v3.1 scoring: Base (0-10), Temporal, Environmental. Severity: Critical (9.0-10.0), High (7.0-8.9), Medium (4.0-6.9), Low (0.1-3.9). OWASP Top 10 (2021): Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable Components, Auth Failures, Software Integrity Failures, Logging Failures, SSRF. Vulnerability prioritization: CVSS score + exploitability + asset criticality + exposure. Patch management: identify, evaluate, test, deploy, verify.'
      },
      {
        name: 'Incident Response and Management',
        weight: '20%',
        objectives: [
          'Explain concepts related to attack methodology frameworks',
          'Given a scenario, perform incident response activities',
          'Explain the preparation and post-incident activity phases of the incident management lifecycle'
        ],
        keyTerms: ['incident response', 'PICERL', 'containment', 'eradication', 'recovery', 'forensics', 'chain of custody', 'evidence collection', 'memory forensics', 'disk forensics', 'network forensics', 'timeline analysis', 'IOC', 'playbook', 'runbook', 'tabletop exercise'],
        studyNotes: 'Incident Response lifecycle (PICERL): Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned. Containment strategies: Short-term (isolate system), Long-term (patch/rebuild). Evidence collection order of volatility: CPU registers/cache, RAM, swap/pagefile, network connections, running processes, disk, remote logging, physical configuration. Chain of custody: document who handled evidence, when, and how. Forensic tools: Autopsy, FTK, Volatility (memory), Wireshark (network).'
      },
      {
        name: 'Reporting and Communication',
        weight: '17%',
        objectives: [
          'Explain the importance of vulnerability management reporting and communication',
          'Explain the importance of incident response reporting and communication'
        ],
        keyTerms: ['executive report', 'technical report', 'metrics', 'KPIs', 'SLA', 'MTTR', 'MTTD', 'risk score', 'remediation tracking', 'lessons learned', 'after-action report', 'root cause analysis', 'stakeholder communication'],
        acronyms: ['KPI - Key Performance Indicator', 'MTTR - Mean Time to Respond', 'MTTD - Mean Time to Detect', 'RCA - Root Cause Analysis'],
        studyNotes: 'Key security metrics: MTTD (Mean Time to Detect), MTTR (Mean Time to Respond/Repair), false positive rate, vulnerability remediation rate, patch compliance rate. Executive reports: high-level, business impact focus, avoid technical jargon. Technical reports: detailed findings, evidence, remediation steps. Root cause analysis: identify underlying cause, not just symptoms. 5 Whys technique. Lessons learned: what worked, what did not, improvements for next time.'
      }
    ]
  },
  {
    id: 'comptia-pentestplus',
    name: 'CompTIA PenTest+',
    examCode: 'PT0-003',
    description: 'Validates the skills required for penetration testing and vulnerability assessment, including planning, scoping, and managing weaknesses.',
    passingScore: '750 (scale 100-900)',
    questionCount: 'Max 85',
    duration: '165 minutes',
    difficulty: 'Advanced',
    prerequisites: 'CompTIA Security+ or equivalent, 3-4 years hands-on security experience',
    domains: [
      {
        name: 'Planning and Scoping',
        weight: '14%',
        objectives: [
          'Compare and contrast governance, risk, and compliance concepts',
          'Explain the importance of scoping and organizational/customer requirements',
          'Given a scenario, demonstrate an ethical hacking mindset by maintaining professionalism and integrity'
        ],
        keyTerms: ['rules of engagement', 'scope', 'statement of work', 'NDA', 'authorization', 'legal considerations', 'white box', 'black box', 'gray box', 'red team', 'blue team', 'purple team', 'bug bounty', 'responsible disclosure'],
        studyNotes: 'Penetration testing types: Black box (no prior knowledge), White box (full knowledge), Gray box (partial knowledge). Red team: offensive, simulates attackers. Blue team: defensive, detects and responds. Purple team: combines red and blue for collaborative improvement. Always get written authorization before testing. Rules of Engagement define scope, timing, methods, and reporting. Legal frameworks: Computer Fraud and Abuse Act (CFAA), GDPR, industry regulations.'
      },
      {
        name: 'Information Gathering and Vulnerability Scanning',
        weight: '22%',
        objectives: [
          'Given a scenario, perform passive reconnaissance',
          'Given a scenario, perform active reconnaissance',
          'Given a scenario, analyze vulnerability scan results'
        ],
        keyTerms: ['OSINT', 'passive recon', 'active recon', 'footprinting', 'enumeration', 'Shodan', 'Maltego', 'theHarvester', 'Recon-ng', 'nmap', 'Nessus', 'Nikto', 'dirb', 'gobuster', 'DNS enumeration', 'WHOIS', 'Google dorks'],
        commands: ['nmap -sV -sC -p-', 'nmap -A', 'nmap --script vuln', 'nikto -h', 'dirb', 'gobuster dir', 'theHarvester -d domain -b all', 'whois', 'dig', 'nslookup', 'fierce', 'dnsenum', 'enum4linux', 'smbclient', 'rpcclient'],
        studyNotes: 'Passive recon: gather info without touching target (WHOIS, DNS records, Google dorks, LinkedIn, Shodan). Active recon: directly interact with target (port scanning, service enumeration). Nmap scan types: -sS (SYN/stealth), -sT (TCP connect), -sU (UDP), -sV (version detection), -sC (default scripts), -O (OS detection), -A (aggressive). Google dorks: site:, filetype:, inurl:, intitle:. Shodan searches for internet-connected devices.'
      },
      {
        name: 'Attacks and Exploits',
        weight: '30%',
        objectives: [
          'Given a scenario, research attack vectors and perform network attacks',
          'Given a scenario, research attack vectors and perform application-based attacks',
          'Given a scenario, research attack vectors and perform attacks on cloud technologies',
          'Explain common attacks against specialized systems',
          'Given a scenario, perform post-exploitation techniques'
        ],
        keyTerms: ['Metasploit', 'exploit', 'payload', 'meterpreter', 'reverse shell', 'bind shell', 'privilege escalation', 'lateral movement', 'pivoting', 'pass-the-hash', 'Mimikatz', 'credential dumping', 'SQL injection', 'XSS', 'CSRF', 'SSRF', 'XXE', 'deserialization', 'buffer overflow', 'ROP chain'],
        commands: ['msfconsole', 'use exploit/', 'set RHOSTS', 'set PAYLOAD', 'exploit', 'meterpreter getuid', 'meterpreter getsystem', 'meterpreter hashdump', 'sqlmap -u URL', 'hydra', 'john', 'hashcat', 'crackmapexec', 'impacket-psexec', 'evil-winrm'],
        studyNotes: 'Metasploit workflow: search, use, show options, set options, run/exploit. Meterpreter: in-memory payload, encrypted comms. Post-exploitation: maintain access (persistence), escalate privileges, move laterally, exfiltrate data. Pass-the-hash: use NTLM hash without cracking. Mimikatz: dump credentials from Windows memory (lsass). SQL injection types: Union-based, Error-based, Blind (Boolean/Time-based). OWASP Top 10 vulnerabilities are key exam topics.'
      },
      {
        name: 'Reporting and Communication',
        weight: '18%',
        objectives: [
          'Compare and contrast important components of written reports',
          'Given a scenario, analyze the findings and recommend the appropriate remediation within a report',
          'Explain post-report delivery activities',
          'Explain the importance of communication during the penetration testing process'
        ],
        keyTerms: ['executive summary', 'technical findings', 'risk rating', 'CVSS', 'remediation recommendations', 'attack narrative', 'evidence', 'screenshots', 'proof of concept', 'retesting', 'attestation'],
        studyNotes: 'Pentest report sections: Executive Summary (business impact, high-level findings), Methodology, Findings (severity, description, evidence, remediation), Appendices. Risk ratings: Critical, High, Medium, Low, Informational. Always include: affected systems, vulnerability description, evidence/PoC, business impact, remediation steps. Retesting verifies fixes were implemented correctly. Attestation letter confirms testing was authorized.'
      },
      {
        name: 'Tools and Code Analysis',
        weight: '16%',
        objectives: [
          'Explain the basic concepts of scripting and software development',
          'Given a scenario, analyze a script or code sample for use in a penetration test',
          'Explain use cases of the following tools during the phases of a penetration test'
        ],
        keyTerms: ['Python', 'Bash', 'PowerShell', 'Ruby', 'Kali Linux', 'Parrot OS', 'Burp Suite', 'Wireshark', 'Aircrack-ng', 'Hashcat', 'John the Ripper', 'Hydra', 'Metasploit', 'BeEF', 'Cobalt Strike', 'BloodHound', 'Responder'],
        commands: ['python3 script.py', 'bash script.sh', 'powershell -exec bypass', 'burpsuite', 'wireshark', 'airmon-ng start wlan0', 'airodump-ng', 'aireplay-ng', 'aircrack-ng', 'hashcat -m 1000', 'john --wordlist=rockyou.txt', 'hydra -l user -P wordlist ssh://target'],
        studyNotes: 'Key tools by phase: Recon (nmap, theHarvester, Maltego, Shodan), Scanning (Nessus, OpenVAS, Nikto), Exploitation (Metasploit, sqlmap, Hydra), Post-exploitation (Mimikatz, BloodHound, Cobalt Strike), Reporting (Dradis, Faraday). Burp Suite: intercept/modify HTTP traffic, scanner, intruder (brute force), repeater (manual testing). Aircrack-ng suite: capture WPA handshakes, crack with wordlist. BloodHound: visualize AD attack paths.'
      }
    ]
  },
  {
    id: 'comptia-casp',
    name: 'CompTIA CASP+',
    examCode: 'CAS-005',
    description: 'The highest-level CompTIA certification for advanced security practitioners. Validates advanced-level competency in risk management, enterprise security, and research.',
    passingScore: 'Pass/Fail (no numeric score)',
    questionCount: 'Max 90',
    duration: '165 minutes',
    difficulty: 'Expert',
    prerequisites: 'CompTIA Security+ and CySA+ or equivalent, 10+ years IT experience with 5 in security',
    domains: [
      {
        name: 'Security Architecture',
        weight: '29%',
        objectives: [
          'Given a scenario, analyze requirements to design resilient systems',
          'Given a scenario, integrate software applications securely into an enterprise architecture',
          'Given a scenario, implement data security techniques for securing enterprise architecture',
          'Given a scenario, analyze security requirements and objectives to provide the appropriate authentication and authorization controls',
          'Given a set of requirements, implement secure cloud and virtualization solutions',
          'Explain how cryptography and PKI support security objectives and requirements'
        ],
        keyTerms: ['zero trust architecture', 'SASE', 'microsegmentation', 'software-defined networking', 'API security', 'OAuth 2.0', 'OIDC', 'SAML 2.0', 'federation', 'PKI', 'HSM', 'key escrow', 'certificate pinning', 'HSTS', 'CSP', 'homomorphic encryption', 'quantum cryptography', 'post-quantum cryptography'],
        studyNotes: 'Zero Trust principles: verify explicitly, use least privilege, assume breach. SASE combines SD-WAN with cloud-native security (CASB, SWG, ZTNA, FWaaS). Microsegmentation: granular network policies at workload level. API security: OAuth 2.0 for authorization, OIDC for authentication, rate limiting, input validation, API gateway. Post-quantum cryptography: NIST selected CRYSTALS-Kyber (KEM), CRYSTALS-Dilithium (signatures), FALCON, SPHINCS+. Homomorphic encryption allows computation on encrypted data.'
      },
      {
        name: 'Security Operations',
        weight: '30%',
        objectives: [
          'Given a scenario, perform threat management activities',
          'Given a scenario, analyze indicators of compromise and formulate an appropriate response',
          'Given a scenario, perform vulnerability management activities',
          'Given a scenario, use the appropriate vulnerability assessment and penetration testing techniques and tools',
          'Given a scenario, analyze vulnerabilities and recommend risk mitigations',
          'Given a scenario, use processes to reduce risk'
        ],
        keyTerms: ['threat intelligence', 'MITRE ATT&CK', 'threat modeling', 'STRIDE', 'PASTA', 'DREAD', 'attack surface management', 'red team', 'purple team', 'adversary simulation', 'deception technology', 'honeypot', 'honeynet', 'canary tokens', 'UEBA', 'NTA', 'NDR'],
        acronyms: ['STRIDE - Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege', 'PASTA - Process for Attack Simulation and Threat Analysis', 'UEBA - User and Entity Behavior Analytics', 'NTA - Network Traffic Analysis', 'NDR - Network Detection and Response'],
        studyNotes: 'Threat modeling frameworks: STRIDE (Microsoft), PASTA (risk-centric), DREAD (risk scoring). STRIDE categories: Spoofing (auth), Tampering (integrity), Repudiation (non-repudiation), Information Disclosure (confidentiality), DoS (availability), Elevation of Privilege (authorization). UEBA uses ML to detect anomalous behavior. Deception technology: honeypots (single system), honeynets (network of honeypots), canary tokens (fake credentials/files that alert when accessed).'
      },
      {
        name: 'Security Engineering and Cryptography',
        weight: '26%',
        objectives: [
          'Given a scenario, apply secure configurations to enterprise mobility',
          'Given a scenario, configure and implement endpoint security controls',
          'Explain security considerations impacting specific sectors and operational technologies',
          'Explain how cloud technology adoption impacts organizational security',
          'Given a scenario, implement the appropriate PKI solution',
          'Given a scenario, implement the appropriate cryptographic protocols and algorithms'
        ],
        keyTerms: ['MDM', 'MAM', 'EMM', 'UEM', 'BYOD', 'containerization', 'OT security', 'ICS', 'SCADA', 'Purdue model', 'air gap', 'PKI hierarchy', 'root CA', 'intermediate CA', 'CRL', 'OCSP', 'certificate stapling', 'AES-256-GCM', 'RSA-4096', 'ECC', 'ECDSA', 'TLS 1.3', 'perfect forward secrecy', 'DHE', 'ECDHE'],
        studyNotes: 'OT/ICS security: Purdue model (Level 0-4), air gaps, unidirectional gateways. SCADA systems often run legacy OS - patch carefully. PKI hierarchy: Root CA (offline, self-signed) then Intermediate CA then End-entity certificates. CRL: list of revoked certs (periodic). OCSP: real-time revocation check. OCSP stapling: server caches OCSP response. TLS 1.3: removed weak ciphers, mandatory PFS, 0-RTT resumption. ECC provides same security as RSA with smaller key sizes (256-bit ECC is approximately 3072-bit RSA).'
      },
      {
        name: 'Governance, Risk, and Compliance',
        weight: '15%',
        objectives: [
          'Given a scenario, implement the appropriate risk strategies',
          'Explain the importance of managing and mitigating vendor risk',
          'Explain compliance frameworks and legal considerations, and their organizational impact'
        ],
        keyTerms: ['risk quantification', 'FAIR', 'risk register', 'risk appetite', 'risk tolerance', 'residual risk', 'inherent risk', 'third-party risk', 'supply chain risk', 'SCRM', 'SOC 2', 'ISO 27001', 'NIST CSF', 'NIST SP 800-53', 'FedRAMP', 'CMMC', 'GDPR', 'CCPA', 'HIPAA', 'PCI-DSS'],
        acronyms: ['FAIR - Factor Analysis of Information Risk', 'SCRM - Supply Chain Risk Management', 'NIST CSF - NIST Cybersecurity Framework', 'FedRAMP - Federal Risk and Authorization Management Program', 'CMMC - Cybersecurity Maturity Model Certification', 'CCPA - California Consumer Privacy Act'],
        studyNotes: 'FAIR model: quantitative risk analysis using financial terms. Risk = Threat Event Frequency x Vulnerability x Loss Magnitude. NIST CSF functions: Identify, Protect, Detect, Respond, Recover. NIST SP 800-53: security controls catalog for federal systems. FedRAMP: cloud security authorization for US federal agencies. CMMC: DoD contractor cybersecurity requirements (Levels 1-3). SOC 2 Type I (design at point in time) vs Type II (operating effectiveness over period). ISO 27001: ISMS standard, requires risk assessment and treatment.'
      }
    ]
  }
];

export function getCertificationById(id: string): Certification | undefined {
  return CERTIFICATIONS.find(c => c.id === id);
}

export function generateFlashcardsFromCert(cert: Certification): Array<{ front: string; back: string }> {
  const cards: Array<{ front: string; back: string }> = [];

  for (const domain of cert.domains) {
    for (const term of domain.keyTerms.slice(0, 5)) {
      cards.push({
        front: `What is "${term}" in the context of ${cert.name}?`,
        back: `${term} is a key concept in the "${domain.name}" domain of ${cert.name}. ${domain.studyNotes.split('.').find(s => s.toLowerCase().includes(term.toLowerCase())) || 'Review the ' + domain.name + ' domain study notes for full details.'}`
      });
    }

    if (domain.acronyms) {
      for (const acronym of domain.acronyms.slice(0, 3)) {
        const parts = acronym.split(' - ');
        const abbr = parts[0];
        const expansion = parts.slice(1).join(' - ');
        if (abbr && expansion) {
          cards.push({
            front: `What does "${abbr}" stand for?`,
            back: expansion
          });
        }
      }
    }

    if (domain.ports) {
      for (const port of domain.ports.slice(0, 3)) {
        const spaceIdx = port.indexOf(' ');
        const portNum = port.substring(0, spaceIdx);
        const service = port.substring(spaceIdx + 1);
        if (portNum && service) {
          cards.push({
            front: `What service uses port ${portNum}?`,
            back: service
          });
        }
      }
    }
  }

  return cards.slice(0, 40);
}

export function generateQuestionsFromCert(cert: Certification, domainName?: string): Array<{
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  domain: string;
}> {
  const questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    domain: string;
  }> = [];

  const targetDomains = domainName
    ? cert.domains.filter(d => d.name === domainName)
    : cert.domains;

  for (const d of targetDomains) {
    if (d.acronyms && d.acronyms.length >= 4) {
      for (let i = 0; i < Math.min(2, d.acronyms.length); i++) {
        const acronym = d.acronyms[i];
        const parts = acronym.split(' - ');
        const abbr = parts[0];
        const expansion = parts.slice(1).join(' - ');
        if (abbr && expansion) {
          const wrongAnswers = d.acronyms
            .filter((_, idx) => idx !== i)
            .map(a => { const p = a.split(' - '); return p.slice(1).join(' - '); })
            .filter(Boolean)
            .slice(0, 3);

          if (wrongAnswers.length >= 3) {
            const options = [expansion, ...wrongAnswers].sort(() => Math.random() - 0.5);
            questions.push({
              question: `What does the acronym "${abbr}" stand for in the context of ${cert.name}?`,
              options,
              correctIndex: options.indexOf(expansion),
              explanation: `${abbr} stands for "${expansion}". This is a key concept in the ${d.name} domain.`,
              domain: d.name
            });
          }
        }
      }
    }

    if (d.ports && d.ports.length >= 4) {
      const portEntry = d.ports[0];
      const spaceIdx = portEntry.indexOf(' ');
      const portNum = portEntry.substring(0, spaceIdx);
      const service = portEntry.substring(spaceIdx + 1);
      if (portNum && service) {
        const wrongPorts = d.ports.slice(1, 4).map(p => {
          const si = p.indexOf(' ');
          return p.substring(si + 1);
        }).filter(Boolean);
        if (wrongPorts.length >= 3) {
          const options = [service, ...wrongPorts].sort(() => Math.random() - 0.5);
          questions.push({
            question: `Which service uses port ${portNum}?`,
            options,
            correctIndex: options.indexOf(service),
            explanation: `Port ${portNum} is used by ${service}. Memorizing common port numbers is essential for the ${cert.name} exam.`,
            domain: d.name
          });
        }
      }
    }

    const notesSentences = d.studyNotes.split('. ').filter(s => s.trim().length > 30);
    if (notesSentences.length > 0) {
      const correctNote = notesSentences[0].trim();
      questions.push({
        question: `Which statement best describes a key concept in the "${d.name}" domain of ${cert.name}?`,
        options: [
          correctNote,
          `The ${d.name} domain is not tested on the ${cert.name} exam`,
          `All concepts in ${d.name} are optional knowledge for ${cert.name}`,
          `The ${d.name} domain only applies to advanced practitioners`
        ],
        correctIndex: 0,
        explanation: correctNote + '. This is a fundamental concept in the ' + d.name + ' domain that is frequently tested.',
        domain: d.name
      });
    }

    if (d.keyTerms.length >= 4) {
      const correctTerm = d.keyTerms[0];
      const wrongTerms = d.keyTerms.slice(1, 4);
      const options = [correctTerm, ...wrongTerms].sort(() => Math.random() - 0.5);
      questions.push({
        question: `Which of the following is a key term in the "${d.name}" domain of ${cert.name}?`,
        options,
        correctIndex: options.indexOf(correctTerm),
        explanation: `"${correctTerm}" is a key term in the ${d.name} domain. Understanding this concept is important for the ${cert.name} exam.`,
        domain: d.name
      });
    }
  }

  return questions.sort(() => Math.random() - 0.5).slice(0, 25);
}
