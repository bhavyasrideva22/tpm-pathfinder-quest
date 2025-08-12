import { AssessmentResult } from '@/types/assessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Brain, 
  Zap, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  BookOpen,
  Star,
  BarChart3,
  Users,
  Lightbulb,
  Trophy
} from 'lucide-react';
import { careerPaths } from '@/types/assessment';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const AssessmentResults = ({ result, onRestart }: AssessmentResultsProps) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'text-green-600 bg-green-50 border-green-200';
      case 'Maybe': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'No': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return <Trophy className="h-5 w-5" />;
      case 'Maybe': return <Target className="h-5 w-5" />;
      case 'No': return <AlertCircle className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  const getRecommendationMessage = (recommendation: string, confidenceScore: number) => {
    switch (recommendation) {
      case 'Yes':
        return `Strong fit! With ${confidenceScore}% confidence, you show excellent potential for a TPM career.`;
      case 'Maybe':
        return `Partial readiness. With focused development, you could succeed as a TPM.`;
      case 'No':
        return `Consider alternative paths that better align with your current strengths.`;
      default:
        return 'Assessment completed.';
    }
  };

  const ScoreCard = ({ title, score, icon: Icon, description }: any) => (
    <Card className="assessment-card">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-2xl font-bold text-primary">{score}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-3">
          <div className="progress-bar h-2">
            <div 
              className="progress-fill" 
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const WiscarRadarScore = ({ label, score }: { label: string; score: number }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-24 progress-bar h-2">
          <div 
            className="progress-fill" 
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-primary w-8">{score}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-semibold text-lg mb-6 ${getRecommendationColor(result.recommendation)}`}>
            {getRecommendationIcon(result.recommendation)}
            {result.recommendation === 'Yes' ? 'Excellent Fit!' : result.recommendation === 'Maybe' ? 'Potential Fit' : 'Consider Alternatives'}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Technical Product Manager Assessment Results
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getRecommendationMessage(result.recommendation, result.confidenceScore)}
          </p>
        </div>

        {/* Overall Score */}
        <Card className="assessment-card mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Overall Assessment Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-primary mb-4">{result.overallScore}</div>
            <div className="text-gray-600 mb-4">out of 100</div>
            <div className="max-w-md mx-auto">
              <div className="progress-bar h-4">
                <div 
                  className="progress-fill" 
                  style={{ width: `${result.overallScore}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <ScoreCard
            title="Personality Fit"
            score={result.psychometricScore}
            icon={Brain}
            description="Natural traits alignment with TPM role"
          />
          <ScoreCard
            title="Technical Aptitude"
            score={result.aptitudeScore}
            icon={Zap}
            description="Logic, reasoning, and technical knowledge"
          />
          <ScoreCard
            title="WISCAR Average"
            score={Math.round(Object.values(result.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)}
            icon={Target}
            description="Comprehensive readiness evaluation"
          />
        </div>

        {/* WISCAR Breakdown */}
        <Card className="assessment-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              WISCAR Framework Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <WiscarRadarScore label="Will (Motivation)" score={result.wiscarScores.will} />
              <WiscarRadarScore label="Interest" score={result.wiscarScores.interest} />
              <WiscarRadarScore label="Skill" score={result.wiscarScores.skill} />
              <WiscarRadarScore label="Cognitive Readiness" score={result.wiscarScores.cognitive} />
              <WiscarRadarScore label="Ability to Learn" score={result.wiscarScores.abilityToLearn} />
              <WiscarRadarScore label="Real-World Alignment" score={result.wiscarScores.realWorldAlignment} />
            </div>
          </CardContent>
        </Card>

        {/* Strengths and Improvements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="assessment-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="assessment-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <TrendingUp className="h-5 w-5" />
                Areas for Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.areasForImprovement.map((area, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Career Suggestions */}
        <Card className="assessment-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.careerSuggestions.map((careerTitle, index) => {
                const career = careerPaths.find(p => p.title === careerTitle);
                return (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-gray-900 mb-2">{careerTitle}</h4>
                    {career && (
                      <>
                        <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {career.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {career.timeToComplete}
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        {result.recommendation !== 'No' && (
          <Card className="assessment-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Your Learning Path: {result.learningPath}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.learningPath === 'Beginner' && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Foundation Skills (3-6 months)</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Agile/Scrum fundamentals</li>
                      <li>• Introduction to APIs and technical concepts</li>
                      <li>• Product lifecycle basics</li>
                      <li>• Communication and presentation skills</li>
                    </ul>
                  </div>
                )}
                {result.learningPath === 'Intermediate' && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Core TPM Skills (6-12 months)</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Technical Product Management fundamentals</li>
                      <li>• Stakeholder management and communication</li>
                      <li>• MVP planning and roadmapping</li>
                      <li>• Agile project management tools</li>
                    </ul>
                  </div>
                )}
                {result.learningPath === 'Advanced' && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Advanced TPM Mastery (6-10 months)</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• System architecture and scalability</li>
                      <li>• Advanced stakeholder management</li>
                      <li>• Metrics, OKRs, and analytics</li>
                      <li>• Strategic product planning</li>
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="text-center space-y-4">
          <Button 
            onClick={onRestart}
            variant="outline"
            className="mr-4"
          >
            Take Assessment Again
          </Button>
          {result.recommendation === 'Yes' && (
            <Button className="assessment-button">
              Start Your TPM Journey
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;