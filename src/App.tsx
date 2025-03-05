import { useState, useEffect } from 'react';
import Header from './components/Header';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubContributions from './components/GitHubContributions';
import TerminalIntro from './components/TerminalIntro';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const skipIntro = new URLSearchParams(window.location.search).get('skipIntro');
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

    if (skipIntro === 'true' || hasSeenIntro) {
      setShowIntro(false);
      setShowContent(true);
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  const [resumeData] = useState({
    name: "Jonathon Fritz",
    title: "Technologist & Leader",
    profileImage: "",
    summary: "Seasoned pro in building and scaling blockchain infrastructure, from bare-metal Kubernetes to web3 ecosystems. I fuse hands-on platform and software engineering with proven leadership—driving impactful solutions as an individual contributor or team lead.",
    showProjects: false,
    experiences: [
      {
        company: "Blocknative",
        position: "Site Reliability Engineer",
        startDate: "May 2023",
        endDate: "Present",
        description: "On-chain gas estimation infrastructure for Web3.",
        titleColor: "text-job-sre",
        achievements: [
          "Led strategic transformation from mixed systemd/unikernel architecture to containerized infrastructure, achieving 100% Kubernetes adoption with ArgoCD-based GitOps workflows and a self-service model that reduced developer friction despite limited team size",
          "Implemented bare metal Kubernetes cluster using RKE2 on Latitude hardware with Cilium for CNI and network security, supporting high-performance Reth nodes",
          "Designed and implemented auto-scaling site-to-site connectivity solution, deploying Twingate Operator with AWS Gateway Load Balancer to achieve dynamic capacity management",
          "Configured Arbitrum Orbit L3 devnet with 250ms blocktime, ensuring high availability while optimizing parent chain costs",
          "Deployed and maintained Gas Network infrastructure, a distributed oracle platform providing near real-time gas price data and predictions across 35+ blockchain networks",
          "Established Blockscout expertise for blockchain indexing, metrics collection, and smart contract verification",
          "Developed Go-based on-chain data exporter for wallet balances and transaction timestamps, enabling comprehensive blockchain monitoring in DataDog dashboards and alerts",
          "Led observability initiatives using DataDog, implementing OpenTelemetry, APM, and distributed tracing while optimizing log ingestion costs",
          "Streamlined alert management across Slack and PagerDuty, implementing intelligent alert routing and reducing alert fatigue through correlation and actionable thresholds",
          "Enhanced system reliability through automated recovery procedures and proactive monitoring",
          "Demonstrated exceptional incident response capabilities through on-call rotation, rapidly debugging and resolving critical production issues",
          "Collaborated on HashiCorp Vault implementation, consolidating secrets from Ansible, GitHub, and 1Password into a unified management system, improving security posture and operational efficiency",
          "Developed streamlined onboarding process enabling new team members to contribute effectively from week one",
          "Provided daily hands-on support and education to development team, establishing infrastructure best practices and improving team efficiency",
          "Managed mission-critical RDS infrastructure including Aurora PostgreSQL clusters, implementing automated snapshots, point-in-time recovery, and cross-region replication",
          "Implemented nOPs and Kubecost for infrastructure cost analysis, leading team initiatives that reduced infrastructure spend by 40%"
        ]
      },
      {
        company: "Pocket Network Inc.",
        position: "Head Of Infrastructure Engineering",
        startDate: "Jul 2022",
        endDate: "Jan 2023",
        description: "Decentralized Web3 Infrastructure providing blockchain RPC access at scale",
        titleColor: "text-job-head",
        achievements: [
          "Led successful migration from EC2/Docker Compose to GitOps with Kubernetes and ArgoCD across 16 global regions, significantly reducing operational costs",
          "Managed infrastructure serving over 1 billion daily requests",
          "Orchestrated operations of 50+ blockchain clients including validators, seeds, and archival nodes for Ethereum, Polygon, BSC",
          "Led migration from DataDog to VictoriaMetrics/Loki/Grafana, drastically reducing observability costs",
          "Implemented comprehensive automation for node operations including key management, staking, and auto-upgrades",
          "Led and reorganized a team of 13 infrastructure engineers into specialized functional teams",
          "Conducted regular 1:1s with team members, providing mentorship and career development guidance",
          "Spearheaded technical interviews and hiring decisions for infrastructure engineering roles",
          "Collaborated with executive leadership on infrastructure cost optimization strategies",
          "Established Multi-Cluster architecture with Kubernetes, Helm, and ArgoCD for consistent global deployments"
        ]
      },
      {
        company: "Pocket Network Inc.",
        position: "DevOps Team Lead",
        startDate: "Jan 2022",
        endDate: "Jul 2022",
        description: "Decentralized Web3 Infrastructure",
        titleColor: "text-job-lead",
        achievements: [
          "Promoted to lead the DevOps team after demonstrating technical excellence in blockchain operations",
          "Led implementation of infrastructure as code for provisioning diverse blockchain nodes",
          "Coordinated team efforts to optimize blockchain client configurations for improved performance",
          "Designed CI/CD pipelines for rapid deployment of infrastructure updates",
          "Mentored junior engineers on blockchain infrastructure best practices and protocols"
        ]
      },
      {
        company: "Pocket Network Inc.",
        position: "Sr DevOps Engineer",
        startDate: "Jul 2021",
        endDate: "Jan 2022",
        description: "Decentralized Web3 Infrastructure",
        titleColor: "text-job-engineer",
        achievements: [
          "Designed and built automated health monitoring system for blockchain nodes with HAProxy integration",
          "Provisioned and maintained diverse blockchain clients (Geth, Erigon, Polygon, BSC) to support the POKT network",
          "Implemented automated failover systems to ensure 99.9% uptime for RPC endpoints",
          "Optimized blockchain node performance through benchmarking and tuning",
          "Developed automation scripts to streamline node deployment and maintenance operations"
        ]
      },
      {
        company: "Coinmiles",
        position: "Chief Technology Officer",
        startDate: "Sep 2019",
        endDate: "Jul 2021",
        description: "Cryptocurrency rewards platform",
        titleColor: "text-job-cto",
        achievements: [
          "Promoted from Software Engineer to CTO within three months, leading all technical aspects of the platform",
          "Designed and implemented backend features including ACH and API payment processing systems",
          "Led technical team management including mentoring, hiring, and code reviews",
          "Managed cloud infrastructure operations with continuous deployment using GitLab CI",
          "Implemented security improvements and GraphQL architecture upgrades"
        ]
      },
      {
        company: "Coinmiles",
        position: "Software Engineer",
        startDate: "May 2019",
        endDate: "Sep 2019",
        description: "Cryptocurrency rewards platform",
        titleColor: "text-job-engineer",
        achievements: [
          "Developed core platform features for cryptocurrency rewards application",
          "Contributed to microservices architecture using AWS serverless technologies",
          "Collaborated on React Native mobile application development"
        ]
      },
      {
        company: "Consensus Core",
        position: "Software Engineer/DevOps",
        startDate: "May 2018",
        endDate: "May 2019",
        description: "Digital Infrastructure providing blockchain-focused data centers",
        titleColor: "text-job-engineer",
        achievements: [
          "Determined project scope and maintained independent project management workflows",
          "Designed and implemented GraphQL API and React front-end for Mining-as-a-Service application",
          "Responsible for cloud infrastructure operations with AWS CodePipeline for continuous deployment",
          "Designed and implemented LAN/WAN architecture for remote cloud mining facilities",
          "Established hardware vendor relationships and managed procurement for mining operations"
        ]
      },
      {
        company: "NextWave Technologies",
        position: "Owner, Lead Engineering Consultant",
        startDate: "Oct 2016",
        endDate: "May 2018",
        description: "Technical consulting for small businesses",
        titleColor: "text-job-consultant",
        achievements: [
          "Engaged directly with clients to determine business needs and develop solutions",
          "Designed and implemented web and mobile applications using modern JavaScript frameworks",
          "Built REST APIs for cryptocurrency startups, aggregating data from multiple exchanges",
          "Deployed applications to AWS with continuous integration using CodePipeline"
        ]
      },
      {
        company: "TELUS",
        position: "Technology Specialist",
        startDate: "Nov 2006",
        endDate: "Apr 2017",
        description: "Enterprise IT infrastructure support",
        titleColor: "text-job-specialist",
        achievements: [
          "Served as VMware team lead managing 20+ hosts and 300+ VMs across multiple sites",
          "Implemented and maintained server configuration standards and templates",
          "Automated operations workflow, reducing server provisioning time by 65%",
          "Led disaster recovery implementation for Finning International, exceeding objectives",
          "Provided 24/7 support according to rotation schedule for critical infrastructure"
        ]
      }
    ],
    educations: [
      {
        institution: "Hack Reactor",
        degree: "",
        field: "Advanced Software Engineering Immersive Program",
        startDate: "2016",
        endDate: "2016",
        description: "Intensive software engineering bootcamp focused on full-stack JavaScript development",
        achievements: [
          "Completed 800+ hours of accelerated full-stack curriculum",
          "Developed multiple web applications using React, Node.js, and related technologies"
        ]
      },
      {
        institution: "VMware",
        degree: "",
        field: "VMware Certified Professional 5 – Data Center Virtualization (VCP5-DCV)",
        startDate: "2015",
        endDate: "2015",
        description: "Professional certification in virtualization technologies"
      },
      {
        institution: "CDI College",
        degree: "",
        field: "Network Infrastructure Engineering Immersive Program",
        startDate: "2002",
        endDate: "2003",
        description: "Comprehensive program covering network design, implementation, and management"
      },
      {
        institution: "Cisco Networking Academy",
        degree: "",
        field: "Cisco Certified Network Associate (CCNA)",
        startDate: "2000",
        endDate: "2001",
        description: "Foundation in network configuration, troubleshooting, and management"
      }
    ],
    skills: [
      {
        category: "Blockchain & Web3",
        skills: [
          "Ethereum", "Arbitrum", "Optimism", "ZkStack", "Solana","Layer 2/3", "Oracles", "Geth", "Reth", "EVM","Foundry","HardHat", "Blockscout", "Smart Contracts", "Mempool Analysis", "RPC Infrastructure", "Transaction Monitoring"
        ]
      },
      {
        category: "Infrastructure & DevOps",
        skills: [
          "Kubernetes", "RKE2", "ArgoCD", "GitOps", "Cilium", "Docker", "Terraform", "AWS", "GCP", "Bare Metal", "High Availability", "Infrastructure as Code", "Site Reliability Engineering", "Disaster Recovery"
        ]
      },
      {
        category: "Observability & Security",
        skills: [
          "DataDog", "OpenTelemetry", "APM", "Prometheus", "Grafana", "PagerDuty", "Alert Management", "HashiCorp Vault", "Secrets Management", "Security Posture", "Incident Response"
        ]
      },
      {
        category: "Databases & Storage",
        skills: [
          "PostgreSQL", "Aurora", "RDS", "MDBX", "MongoDB", "High-Performance Storage", "Replication", "Backup Strategies", "Data Migration"
        ]
      },
      {
        category: "Development & Architecture",
        skills: [
          "Go", "Python", "TypeScript", "Rust","React", "Node.js", "GraphQL", "REST APIs", "Microservices", "System Design", "Performance Optimization"
        ]
      },
      {
        category: "Leadership & Operations",
        skills: [
          "Technical Leadership", "Team Mentorship", "Infrastructure Strategy", "Cost Optimization", "Vendor Management", "Documentation", "Process Improvement", "On-Call Management"
        ]
      }
    ],
    projects: [
      {
        title: "Blockchain Health Monitoring System",
        description: "Designed and developed an application that monitors blockchain node health and automatically configures HAProxy for failover, ensuring high availability of RPC endpoints",
        technologies: ["Python", "HAProxy", "Prometheus", "Shell Scripting", "Geth", "Erigon", "Polygon", "BSC"]
      },
      {
        title: "Blockchain Transaction Monitoring",
        description: "Designed and implemented a high-availability multi-region infrastructure for monitoring Ethereum transactions with sub-second latency",
        technologies: ["Kubernetes", "Terraform", "Go", "WebSockets", "Prometheus", "Grafana"]
      },
      {
        title: "Decentralized Node Infrastructure",
        description: "Led development of infrastructure automation for decentralized blockchain node deployment across multiple cloud providers",
        technologies: ["Docker", "Ansible", "AWS", "GCP", "CI/CD", "Monitoring"]
      },
      {
        title: "Mempool Analysis Tools",
        description: "Built real-time analytics and visualization tools for blockchain mempool data to optimize transaction strategies",
        technologies: ["React", "TypeScript", "Node.js", "GraphQL", "Time-series Databases"]
      }
    ],
    contact: {
      email: "j@jonathonfritz.com",
      phone: "",
      location: "Victoria, British Columbia, Canada",
      linkedin: "https://www.linkedin.com/in/jonathonfritz",
      github: "https://github.com/jonathonjulian",
      website: ""
    }
  });

  return (
    <>
      {showIntro && !showContent && (
        <TerminalIntro onComplete={handleIntroComplete} />
      )}

      {showContent && (
        <div className="bg-[#121212] text-white min-h-screen dark-resume fade-in">
          <div className="container mx-auto px-3 py-7 max-w-[1300px] relative">
            <div className="bg-[#1c1c1c] rounded-lg shadow-xl border border-[#2a2a2a] resume-glow">
              <div className="header-section">
                <Header
                  name={resumeData.name}
                  title={resumeData.title}
                  profileImage={resumeData.profileImage}
                  summary={resumeData.summary}
                  showTitle={false}
                  contact={resumeData.contact}
                />
              </div>

              <main className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="md:col-span-1">
                  <div className="skills-section">
                    <Skills skills={resumeData.skills} />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="experience-section">
                    <Experience experiences={resumeData.experiences} />
                  </div>
                  <div className="github-section">
                    <GitHubContributions username={resumeData.contact.github.split('/').pop() || "jonathonjulian"} />
                  </div>
                  <div className="education-section">
                    <Education educations={resumeData.educations} />
                  </div>
                  {resumeData.showProjects && (
                    <div className="projects-section">
                      <Projects projects={resumeData.projects} />
                    </div>
                  )}
                </div>
              </main>

              <div className="footer-section">
                <footer className="px-4 py-3 border-t border-gray-800 bg-[#161616]">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="text-gray-500 text-sm">
                      © {new Date().getFullYear()} {resumeData.name}
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
