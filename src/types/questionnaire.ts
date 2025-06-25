export interface QuestionnaireData {
  personality: {
    energy: 'introvert' | 'extrovert' | 'ambivert';
    planning: 'planner' | 'flexible' | 'mixed';
  };
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  energyPattern: 'morning' | 'afternoon' | 'evening' | 'night';
  pressureHandling: 'thrive' | 'shutdown' | 'balance' | 'avoid';
  focusBreakers: string[];
  struggles: string[];
  goals: string;
  specificGoal?: string;
}

export interface PersonalityAnalysis {
  type: string;
  description: string;
  strengths: string[];
  challenges: string[];
}

export interface SuccessStrategy {
  productivityMethod: string;
  routine: string;
  learningTricks: string[];
  motivationStyle: string;
  habitBuilding: string[];
  bonusTips: string[];
}