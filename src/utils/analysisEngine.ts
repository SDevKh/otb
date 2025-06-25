import { QuestionnaireData, PersonalityAnalysis, SuccessStrategy } from '../types/questionnaire';

export function analyzePersonality(data: QuestionnaireData): PersonalityAnalysis {
  const { personality, learningStyle, energyPattern, pressureHandling } = data;
  
  // Determine personality type
  let type = '';
  let description = '';
  let strengths: string[] = [];
  let challenges: string[] = [];

  if (personality.energy === 'introvert' && personality.planning === 'planner') {
    type = 'The Strategic Architect';
    description = 'You thrive in structured, quiet environments where you can plan meticulously and execute with precision. You prefer deep work sessions and value quality over quantity in both relationships and tasks.';
    strengths = [
      'Excellent at deep, focused work',
      'Strong planning and organizational skills',
      'Thoughtful decision-making process',
      'High attention to detail',
      'Independent and self-motivated'
    ];
    challenges = [
      'May struggle with spontaneous changes',
      'Can overthink decisions',
      'Might avoid networking opportunities',
      'May procrastinate on uncertain tasks'
    ];
  } else if (personality.energy === 'extrovert' && personality.planning === 'planner') {
    type = 'The Dynamic Organizer';
    description = 'You combine social energy with structured thinking, making you excellent at leading projects and coordinating teams. You thrive on interaction while maintaining strong organizational systems.';
    strengths = [
      'Natural leadership abilities',
      'Great at team coordination',
      'Energized by collaborative planning',
      'Strong communication skills',
      'Motivates others effectively'
    ];
    challenges = [
      'May over-commit to social obligations',
      'Can be impatient with slow progress',
      'Might struggle with solo work periods',
      'May rush through detailed analysis'
    ];
  } else if (personality.energy === 'introvert' && personality.planning === 'flexible') {
    type = 'The Adaptive Analyst';
    description = 'You prefer working independently while maintaining flexibility in your approach. You excel at adapting to new information and finding creative solutions in quiet, controlled environments.';
    strengths = [
      'Highly adaptable to change',
      'Creative problem-solving abilities',
      'Works well under minimal supervision',
      'Open to new approaches and methods',
      'Strong analytical thinking'
    ];
    challenges = [
      'May lack structure in routine tasks',
      'Can struggle with strict deadlines',
      'Might avoid seeking help when needed',
      'May have difficulty with accountability'
    ];
  } else if (personality.energy === 'extrovert' && personality.planning === 'flexible') {
    type = 'The Energetic Innovator';
    description = 'You bring high energy and adaptability to everything you do. You thrive in dynamic environments, love brainstorming with others, and excel at thinking on your feet.';
    strengths = [
      'Excellent at brainstorming and ideation',
      'Highly energetic and enthusiastic',
      'Quick to adapt to new situations',
      'Great at building networks and relationships',
      'Thrives in fast-paced environments'
    ];
    challenges = [
      'May struggle with routine, detailed work',
      'Can have difficulty with long-term planning',
      'Might jump between projects too quickly',
      'May need external accountability'
    ];
  } else if (personality.energy === 'ambivert') {
    if (personality.planning === 'planner') {
      type = 'The Balanced Strategist';
      description = 'You skillfully balance social interaction with alone time while maintaining strong organizational skills. You can adapt your energy to different situations while staying focused on your goals.';
    } else if (personality.planning === 'flexible') {
      type = 'The Versatile Adapter';
      description = 'You combine social flexibility with planning adaptability, making you highly versatile. You can thrive in various environments and adjust your approach based on the situation and people involved.';
    } else {
      type = 'The Harmonious Achiever';
      description = 'You naturally balance different aspects of work and social life. You can plan when needed but also go with the flow, making you adaptable to various situations and team dynamics.';
    }
    strengths = [
      'Highly adaptable to different situations',
      'Can work well alone or in teams',
      'Balanced approach to planning and flexibility',
      'Good at reading social situations',
      'Versatile communication style'
    ];
    challenges = [
      'May struggle to identify your optimal conditions',
      'Can be indecisive about approaches',
      'Might spread energy too thin',
      'May need to experiment to find what works best'
    ];
  }

  // Adjust based on pressure handling
  if (pressureHandling === 'thrive') {
    strengths.push('Performs exceptionally well under pressure');
    strengths.push('Uses deadlines as motivation');
  } else if (pressureHandling === 'shutdown') {
    challenges.push('May become overwhelmed by high-pressure situations');
    strengths.push('Works best in calm, supportive environments');
  } else if (pressureHandling === 'avoid') {
    strengths.push('Excellent at planning ahead to avoid stress');
    challenges.push('May struggle when unexpected pressure arises');
  }

  return { type, description, strengths, challenges };
}

export function generateStrategy(data: QuestionnaireData, personality: PersonalityAnalysis): SuccessStrategy {
  const { learningStyle, energyPattern, struggles, personality: personalityData, pressureHandling, focusBreakers } = data;
  
  let productivityMethod = '';
  let routine = '';
  let learningTricks: string[] = [];
  let motivationStyle = '';
  let habitBuilding: string[] = [];
  let bonusTips: string[] = [];

  // Determine productivity method based on personality and pressure handling
  if (personalityData.energy === 'introvert' && personalityData.planning === 'planner') {
    if (pressureHandling === 'thrive') {
      productivityMethod = 'Deadline-Driven Deep Work';
      routine = 'Schedule 2-3 hour focused work blocks with built-in deadlines. Use time-blocking with buffer time for unexpected challenges. Create artificial deadlines to maintain momentum.';
    } else {
      productivityMethod = 'Deep Work Blocks';
      routine = 'Schedule 2-3 hour focused work blocks during your peak energy time. Use time-blocking to plan your entire day in advance. Take regular 15-minute breaks between sessions.';
    }
  } else if (personalityData.energy === 'extrovert' && personalityData.planning === 'planner') {
    productivityMethod = 'Structured Collaboration';
    routine = 'Combine focused work sessions with collaborative breaks. Use study groups or accountability partners. Plan social study sessions and celebrate milestones with others.';
  } else if (personalityData.energy === 'introvert' && personalityData.planning === 'flexible') {
    productivityMethod = 'Adaptive Focus Sessions';
    routine = 'Use flexible time blocks that can adjust based on your mood and energy. Allow for spontaneous deep dives when inspiration strikes. Have backup activities for low-energy periods.';
  } else if (personalityData.energy === 'extrovert' && personalityData.planning === 'flexible') {
    productivityMethod = 'Dynamic Sprint Method';
    routine = 'Work in high-energy bursts with social breaks. Change environments regularly to maintain interest. Use body doubling or co-working sessions for accountability.';
  } else {
    productivityMethod = 'Hybrid Pomodoro Plus';
    routine = 'Combine 25-minute focused sessions with longer deep work blocks as needed. Alternate between solo and collaborative work based on your energy levels throughout the day.';
  }

  // Learning tricks based on style
  switch (learningStyle) {
    case 'visual':
      learningTricks = [
        'Create colorful mind maps and diagrams',
        'Use highlighters and visual organization systems',
        'Watch educational videos and visual demonstrations',
        'Create flowcharts for complex processes',
        'Use sticky notes and visual reminders'
      ];
      break;
    case 'auditory':
      learningTricks = [
        'Record yourself explaining concepts and listen back',
        'Join study groups for discussion and debate',
        'Use audio books and podcasts for learning',
        'Read materials aloud to yourself',
        'Create songs or rhymes to remember information'
      ];
      break;
    case 'kinesthetic':
      learningTricks = [
        'Use hands-on practice and real-world applications',
        'Take walking breaks while reviewing material',
        'Use physical models and manipulatives',
        'Practice writing things out by hand',
        'Change your study environment regularly'
      ];
      break;
    case 'reading':
      learningTricks = [
        'Take detailed written notes and summaries',
        'Create comprehensive outlines and lists',
        'Rewrite information in your own words',
        'Use text-based flashcards and quizzes',
        'Keep a learning journal with key insights'
      ];
      break;
  }

  // Motivation style based on personality
  if (personalityData.energy === 'extrovert') {
    motivationStyle = 'You\'re motivated by external recognition, social accountability, and sharing your progress with others. Set up regular check-ins with friends or mentors, celebrate achievements publicly, and use competitive elements to drive your success.';
  } else if (personalityData.energy === 'introvert') {
    motivationStyle = 'You\'re driven by internal satisfaction, personal growth, and meaningful progress. Set private rewards for yourself, track your improvement over time, and focus on how achieving your goals aligns with your deeper values and purpose.';
  } else {
    motivationStyle = 'You benefit from a mix of internal and external motivation. Alternate between private reflection on your progress and sharing victories with trusted friends. Use both personal rewards and social accountability to stay motivated.';
  }

  // Habit building techniques
  if (personalityData.planning === 'planner') {
    habitBuilding = [
      'Use habit stacking - attach new habits to existing routines',
      'Create detailed weekly and monthly habit trackers',
      'Set up your environment in advance to support good habits',
      'Use implementation intentions: "When X happens, I will do Y"'
    ];
  } else if (personalityData.planning === 'flexible') {
    habitBuilding = [
      'Start with micro-habits that take less than 2 minutes',
      'Use habit bundling - pair habits with activities you enjoy',
      'Focus on identity-based habits: "I am someone who..."',
      'Allow for flexibility - aim for 80% consistency rather than perfection'
    ];
  } else {
    habitBuilding = [
      'Use the 2-minute rule to make habits easy to start',
      'Create both structured and flexible habit options',
      'Use environmental design to make good habits obvious',
      'Build in both accountability and personal rewards'
    ];
  }

  // Bonus tips based on energy pattern, struggles, pressure handling, and focus breakers
  bonusTips = [];
  
  if (energyPattern === 'morning') {
    bonusTips.push('Schedule your most important tasks before 10 AM when your energy is highest');
  } else if (energyPattern === 'night') {
    bonusTips.push('Protect your evening hours for deep work and use mornings for lighter administrative tasks');
  }

  // Tips based on pressure handling
  if (pressureHandling === 'thrive') {
    bonusTips.push('Create artificial deadlines and challenges to maintain peak performance');
    bonusTips.push('Use countdown timers and public commitments to generate healthy pressure');
  } else if (pressureHandling === 'shutdown') {
    bonusTips.push('Break large tasks into smaller, manageable chunks to reduce overwhelm');
    bonusTips.push('Practice stress-reduction techniques like deep breathing before challenging tasks');
  } else if (pressureHandling === 'avoid') {
    bonusTips.push('Use backward planning - start from your deadline and work backwards');
    bonusTips.push('Build in extra buffer time for all your projects and commitments');
  }

  // Tips based on focus breakers
  if (focusBreakers.includes('social-media')) {
    bonusTips.push('Use app blockers during focus sessions and keep your phone in another room');
  }
  if (focusBreakers.includes('boredom')) {
    bonusTips.push('Gamify your tasks with rewards and vary your activities to maintain interest');
  }
  if (focusBreakers.includes('people')) {
    bonusTips.push('Find a quiet workspace or use noise-canceling headphones during focus time');
  }
  if (focusBreakers.includes('clarity')) {
    bonusTips.push('Start each session by writing down exactly what you want to accomplish');
  }
  if (focusBreakers.includes('multitasking')) {
    bonusTips.push('Use the "one tab rule" - close everything except what you\'re currently working on');
  }

  // Tips based on struggles
  if (struggles.includes('focus')) {
    bonusTips.push('Use the "2-minute rule" - if something takes less than 2 minutes, do it immediately');
    bonusTips.push('Try the Forest app or similar tools to gamify your focus sessions');
  }

  if (struggles.includes('consistency')) {
    bonusTips.push('Track your streaks visually and celebrate small wins every 7 days');
    bonusTips.push('Create "minimum viable" versions of your habits for low-energy days');
  }

  if (struggles.includes('motivation')) {
    bonusTips.push('Connect your daily tasks to your bigger "why" - write it down and review regularly');
    bonusTips.push('Find an accountability partner who shares similar goals');
  }

  if (struggles.includes('overwhelm')) {
    bonusTips.push('Use the "rule of 3" - focus on only 3 main tasks per day');
    bonusTips.push('Do a weekly brain dump to clear mental clutter');
  }

  // Add general bonus tips
  bonusTips.push('Review and adjust your strategy every 2 weeks based on what\'s working');
  bonusTips.push('Create a "shutdown ritual" to clearly separate work time from rest time');

  return {
    productivityMethod,
    routine,
    learningTricks,
    motivationStyle,
    habitBuilding,
    bonusTips
  };
}