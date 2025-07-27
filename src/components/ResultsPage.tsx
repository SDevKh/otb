import React, { useState, useEffect } from 'react';
import { Brain, Clock, Target, Lightbulb, Download, RotateCcw, Star, Loader, Sparkles } from 'lucide-react';
import { QuestionnaireData } from '../types/questionnaire';
import { generateAIPersonalityAnalysis, generateAISuccessStrategy, AIPersonalityAnalysis, AISuccessStrategy } from '../services/aiService';

interface ResultsPageProps {
  data: QuestionnaireData;
  onRestart: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ data, onRestart }) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'strategy' | 'plan'>('analysis');
  const [personality, setPersonality] = useState<AIPersonalityAnalysis | null>(null);
  const [strategy, setStrategy] = useState<AISuccessStrategy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState<'personality' | 'strategy'>('personality');

  useEffect(() => {
    let isMounted = true;

    const generateAIResults = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setLoadingStage('personality');

        // Generate AI personality analysis
        console.log('🤖 Starting personality analysis...');
        const personalityAnalysis = await generateAIPersonalityAnalysis(data);
        if (isMounted) {
          setPersonality(personalityAnalysis);
          console.log('✅ Personality analysis complete');
        }

        setLoadingStage('strategy');

        // Generate AI success strategy
        console.log('🎯 Starting success strategy generation...');
        const successStrategy = await generateAISuccessStrategy(data, personalityAnalysis);
        if (isMounted) {
          setStrategy(successStrategy);
          console.log('✅ Success strategy complete');
        }

      } catch (err) {
        console.error('Error generating AI results:', err);
        if (isMounted) {
          setError('Unable to generate your personalized results. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    generateAIResults();

    return () => {
      isMounted = false;
    };
  }, [data]);

  const tabs = [
    { id: 'analysis', label: 'AI Personality Analysis', icon: Brain },
    { id: 'strategy', label: 'Success Strategy', icon: Target },
    { id: 'plan', label: 'Action Blueprint', icon: Star }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Loader className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {loadingStage === 'personality' ? 'Analyzing Your Personality...' : 'Creating Your Strategy...'}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {loadingStage === 'personality' 
              ? 'Our AI is analyzing your unique traits and characteristics'
              : 'Generating your personalized success blueprint'
            }
          </p>
          <div className="w-80 bg-gray-200 rounded-full h-3 mx-auto mb-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-1000" 
              style={{ width: loadingStage === 'personality' ? '45%' : '90%' }} 
            />
          </div>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
            
          </div>
        </div>
      </div>
    );
  }

  if (error || !personality || !strategy) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <Brain className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'We encountered an issue generating your results.'}
          </p>
          <button
            onClick={onRestart}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your AI-Powered Success Blueprint
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Personalized insights generated specifically for your unique profile
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
            Powered MongoDB Backend
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8" style={{ position: 'relative', zIndex: 100 }}>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-lg" style={{ position: 'relative', zIndex: 101 }}>
            <div className="flex space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                    style={{ position: 'relative', zIndex: 102, pointerEvents: 'auto' }}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {activeTab === 'analysis' && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                  🤖 AI Personality Analysis
                </h2>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{personality.personalityType}</h3>
                  <p className="text-gray-700 leading-relaxed">{personality.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Star className="w-4 h-4 text-green-600" />
                    </div>
                    Your Unique Strengths
                  </h3>
                  <ul className="space-y-3">
                    {personality.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-4 h-4 text-orange-600" />
                    </div>
                    Growth Opportunities
                  </h3>
                  <ul className="space-y-3">
                    {personality.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Optimal Working Style</h3>
                <p className="text-gray-700 mb-4">{personality.workingStyle}</p>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">What Motivates You Most:</h4>
                  <div className="flex flex-wrap gap-2">
                    {personality.motivationDrivers.map((driver, index) => (
                      <span key={index} className="px-3 py-1 bg-white/70 rounded-full text-sm text-gray-700 border border-indigo-200">
                        {driver}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="p-8 space-y-8">
              <div>
                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                  🎯 Your Personalized Success Strategy
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Recommended Method: {strategy.productivityMethod.split(' - ')[0]}</h3>
                  <p className="text-gray-700">{strategy.dailyRoutine}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Learning Approach</h3>
                  <ul className="space-y-2">
                    {strategy.learningApproach.map((approach, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{approach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Habit Formation</h3>
                  <ul className="space-y-2">
                    {strategy.habitFormation.map((habit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{habit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Focus Strategies</h3>
                  <ul className="space-y-2">
                    {strategy.focusStrategies.map((focus, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Pressure Management</h3>
                  <ul className="space-y-2">
                    {strategy.pressureManagement.map((pressure, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{pressure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                  💡 AI-Generated Bonus Tips
                </h2>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
                  <ul className="space-y-3">
                    {strategy.bonusTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'plan' && (
            <div className="p-8">
              <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                📋 Your 4-Week Action Blueprint
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Your Goal: {data.goals}</h3>
                <p className="text-gray-700 text-sm">AI-generated weekly plan based on your personality type:</p>
              </div>

              <div className="space-y-6">
                {Object.entries(strategy.weeklyBlueprint).map(([week, actions], index) => (
                  <div key={week} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Week {index + 1}: {week.charAt(0).toUpperCase() + week.slice(1)} Phase
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      {actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Goal Achievement Plan</h3>
                  <ul className="space-y-2 text-gray-700">
                    {strategy.goalAchievementPlan.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={onRestart}
            className="flex items-center px-6 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-full font-medium text-gray-700 hover:bg-white/90 transition-all shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Again
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Save Blueprint
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ResultsPage;