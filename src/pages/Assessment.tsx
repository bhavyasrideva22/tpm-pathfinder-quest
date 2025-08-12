import { useState } from 'react';
import { assessmentQuestions } from '@/data/assessmentQuestions';
import { AssessmentResponse } from '@/types/assessment';
import { calculateAssessmentResult } from '@/utils/assessmentScoring';
import AssessmentIntro from '@/components/AssessmentIntro';
import AssessmentQuestion from '@/components/AssessmentQuestion';
import AssessmentResults from '@/components/AssessmentResults';

type AssessmentState = 'intro' | 'questions' | 'results';

const Assessment = () => {
  const [state, setState] = useState<AssessmentState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [assessmentResult, setAssessmentResult] = useState(null);

  const handleStartAssessment = () => {
    setState('questions');
    setCurrentQuestionIndex(0);
    setResponses([]);
    setCurrentResponse(null);
  };

  const handleOptionSelect = (optionId: string) => {
    setCurrentResponse(optionId);
  };

  const handleNext = () => {
    if (currentResponse) {
      const currentQuestion = assessmentQuestions[currentQuestionIndex];
      const selectedOption = currentQuestion.options.find(opt => opt.id === currentResponse);
      
      if (selectedOption) {
        const newResponse: AssessmentResponse = {
          questionId: currentQuestion.id,
          optionId: currentResponse,
          score: selectedOption.score
        };

        const updatedResponses = [...responses];
        const existingIndex = updatedResponses.findIndex(r => r.questionId === currentQuestion.id);
        
        if (existingIndex >= 0) {
          updatedResponses[existingIndex] = newResponse;
        } else {
          updatedResponses.push(newResponse);
        }

        setResponses(updatedResponses);

        if (currentQuestionIndex < assessmentQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          
          // Check if we have a response for the next question
          const nextQuestion = assessmentQuestions[currentQuestionIndex + 1];
          const nextResponse = updatedResponses.find(r => r.questionId === nextQuestion.id);
          setCurrentResponse(nextResponse ? nextResponse.optionId : null);
        } else {
          // Calculate results
          const result = calculateAssessmentResult(updatedResponses);
          setAssessmentResult(result);
          setState('results');
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Load the previous response
      const prevQuestion = assessmentQuestions[currentQuestionIndex - 1];
      const prevResponse = responses.find(r => r.questionId === prevQuestion.id);
      setCurrentResponse(prevResponse ? prevResponse.optionId : null);
    }
  };

  const handleRestart = () => {
    setState('intro');
    setCurrentQuestionIndex(0);
    setResponses([]);
    setCurrentResponse(null);
    setAssessmentResult(null);
  };

  if (state === 'intro') {
    return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
  }

  if (state === 'questions') {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    
    return (
      <AssessmentQuestion
        question={currentQuestion}
        selectedOption={currentResponse}
        onOptionSelect={handleOptionSelect}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={assessmentQuestions.length}
        canGoNext={currentResponse !== null}
        canGoPrevious={currentQuestionIndex > 0}
      />
    );
  }

  if (state === 'results' && assessmentResult) {
    return (
      <AssessmentResults
        result={assessmentResult}
        onRestart={handleRestart}
      />
    );
  }

  return null;
};

export default Assessment;