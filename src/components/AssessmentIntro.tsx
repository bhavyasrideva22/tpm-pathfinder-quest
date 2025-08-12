import { Brain, Target, Users, Zap, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  const features = [
    {
      icon: Brain,
      title: 'Psychometric Analysis',
      description: 'Personality traits and cognitive style evaluation'
    },
    {
      icon: Target,
      title: 'Technical Aptitude',
      description: 'Logic, reasoning, and domain knowledge assessment'
    },
    {
      icon: Users,
      title: 'WISCAR Framework',
      description: 'Comprehensive readiness across 6 key dimensions'
    },
    {
      icon: Zap,
      title: 'Personalized Results',
      description: 'Custom learning paths and career recommendations'
    }
  ];

  const careers = [
    'Technical Product Manager',
    'API Product Owner', 
    'Platform Product Manager',
    'SaaS Product Lead',
    'Software Project Strategist'
  ];

  const traits = [
    'Systems thinking',
    'Strong communication',
    'Business & technical fluency',
    'Detail orientation with strategic vision',
    'Comfort with agile, APIs, backend systems',
    'Decision-making in ambiguity'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain className="h-4 w-4" />
            Career Assessment Series
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Should I Learn to Become a{' '}
            <span className="text-primary">Technical Product Manager?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover if you're a strong fit for pursuing a career as a Technical Product Manager 
            through our comprehensive assessment of personality, aptitude, and professional readiness.
          </p>
        </div>

        {/* What is a TPM */}
        <Card className="assessment-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              What is a Technical Product Manager?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A TPM is a hybrid professional who manages product development by aligning technical feasibility, 
              business goals, and user needs. TPMs work closely with engineering, design, marketing, and stakeholders 
              to deliver successful technology products.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Typical Career Paths:</h4>
                <ul className="space-y-2">
                  {careers.map((career, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {career}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Success Traits:</h4>
                <ul className="space-y-2">
                  {traits.map((trait, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="assessment-card text-center">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Assessment Details */}
        <Card className="assessment-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Assessment Overview
            </CardTitle>
            <CardDescription>
              Complete evaluation designed by business psychologists and industry experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">~25 mins</div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">15</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-gray-600">Personalized Results</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Start Assessment
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Your responses are completely confidential and used only for generating your personalized results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;