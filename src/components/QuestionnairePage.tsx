import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { QuestionnaireData } from '../types/questionnaire';
import { useTransform } from 'framer-motion';

interface QuestionnairePageProps {
  onComplete: (data: QuestionnaireData) => void;
  username: string;
}

const QuestionnairePage: React.FC<QuestionnairePageProps> = ({ onComplete, username }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    personality: { energy: '', planning: '' },
    learningStyle: '',
    energyPattern: '',
    pressureHandling: '',
    focusBreakers: [] as string[],
    struggles: [] as string[],
    goals: '',
    specificGoal: ''
  });

  const questions = [
    {
      title: "Your Energy Style",
      subtitle: "How do you typically recharge and interact with others?",
      type: "personality-energy",
      options: [
        { value: "introvert", label: "Introvert", desc: "I recharge through alone time and prefer deep, one-on-one conversations" },
        { value: "extrovert", label: "Extrovert", desc: "I gain energy from being around people and enjoy group activities" },
        { value: "ambivert", label: "Ambivert", desc: "I'm flexible - sometimes I need alone time, sometimes I crave social interaction" }
      ]
    },
    {
      title: "Your Planning Style",
      subtitle: "How do you prefer to approach tasks and deadlines?",
      type: "personality-planning",
      options: [
        { value: "planner", label: "Structured Planner", desc: "I like detailed schedules, lists, and planning everything in advance" },
        { value: "flexible", label: "Go-with-the-Flow", desc: "I prefer spontaneity and adapting as situations change" },
        { value: "mixed", label: "Balanced Approach", desc: "I like some structure but also value flexibility when needed" }
      ]
    },
    {
      title: "Your Learning Style",
      subtitle: "How do you learn and process information most effectively?",
      type: "learning",
      options: [
        { value: "visual", label: "Visual Learner", desc: "I learn best through diagrams, charts, colors, and visual aids" },
        { value: "auditory", label: "Auditory Learner", desc: "I prefer listening to explanations, discussions, and audio content" },
        { value: "kinesthetic", label: "Hands-on Learner", desc: "I learn through doing, movement, and practical experience" },
        { value: "reading", label: "Reading/Writing", desc: "I prefer text-based learning, note-taking, and written information" }
      ]
    },
    {
      title: "Your Energy Pattern",
      subtitle: "When do you feel most alert and productive?",
      type: "energy",
      options: [
        { value: "morning", label: "Morning Person", desc: "I'm most productive in the early morning hours (5 AM - 10 AM)" },
        { value: "afternoon", label: "Afternoon Peak", desc: "I hit my stride in the afternoon (11 AM - 4 PM)" },
        { value: "evening", label: "Evening Focused", desc: "I work best in the evening hours (5 PM - 9 PM)" },
        { value: "night", label: "Night Owl", desc: "I'm most creative and focused late at night (10 PM - 2 AM)" }
      ]
    },
    {
      title: "How Do You Handle Pressure?",
      subtitle: "What's your typical response when facing high-pressure situations?",
      type: "pressure",
      options: [
        { value: "thrive", label: "I Thrive Under Pressure", desc: "Deadlines and challenges energize me and bring out my best performance" },
        { value: "shutdown", label: "I Shut Down", desc: "Too much pressure overwhelms me and I tend to freeze or avoid tasks" },
        { value: "balance", label: "I Need Balance", desc: "Some pressure motivates me, but too much becomes counterproductive" },
        { value: "avoid", label: "I Avoid It", desc: "I prefer to work ahead and minimize high-pressure situations when possible" }
      ]
    },
    {
      title: "What Usually Breaks Your Focus?",
      subtitle: "What are your biggest distractions when trying to concentrate? (Select all that apply)",
      type: "focus-breakers",
      multiple: true,
      options: [
        { value: "social-media", label: "Social Media", desc: "Notifications, scrolling, or the urge to check apps" },
        { value: "boredom", label: "Boredom", desc: "When tasks feel repetitive or uninteresting" },
        { value: "people", label: "People Around Me", desc: "Conversations, noise, or activity in my environment" },
        { value: "clarity", label: "Lack of Clarity", desc: "When I'm unsure about what to do or how to proceed" },
        { value: "multitasking", label: "Multitasking", desc: "Trying to juggle multiple tasks or having too many things open" }
      ]
    },
    {
      title: "Your Current Struggles",
      subtitle: "What challenges are holding you back? (Select all that apply)",
      type: "struggles",
      multiple: true,
      options: [
        { value: "focus", label: "Difficulty Focusing", desc: "Getting distracted easily or can't concentrate for long periods" },
        { value: "consistency", label: "Lack of Consistency", desc: "Starting strong but struggling to maintain habits or routines" },
        { value: "clarity", label: "Unclear Goals", desc: "Not sure what I want to achieve or how to get there" },
        { value: "motivation", label: "Low Motivation", desc: "Feeling unmotivated or procrastinating frequently" },
        { value: "overwhelm", label: "Feeling Overwhelmed", desc: "Too many things to do, don't know where to start" },
        { value: "time", label: "Time Management", desc: "Struggling to manage time effectively or meet deadlines" }
      ]
    },
    {
      title: "Your Main Goal",
      subtitle: "What's your primary objective right now?",
      type: "goals",
      textInput: true,
      placeholder: "e.g., Pass my medical entrance exam, Build a successful business, Get fit and healthy, Learn a new skill..."
    }
  ];

  const totalSteps = questions.length;

  const handleAnswer = (value: any) => {
    const question = questions[currentStep];
    
    if (question.type === 'personality-energy') {
      setAnswers(prev => ({ ...prev, personality: { ...prev.personality, energy: value } }));
    } else if (question.type === 'personality-planning') {
      setAnswers(prev => ({ ...prev, personality: { ...prev.personality, planning: value } }));
    } else if (question.type === 'learning') {
      setAnswers(prev => ({ ...prev, learningStyle: value }));
    } else if (question.type === 'energy') {
      setAnswers(prev => ({ ...prev, energyPattern: value }));
    } else if (question.type === 'pressure') {
      setAnswers(prev => ({ ...prev, pressureHandling: value }));
    } else if (question.type === 'focus-breakers') {
      const currentBreakers = answers.focusBreakers;
      const newBreakers = currentBreakers.includes(value)
        ? currentBreakers.filter(b => b !== value)
        : [...currentBreakers, value];
      setAnswers(prev => ({ ...prev, focusBreakers: newBreakers }));
    } else if (question.type === 'struggles') {
      const currentStruggles = answers.struggles;
      const newStruggles = currentStruggles.includes(value)
        ? currentStruggles.filter(s => s !== value)
        : [...currentStruggles, value];
      setAnswers(prev => ({ ...prev, struggles: newStruggles }));
    } else if (question.type === 'goals') {
      setAnswers(prev => ({ ...prev, goals: value }));
    }
  };

  const canProceed = () => {
    const question = questions[currentStep];
    if (question.type === 'personality-energy') return answers.personality.energy;
    if (question.type === 'personality-planning') return answers.personality.planning;
    if (question.type === 'learning') return answers.learningStyle;
    if (question.type === 'energy') return answers.energyPattern;
    if (question.type === 'pressure') return answers.pressureHandling;
    if (question.type === 'focus-breakers') return answers.focusBreakers.length > 0;
    if (question.type === 'struggles') return answers.struggles.length > 0;
    if (question.type === 'goals') return answers.goals.trim().length > 0;
    return false;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers as QuestionnaireData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questions[currentStep];

  const getSelectedValue = () => {
    const question = questions[currentStep];
    if (question.type === 'personality-energy') return answers.personality.energy;
    if (question.type === 'personality-planning') return answers.personality.planning;
    if (question.type === 'learning') return answers.learningStyle;
    if (question.type === 'energy') return answers.energyPattern;
    if (question.type === 'pressure') return answers.pressureHandling;
    return '';
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.95)', overflowY: 'auto' }}>
      <div className="bg-[chartreuse] rounded-full w-52 p-3 ">
      <h1>Welcome {username}</h1>
      </div>
      <div style={{ maxWidth: '768px', margin: '48px auto', minHeight: 'calc(100vh - 96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '24px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.2)', position: 'relative', zIndex: 100000, pointerEvents: 'auto' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {currentQuestion.title}
            </h2>
            <p className="text-lg text-gray-600">
              {currentQuestion.subtitle}
            </p>
          </div>

          {currentQuestion.textInput ? (
            <div className="space-y-4">
              <textarea
                value={answers.goals}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none h-32 text-gray-900"
                style={{ position: 'relative', zIndex: 100001, pointerEvents: 'auto', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {currentQuestion.options?.map((option) => {
                const isSelected = currentQuestion.multiple
                  ? (currentQuestion.type === 'focus-breakers' 
                      ? answers.focusBreakers.includes(option.value)
                      : answers.struggles.includes(option.value))
                  : getSelectedValue() === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {option.label}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {option.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <Check className="w-6 h-6 text-purple-600 ml-4 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center px-8 py-3 rounded-full font-semibold transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === totalSteps - 1 ? 'Get My Strategy' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;