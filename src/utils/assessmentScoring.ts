import { AssessmentResponse, AssessmentResult } from '@/types/assessment';
import { assessmentQuestions } from '@/data/assessmentQuestions';
import { careerPaths, alternativeCareers } from '@/types/assessment';

export const calculateAssessmentResult = (responses: AssessmentResponse[]): AssessmentResult => {
  // Calculate category scores
  const psychometricResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.category === 'psychometric';
  });
  
  const aptitudeResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.category === 'aptitude';
  });
  
  const wiscarResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.category === 'wiscar';
  });

  // Calculate average scores (0-100 scale)
  const psychometricScore = calculateCategoryScore(psychometricResponses);
  const aptitudeScore = calculateCategoryScore(aptitudeResponses);
  
  // Calculate WISCAR scores
  const wiscarScores = {
    will: calculateWiscarSubscore(wiscarResponses, 'will'),
    interest: calculateWiscarSubscore(wiscarResponses, 'interest'),
    skill: calculateWiscarSubscore(wiscarResponses, 'skill'),
    cognitive: calculateWiscarSubscore(wiscarResponses, 'cognitive'),
    abilityToLearn: calculateWiscarSubscore(wiscarResponses, 'ability_to_learn'),
    realWorldAlignment: calculateWiscarSubscore(wiscarResponses, 'real_world_alignment')
  };

  // Calculate overall score with weighted categories
  const overallScore = Math.round(
    (psychometricScore * 0.2) + 
    (aptitudeScore * 0.3) + 
    (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.4) +
    (calculateLearningAgility(responses) * 0.1)
  );

  // Generate recommendation
  const recommendation = getRecommendation(overallScore, psychometricScore, aptitudeScore, wiscarScores);
  const confidenceScore = calculateConfidenceScore(overallScore, responses);
  
  // Generate personalized feedback
  const strengths = identifyStrengths(psychometricScore, aptitudeScore, wiscarScores);
  const areasForImprovement = identifyImprovementAreas(psychometricScore, aptitudeScore, wiscarScores);
  const careerSuggestions = getCareerSuggestions(recommendation, overallScore, wiscarScores);
  const learningPath = getLearningPath(overallScore, aptitudeScore);

  return {
    psychometricScore,
    aptitudeScore,
    wiscarScores,
    overallScore,
    recommendation,
    confidenceScore,
    strengths,
    areasForImprovement,
    careerSuggestions,
    learningPath
  };
};

const calculateCategoryScore = (responses: AssessmentResponse[]): number => {
  if (responses.length === 0) return 0;
  
  const totalScore = responses.reduce((sum, response) => sum + response.score, 0);
  const maxPossibleScore = responses.length * 5; // Assuming max score is 5
  
  return Math.round((totalScore / maxPossibleScore) * 100);
};

const calculateWiscarSubscore = (responses: AssessmentResponse[], subcategory: string): number => {
  const subcategoryResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.subcategory === subcategory;
  });
  
  return calculateCategoryScore(subcategoryResponses);
};

const calculateLearningAgility = (responses: AssessmentResponse[]): number => {
  // Look for responses that indicate adaptability and learning orientation
  const learningResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.subcategory === 'ability_to_learn' || question?.text.includes('learning');
  });
  
  return calculateCategoryScore(learningResponses);
};

const getRecommendation = (
  overallScore: number, 
  psychometricScore: number, 
  aptitudeScore: number, 
  wiscarScores: any
): 'Yes' | 'Maybe' | 'No' => {
  if (overallScore >= 75 && aptitudeScore >= 70 && psychometricScore >= 65) {
    return 'Yes';
  } else if (overallScore >= 60 && (aptitudeScore >= 60 || psychometricScore >= 60)) {
    return 'Maybe';
  } else {
    return 'No';
  }
};

const calculateConfidenceScore = (overallScore: number, responses: AssessmentResponse[]): number => {
  // Factor in consistency of responses and overall score
  const consistency = calculateResponseConsistency(responses);
  return Math.round((overallScore * 0.7) + (consistency * 0.3));
};

const calculateResponseConsistency = (responses: AssessmentResponse[]): number => {
  // Simple consistency measure - can be enhanced
  const scores = responses.map(r => r.score);
  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  
  // Convert variance to consistency score (lower variance = higher consistency)
  return Math.max(0, 100 - (variance * 20));
};

const identifyStrengths = (psychometric: number, aptitude: number, wiscar: any): string[] => {
  const strengths: string[] = [];
  
  if (psychometric >= 75) strengths.push('Strong personality fit for TPM role');
  if (aptitude >= 75) strengths.push('Excellent technical reasoning and logic');
  if (wiscar.will >= 75) strengths.push('High motivation and persistence');
  if (wiscar.interest >= 75) strengths.push('Strong interest in product management');
  if (wiscar.skill >= 75) strengths.push('Well-developed communication and leadership skills');
  if (wiscar.cognitive >= 75) strengths.push('Strong analytical and strategic thinking');
  if (wiscar.abilityToLearn >= 75) strengths.push('Excellent learning agility and adaptability');
  if (wiscar.realWorldAlignment >= 75) strengths.push('Strong practical application abilities');
  
  return strengths.length > 0 ? strengths : ['Demonstrates potential in key areas'];
};

const identifyImprovementAreas = (psychometric: number, aptitude: number, wiscar: any): string[] => {
  const areas: string[] = [];
  
  if (psychometric < 60) areas.push('Develop leadership and communication skills');
  if (aptitude < 60) areas.push('Strengthen technical knowledge and logical reasoning');
  if (wiscar.will < 60) areas.push('Build persistence and goal-oriented mindset');
  if (wiscar.interest < 60) areas.push('Explore product management fundamentals');
  if (wiscar.skill < 60) areas.push('Practice stakeholder management and presentation skills');
  if (wiscar.cognitive < 60) areas.push('Enhance strategic thinking and problem-solving');
  if (wiscar.abilityToLearn < 60) areas.push('Develop growth mindset and learning strategies');
  if (wiscar.realWorldAlignment < 60) areas.push('Gain practical experience through projects');
  
  return areas;
};

const getCareerSuggestions = (recommendation: string, overallScore: number, wiscar: any): string[] => {
  if (recommendation === 'Yes') {
    return careerPaths.slice(0, 3).map(path => path.title);
  } else if (recommendation === 'Maybe') {
    if (wiscar.interest >= 70) {
      return ['Technical Product Manager', 'SaaS Product Strategist', 'Agile Project Manager'];
    } else {
      return ['Agile Project Manager', 'Business Analyst', 'Scrum Master'];
    }
  } else {
    return alternativeCareers.slice(0, 3);
  }
};

const getLearningPath = (overallScore: number, aptitudeScore: number): 'Beginner' | 'Intermediate' | 'Advanced' => {
  if (overallScore >= 75 && aptitudeScore >= 70) {
    return 'Advanced';
  } else if (overallScore >= 60 || aptitudeScore >= 60) {
    return 'Intermediate';
  } else {
    return 'Beginner';
  }
};