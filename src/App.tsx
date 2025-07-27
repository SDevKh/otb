import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionnairePage from './components/QuestionnairePage';
import ResultsPage from './components/ResultsPage';
import Settings from './components/aboutus';
import { QuestionnaireData } from './types/questionnaire';
import { Home, User, Info as SettingsIcon } from 'lucide-react';
import { NavBar } from './components/navigation';

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Know You', url: '/AuthPage', icon: User },
  { name: 'About Us', url: '/aboutus', icon: SettingsIcon },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'auth' | 'welcome' | 'questionnaire' | 'results' | 'aboutus'>('landing');
  const [authIsLogin, setAuthIsLogin] = useState(true);

  // Listen for auth success event
  React.useEffect(() => {
    const handleAuthSuccess = (event: any) => {
      const userData = event.detail.user;
      setUser({ name: userData.name, email: userData.email });
      setCurrentScreen('questionnaire');
    };
    
    window.addEventListener('authSuccess', handleAuthSuccess);
    return () => window.removeEventListener('authSuccess', handleAuthSuccess);
  }, []);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleProceedToLogin = () => {
    setAuthIsLogin(false); // Set to false to show registration form
    setCurrentScreen('auth');
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    console.log('Auth success:', userData);
    setUser(userData);
    setCurrentScreen('welcome');
  };

  const handleStartQuestionnaire = () => {
    setCurrentScreen('questionnaire');
  };

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data);
    setCurrentScreen('results');
  };

  const handleRestart = () => {
    setQuestionnaireData(null);
    setCurrentScreen('welcome');
  };

  const handleLogout = () => {
    setUser(null);
    setQuestionnaireData(null);
    setCurrentScreen('landing');
  };

  // New handler for NavBar item clicks
  const handleNavItemClick = (name: string, url: string) => {
    console.log('Nav item clicked:', name, url);
    switch (url) {
      case '/':
        setCurrentScreen('landing');
        break;
      case '/AuthPage':
        setCurrentScreen('auth');
        break;
      case '/aboutus':
        setCurrentScreen('aboutus');
        break;
      default:
        console.warn(`Unhandled navigation url: ${url}`);
    }
  };

  return (
    <div className="min-h-screen bg-white bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 ">
      {/* 👇 Add your nav bar here */}
      <NavBar items={navItems} className="z-50" onItemClick={handleNavItemClick} />

      {currentScreen === 'landing' && (
        <LandingPage onProceedToLogin={handleProceedToLogin} />
      )}


      {currentScreen === 'auth' && (
        <AuthPage isLogin={authIsLogin} />
      )}

      {currentScreen === 'welcome' && user && (
        <WelcomeScreen onStart={handleStartQuestionnaire} user={user} onLogout={handleLogout} />
      )}

      {currentScreen === 'questionnaire' && user && (
        <QuestionnairePage onComplete={handleQuestionnaireComplete} username={user.name} />
      )}

      {currentScreen === 'results' && questionnaireData && (
        <ResultsPage data={questionnaireData} onRestart={handleRestart} />
      )}

      {currentScreen === 'aboutus' && (
        <Settings />
      )}
    </div>
  );
}

export default App;
