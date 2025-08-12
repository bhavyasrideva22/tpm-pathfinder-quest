export interface AssessmentResponse {
  questionId: string;
  optionId: string;
  score: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  aptitudeScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
  overallScore: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  confidenceScore: number;
  strengths: string[];
  areasForImprovement: string[];
  careerSuggestions: string[];
  learningPath: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CareerPath {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToComplete: string;
  skills: string[];
}

export const careerPaths: CareerPath[] = [
  {
    title: 'Technical Product Manager',
    description: 'Bridge engineering & business goals, manage product development lifecycle',
    difficulty: 'Intermediate',
    timeToComplete: '6-12 months',
    skills: ['Agile/Scrum', 'API Management', 'Product Strategy', 'Stakeholder Communication']
  },
  {
    title: 'API Product Owner',
    description: 'Manage developer-facing tools and platform products',
    difficulty: 'Advanced',
    timeToComplete: '8-15 months',
    skills: ['API Design', 'Developer Experience', 'Technical Documentation', 'Platform Strategy']
  },
  {
    title: 'Platform Product Manager',
    description: 'Lead backend & infrastructure product decisions',
    difficulty: 'Advanced',
    timeToComplete: '12-18 months',
    skills: ['System Architecture', 'Cloud Platforms', 'Scalability Planning', 'DevOps Understanding']
  },
  {
    title: 'SaaS Product Strategist',
    description: 'Drive cloud-based product growth and market expansion',
    difficulty: 'Intermediate',
    timeToComplete: '6-10 months',
    skills: ['SaaS Metrics', 'Customer Success', 'Pricing Strategy', 'Market Analysis']
  },
  {
    title: 'Agile Project Manager',
    description: 'Oversee delivery with strong technical foundations',
    difficulty: 'Beginner',
    timeToComplete: '3-6 months',
    skills: ['Scrum Master Certification', 'Team Management', 'Process Optimization', 'Risk Management']
  }
];

export const alternativeCareers = [
  'Business Analyst',
  'Scrum Master', 
  'Technical Program Manager',
  'Delivery Manager',
  'Pre-sales Engineer',
  'Solutions Architect'
];