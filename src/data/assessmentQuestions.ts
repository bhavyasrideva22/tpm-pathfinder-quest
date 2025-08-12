export interface Question {
  id: string;
  text: string;
  options: Option[];
  category: 'psychometric' | 'aptitude' | 'wiscar';
  subcategory: string;
  type: 'likert' | 'multiple_choice' | 'scenario';
}

export interface Option {
  id: string;
  text: string;
  score: number;
  trait?: string;
}

export const assessmentQuestions: Question[] = [
  // Psychometric - Interest Inventory (RIASEC-aligned)
  {
    id: 'psych_1',
    text: 'I enjoy translating technical ideas into strategic business actions.',
    category: 'psychometric',
    subcategory: 'interest',
    type: 'likert',
    options: [
      { id: 'strongly_disagree', text: 'Strongly Disagree', score: 1 },
      { id: 'disagree', text: 'Disagree', score: 2 },
      { id: 'neutral', text: 'Neutral', score: 3 },
      { id: 'agree', text: 'Agree', score: 4 },
      { id: 'strongly_agree', text: 'Strongly Agree', score: 5 }
    ]
  },
  {
    id: 'psych_2',
    text: 'I like coordinating software teams to build impactful products.',
    category: 'psychometric',
    subcategory: 'interest',
    type: 'likert',
    options: [
      { id: 'strongly_disagree', text: 'Strongly Disagree', score: 1 },
      { id: 'disagree', text: 'Disagree', score: 2 },
      { id: 'neutral', text: 'Neutral', score: 3 },
      { id: 'agree', text: 'Agree', score: 4 },
      { id: 'strongly_agree', text: 'Strongly Agree', score: 5 }
    ]
  },
  {
    id: 'psych_3',
    text: 'I prefer designing processes that adapt to real-time challenges.',
    category: 'psychometric',
    subcategory: 'cognitive_style',
    type: 'likert',
    options: [
      { id: 'strongly_disagree', text: 'Strongly Disagree', score: 1 },
      { id: 'disagree', text: 'Disagree', score: 2 },
      { id: 'neutral', text: 'Neutral', score: 3 },
      { id: 'agree', text: 'Agree', score: 4 },
      { id: 'strongly_agree', text: 'Strongly Agree', score: 5 }
    ]
  },
  {
    id: 'psych_4',
    text: 'I thrive when balancing detailed planning with strategic vision.',
    category: 'psychometric',
    subcategory: 'personality',
    type: 'likert',
    options: [
      { id: 'strongly_disagree', text: 'Strongly Disagree', score: 1 },
      { id: 'disagree', text: 'Disagree', score: 2 },
      { id: 'neutral', text: 'Neutral', score: 3 },
      { id: 'agree', text: 'Agree', score: 4 },
      { id: 'strongly_agree', text: 'Strongly Agree', score: 5 }
    ]
  },
  {
    id: 'psych_5',
    text: 'I remain calm and decisive when facing conflicting stakeholder demands.',
    category: 'psychometric',
    subcategory: 'personality',
    type: 'likert',
    options: [
      { id: 'strongly_disagree', text: 'Strongly Disagree', score: 1 },
      { id: 'disagree', text: 'Disagree', score: 2 },
      { id: 'neutral', text: 'Neutral', score: 3 },
      { id: 'agree', text: 'Agree', score: 4 },
      { id: 'strongly_agree', text: 'Strongly Agree', score: 5 }
    ]
  },

  // Aptitude - General Logic & Systems Thinking
  {
    id: 'apt_1',
    text: 'If feature X reduces churn by 5% and costs $50k to develop, while feature Y increases revenue by 2% and costs $30k, which should you prioritize for maximum ROI?',
    category: 'aptitude',
    subcategory: 'logic',
    type: 'multiple_choice',
    options: [
      { id: 'feature_x', text: 'Feature X - Churn reduction has higher long-term value', score: 5 },
      { id: 'feature_y', text: 'Feature Y - Better cost-to-revenue ratio', score: 3 },
      { id: 'both_parallel', text: 'Both in parallel if budget allows', score: 2 },
      { id: 'need_more_data', text: 'Need more data on customer lifetime value', score: 4 }
    ]
  },
  {
    id: 'apt_2',
    text: 'Your engineering team says a critical API security update will take 2 weeks, but your biggest client demands a UI enhancement for next week. How do you handle this?',
    category: 'aptitude',
    subcategory: 'scenario',
    type: 'multiple_choice',
    options: [
      { id: 'security_first', text: 'Prioritize security, explain risks to client', score: 5 },
      { id: 'split_team', text: 'Split team to work on both simultaneously', score: 3 },
      { id: 'client_first', text: 'Deliver UI enhancement first, security after', score: 1 },
      { id: 'negotiate_timeline', text: 'Negotiate a compromise timeline with both parties', score: 4 }
    ]
  },

  // Technical Knowledge
  {
    id: 'tech_1',
    text: 'What is the primary purpose of an API in software development?',
    category: 'aptitude',
    subcategory: 'technical',
    type: 'multiple_choice',
    options: [
      { id: 'user_interface', text: 'To create user interfaces', score: 1 },
      { id: 'data_storage', text: 'To store data in databases', score: 2 },
      { id: 'system_communication', text: 'To enable communication between different software systems', score: 5 },
      { id: 'code_debugging', text: 'To help debug code errors', score: 1 }
    ]
  },
  {
    id: 'tech_2',
    text: 'In Agile development, what is the main purpose of a sprint retrospective?',
    category: 'aptitude',
    subcategory: 'technical',
    type: 'multiple_choice',
    options: [
      { id: 'plan_features', text: 'To plan features for the next sprint', score: 2 },
      { id: 'review_code', text: 'To review code quality', score: 1 },
      { id: 'improve_process', text: 'To reflect on and improve team processes', score: 5 },
      { id: 'report_progress', text: 'To report progress to stakeholders', score: 3 }
    ]
  },

  // WISCAR Framework
  {
    id: 'wiscar_will_1',
    text: 'When facing a complex technical challenge, I typically:',
    category: 'wiscar',
    subcategory: 'will',
    type: 'multiple_choice',
    options: [
      { id: 'persist_research', text: 'Research extensively until I find a solution', score: 5 },
      { id: 'seek_help_quickly', text: 'Ask for help from experts immediately', score: 3 },
      { id: 'find_workaround', text: 'Look for simpler workarounds', score: 2 },
      { id: 'delegate_completely', text: 'Delegate the problem to someone else', score: 1 }
    ]
  },
  {
    id: 'wiscar_interest_1',
    text: 'Which aspect of product management excites you most?',
    category: 'wiscar',
    subcategory: 'interest',
    type: 'multiple_choice',
    options: [
      { id: 'user_research', text: 'Understanding user needs and behaviors', score: 4 },
      { id: 'technical_architecture', text: 'Working with engineering on technical architecture', score: 5 },
      { id: 'market_analysis', text: 'Analyzing market trends and competition', score: 3 },
      { id: 'stakeholder_management', text: 'Managing relationships with stakeholders', score: 3 }
    ]
  },
  {
    id: 'wiscar_skill_1',
    text: 'How would you explain a complex technical concept to a non-technical executive?',
    category: 'wiscar',
    subcategory: 'skill',
    type: 'multiple_choice',
    options: [
      { id: 'detailed_technical', text: 'Provide detailed technical documentation', score: 2 },
      { id: 'business_analogy', text: 'Use business analogies and visual diagrams', score: 5 },
      { id: 'high_level_only', text: 'Keep it very high-level and brief', score: 3 },
      { id: 'delegate_explanation', text: 'Have a technical expert explain it', score: 1 }
    ]
  },
  {
    id: 'wiscar_cognitive_1',
    text: 'When prioritizing features for a product roadmap, you should primarily consider:',
    category: 'wiscar',
    subcategory: 'cognitive',
    type: 'multiple_choice',
    options: [
      { id: 'user_feedback_only', text: 'User feedback and requests', score: 3 },
      { id: 'technical_feasibility', text: 'Technical feasibility and development time', score: 3 },
      { id: 'business_metrics', text: 'Business impact and key metrics', score: 4 },
      { id: 'balanced_approach', text: 'A balanced combination of user value, business impact, and technical feasibility', score: 5 }
    ]
  },
  {
    id: 'wiscar_ability_1',
    text: 'How do you typically approach learning new technologies or methodologies?',
    category: 'wiscar',
    subcategory: 'ability_to_learn',
    type: 'multiple_choice',
    options: [
      { id: 'hands_on_projects', text: 'Jump into hands-on projects and learn by doing', score: 5 },
      { id: 'structured_courses', text: 'Take structured courses and certifications', score: 4 },
      { id: 'read_documentation', text: 'Read documentation and technical articles', score: 3 },
      { id: 'wait_for_training', text: 'Wait for formal training opportunities', score: 2 }
    ]
  },
  {
    id: 'wiscar_real_world_1',
    text: 'A major product launch is behind schedule due to unexpected technical challenges. As a TPM, your first action would be:',
    category: 'wiscar',
    subcategory: 'real_world_alignment',
    type: 'multiple_choice',
    options: [
      { id: 'assess_scope_impact', text: 'Assess the scope change impact and communicate new timelines to stakeholders', score: 5 },
      { id: 'add_more_developers', text: 'Add more developers to speed up development', score: 2 },
      { id: 'reduce_feature_scope', text: 'Immediately reduce feature scope to meet deadlines', score: 3 },
      { id: 'escalate_to_leadership', text: 'Escalate the issue to senior leadership immediately', score: 2 }
    ]
  }
];

export const assessmentSections = {
  psychometric: {
    title: 'Personality & Work Style Assessment',
    description: 'Evaluate your natural traits and preferences for TPM success',
    questions: assessmentQuestions.filter(q => q.category === 'psychometric')
  },
  aptitude: {
    title: 'Technical Aptitude & Logic',
    description: 'Test your reasoning skills and technical understanding',
    questions: assessmentQuestions.filter(q => q.category === 'aptitude')
  },
  wiscar: {
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive readiness evaluation across key dimensions',
    questions: assessmentQuestions.filter(q => q.category === 'wiscar')
  }
};