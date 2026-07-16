export interface Profile {
  name: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  heroGreeting: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  role: string;
  year: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  category: string;
  level: number; // 0 to 100
  iconName: string; // Lucide icon name
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  points: string[];
}

export interface MessageSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
}
