import { Question } from '@/data/assessmentQuestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AssessmentQuestionProps {
  question: Question;
  selectedOption: string | null;
  onOptionSelect: (optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentQuestion: number;
  totalQuestions: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const AssessmentQuestion = ({
  question,
  selectedOption,
  onOptionSelect,
  onNext,
  onPrevious,
  currentQuestion,
  totalQuestions,
  canGoNext,
  canGoPrevious
}: AssessmentQuestionProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  const getSectionColor = (category: string) => {
    switch (category) {
      case 'psychometric':
        return 'text-blue-600';
      case 'aptitude':
        return 'text-green-600';
      case 'wiscar':
        return 'text-purple-600';
      default:
        return 'text-primary';
    }
  };

  const getSectionTitle = (category: string) => {
    switch (category) {
      case 'psychometric':
        return 'Personality & Work Style';
      case 'aptitude':
        return 'Technical Aptitude';
      case 'wiscar':
        return 'WISCAR Framework';
      default:
        return 'Assessment';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="progress-bar h-2">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Section Badge */}
        <div className="text-center mb-6">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm border ${getSectionColor(question.category)}`}>
            {getSectionTitle(question.category)}
          </span>
        </div>

        {/* Question Card */}
        <Card className="assessment-card mb-8">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed text-center">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className={`question-option ${selectedOption === option.id ? 'selected' : ''}`}
                  onClick={() => onOptionSelect(option.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 transition-colors ${
                      selectedOption === option.id 
                        ? 'bg-primary border-primary' 
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === option.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1" />
                      )}
                    </div>
                    <span className="text-gray-700">{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 assessment-button"
          >
            {currentQuestion === totalQuestions ? 'View Results' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestion;