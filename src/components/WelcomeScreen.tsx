import React from 'react';
import { Brain, Sparkles, Target, ArrowRight, LogOut, User } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  user: { name: string; email: string };
  onLogout: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, user, onLogout }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ position: 'relative', zIndex: 1, paddingTop: '80px' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* User Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-900">{user.name}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> Success Blueprint</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Unlock your unique personality type and get a personalized strategy 
            designed specifically for how you learn, work, and achieve your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personality Analysis</h3>
            <p className="text-gray-600 text-sm">
              Understand your unique traits, energy patterns, and working style
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Strategy</h3>
            <p className="text-gray-600 text-sm">
              Get personalized productivity methods and learning techniques
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Goal Roadmap</h3>
            <p className="text-gray-600 text-sm">
              Receive actionable plans tailored to your specific objectives
            </p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Start Your Journey
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>

        <p className="text-sm text-gray-500 mt-4">
          ⏱️ Takes 3-5 minutes • 🔒 Your responses are private
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;