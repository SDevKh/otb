import { QuestionnaireData } from '../types/questionnaire';

export interface AIPersonalityAnalysis {
  personalityType: string;
  description: string;
  strengths: string[];
  challenges: string[];
  workingStyle: string;
  motivationDrivers: string[];
}

export interface AISuccessStrategy {
  productivityMethod: string;
  dailyRoutine: string;
  learningApproach: string[];
  habitFormation: string[];
  motivationTechniques: string[];
  focusStrategies: string[];
  pressureManagement: string[];
  goalAchievementPlan: string[];
  weeklyBlueprint: {
    week1: string[];
    week2: string[];
    week3: string[];
    week4: string[];
  };
  bonusTips: string[];
}

// Use Node.js backend for AI analysis
export async function generateAIPersonalityAnalysis(data: QuestionnaireData): Promise<AIPersonalityAnalysis> {
  console.log('🤖 Generating AI personality analysis via Node.js backend...');
  
  try {
    const apiUrl = 'https://otb-server-production.up.railway.app/api';
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.warn('No auth token found, using intelligent fallback');
      return generateIntelligentPersonalityAnalysis(data);
    }

    const response = await fetch(`${apiUrl}/analysis/generate-personality`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: 'personality',
        data: data
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Backend API failed:', errorText);
      return generateIntelligentPersonalityAnalysis(data);
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      console.log('✅ AI personality analysis generated successfully');
      return result.data;
    } else {
      console.warn('Backend returned error:', result.error);
      return generateIntelligentPersonalityAnalysis(data);
    }
    
  } catch (error) {
    console.warn('Error calling backend API, using intelligent fallback:', error);
    return generateIntelligentPersonalityAnalysis(data);
  }
}

export async function generateAISuccessStrategy(data: QuestionnaireData, personality: AIPersonalityAnalysis): Promise<AISuccessStrategy> {
  console.log('🎯 Generating AI success strategy via Node.js backend...');
  
  try {
    const apiUrl = 'https://otb-server-production.up.railway.app/api';
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.warn('No auth token found, using intelligent fallback');
      return generateIntelligentSuccessStrategy(data, personality);
    }

    const response = await fetch(`${apiUrl}/analysis/generate-strategy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: 'strategy',
        data: {
          questionnaireData: data,
          personalityAnalysis: personality
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Backend API failed:', errorText);
      return generateIntelligentSuccessStrategy(data, personality);
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      console.log('✅ AI success strategy generated successfully');
      return result.data;
    } else {
      console.warn('Backend returned error:', result.error);
      return generateIntelligentSuccessStrategy(data, personality);
    }
    
  } catch (error) {
    console.warn('Error calling backend API, using intelligent fallback:', error);
    return generateIntelligentSuccessStrategy(data, personality);
  }
}

// Intelligent fallback analysis based on questionnaire responses
function generateIntelligentPersonalityAnalysis(data: QuestionnaireData): AIPersonalityAnalysis {
  let personalityType = '';
  let description = '';
  const strengths: string[] = [];
  const challenges: string[] = [];
  let workingStyle = '';
  const motivationDrivers: string[] = [];

  // Determine personality type based on energy and planning style
  if (data.personality.energy === 'introvert' && data.personality.planning === 'planner') {
    personalityType = 'The Strategic Architect';
    description = 'You thrive in structured environments where you can plan meticulously and execute with precision. Your introverted nature allows for deep focus and thoughtful decision-making, making you excellent at creating detailed roadmaps to success.';
    workingStyle = 'You work best in quiet, organized spaces with clear timelines and minimal interruptions. You prefer to plan thoroughly before taking action and excel in environments that reward careful preparation.';
    strengths.push('Exceptional planning and organizational abilities', 'Deep focus and sustained concentration', 'Methodical approach to complex problems', 'Strong attention to detail and quality', 'Independent and self-motivated work style', 'Excellent at anticipating potential challenges');
    challenges.push('May overthink decisions and delay action', 'Could struggle with unexpected changes or interruptions', 'Might avoid networking or collaborative opportunities', 'May be overly critical of imperfect work');
    motivationDrivers.push('Clear structure and well-defined goals', 'Achieving planned milestones on schedule', 'Mastery through thorough preparation', 'Recognition for quality and precision');
  } else if (data.personality.energy === 'introvert' && data.personality.planning === 'flexible') {
    personalityType = 'The Adaptive Innovator';
    description = 'You combine introspective thinking with flexible execution, preferring to work independently while maintaining the freedom to adjust your approach as you learn and discover new insights along the way.';
    workingStyle = 'You work best with flexible schedules that allow for deep work sessions when inspiration strikes, without rigid constraints that might stifle your creative problem-solving abilities.';
    strengths.push('Creative and innovative problem-solving', 'High adaptability to changing circumstances', 'Independent and self-directed work style', 'Ability to see unique solutions others miss', 'Comfortable with ambiguity and uncertainty', 'Strong intuitive decision-making');
    challenges.push('May struggle with strict deadlines or rigid structures', 'Could benefit from more external accountability', 'Might procrastinate on routine or mundane tasks', 'May have difficulty with highly collaborative environments');
    motivationDrivers.push('Creative freedom and autonomy', 'Learning through exploration and discovery', 'Personal growth and self-improvement', 'Solving interesting and challenging problems');
  } else if (data.personality.energy === 'extrovert' && data.personality.planning === 'planner') {
    personalityType = 'The Dynamic Organizer';
    description = 'You excel at bringing people together around well-structured plans and clear objectives. Your energy comes from collaboration while your planning nature ensures goals are met efficiently and effectively.';
    workingStyle = 'You thrive in collaborative environments with clear goals, regular check-ins, and opportunities to lead, coordinate, or work closely with others toward shared objectives.';
    strengths.push('Natural leadership and team coordination abilities', 'Excellent communication and interpersonal skills', 'Strong goal-oriented execution and follow-through', 'Ability to motivate and inspire others', 'Skilled at managing multiple stakeholders', 'Great at turning vision into actionable plans');
    challenges.push('May become impatient with slow progress or indecision', 'Could overwhelm others with enthusiasm or pace', 'Might struggle with solo work for extended periods', 'May take on too many commitments');
    motivationDrivers.push('Team achievements and collaborative success', 'Leadership opportunities and recognition', 'Visible progress and measurable results', 'Building relationships while achieving goals');
  } else if (data.personality.energy === 'extrovert' && data.personality.planning === 'flexible') {
    personalityType = 'The Energetic Explorer';
    description = 'You bring enthusiasm and adaptability to everything you do, thriving on variety, social interaction, and the excitement of discovering new approaches to challenges as they arise.';
    workingStyle = 'You work best in dynamic, social environments where you can collaborate, brainstorm, and pivot quickly based on new information, opportunities, and the energy of those around you.';
    strengths.push('High energy and infectious enthusiasm', 'Excellent networking and relationship-building abilities', 'Quick adaptation to changing circumstances', 'Natural ability to inspire and motivate others', 'Comfortable with ambiguity and rapid change', 'Strong improvisational and creative thinking skills');
    challenges.push('May struggle with routine or repetitive tasks', 'Could benefit from structured accountability systems', 'Might have difficulty with long-term detailed planning', 'May become bored with projects that lack variety');
    motivationDrivers.push('Variety and new experiences', 'Social recognition and peer acknowledgment', 'Collaborative achievements and team success', 'Opportunities to influence and inspire others');
  } else {
    // Ambivert cases
    personalityType = 'The Balanced Strategist';
    description = 'You skillfully balance social interaction with alone time while maintaining strong organizational skills. You can adapt your energy to different situations while staying focused on your goals.';
    workingStyle = 'You have the flexibility to work well both independently and in teams, adapting your approach based on the situation, project requirements, and your current energy levels.';
    strengths.push('Highly adaptable to different work environments', 'Can work effectively alone or in teams', 'Balanced approach to planning and flexibility', 'Good at reading and responding to social situations', 'Versatile communication and collaboration style', 'Able to bridge different personality types');
    challenges.push('May struggle to identify your optimal working conditions', 'Could be indecisive about which approach to take', 'Might spread energy too thin across different activities', 'May need to experiment to find what works best');
    motivationDrivers.push('Variety in work environments and approaches', 'Balance between independence and collaboration', 'Opportunities to use different skills and strengths', 'Flexible goals that can be achieved multiple ways');
  }

  // Add learning style specific strengths
  if (data.learningStyle === 'visual') {
    strengths.push('Strong visual processing and pattern recognition abilities', 'Excellent at creating and interpreting charts, diagrams, and visual aids');
  } else if (data.learningStyle === 'auditory') {
    strengths.push('Great at processing and retaining verbal information', 'Strong listening and communication skills in discussions');
  } else if (data.learningStyle === 'kinesthetic') {
    strengths.push('Learn best through hands-on experience and practical application', 'Strong ability to understand through doing and experimentation');
  } else {
    strengths.push('Versatile learning approach that adapts to different information types', 'Can effectively process both written and visual information');
  }

  // Add energy pattern insights
  if (data.energyPattern === 'morning') {
    motivationDrivers.push('Early morning productivity and achievement');
    workingStyle += ' You perform best during morning hours when your energy and focus are naturally at their highest levels.';
  } else if (data.energyPattern === 'evening') {
    motivationDrivers.push('Evening focus sessions and creative work');
    workingStyle += ' You hit your stride in the evening hours when you can dive deep into focused, meaningful work.';
  } else if (data.energyPattern === 'night') {
    motivationDrivers.push('Late-night deep work and creative sessions');
    workingStyle += ' You do your best work during late evening and night hours when distractions are minimal.';
  } else {
    motivationDrivers.push('Flexible scheduling that works with your natural rhythms');
    workingStyle += ' You benefit from identifying and working with your natural energy fluctuations throughout the day.';
  }

  // Add pressure handling insights
  if (data.pressureHandling === 'thrive') {
    strengths.push('Performs exceptionally well under pressure and tight deadlines', 'Energized and motivated by challenging situations and high stakes');
  } else if (data.pressureHandling === 'balance') {
    strengths.push('Maintains steady performance under moderate pressure', 'Good at managing stress while staying productive');
  } else {
    challenges.push('Benefits from pressure management techniques and calm environments');
    motivationDrivers.push('Supportive, low-pressure environments that encourage steady progress');
  }

  return {
    personalityType,
    description,
    strengths,
    challenges,
    workingStyle,
    motivationDrivers
  };
}

function generateIntelligentSuccessStrategy(data: QuestionnaireData, personality: AIPersonalityAnalysis): AISuccessStrategy {
  const strategy: AISuccessStrategy = {
    productivityMethod: '',
    dailyRoutine: '',
    learningApproach: [],
    habitFormation: [],
    motivationTechniques: [],
    focusStrategies: [],
    pressureManagement: [],
    goalAchievementPlan: [],
    weeklyBlueprint: {
      week1: [],
      week2: [],
      week3: [],
      week4: []
    },
    bonusTips: []
  };

  // Determine productivity method based on personality
  if (data.personality.planning === 'planner') {
    if (data.personality.energy === 'extrovert') {
      strategy.productivityMethod = 'Collaborative Time-blocking - Use detailed calendar blocking combined with regular team check-ins and accountability partnerships to maintain structure while leveraging your social energy.';
    } else {
      strategy.productivityMethod = 'Deep Work Time-blocking - Schedule 2-3 hour focused work blocks during your peak energy times with detailed daily agendas and clear priorities for maximum productivity.';
    }
  } else {
    if (data.personality.energy === 'extrovert') {
      strategy.productivityMethod = 'Dynamic Sprint Method - Work in high-energy bursts with social accountability, changing environments and collaborating with others to maintain engagement and momentum.';
    } else {
      strategy.productivityMethod = 'Adaptive Focus Sessions - Use flexible time blocks that adjust based on your mood and energy, allowing for spontaneous deep dives when inspiration strikes.';
    }
  }

  // Create daily routine based on energy pattern and personality
  if (data.energyPattern === 'morning') {
    if (data.personality.energy === 'extrovert') {
      strategy.dailyRoutine = 'Start with your most challenging work between 6-10 AM when your energy peaks. Schedule collaborative meetings and team work for late morning. Use afternoons for lighter tasks and relationship building. End with planning and social check-ins.';
    } else {
      strategy.dailyRoutine = 'Begin with 2-3 hours of deep, focused work between 6-10 AM when your mind is sharpest. Schedule meetings and collaborative work for late morning. Use afternoons for routine tasks and planning. End with quiet reflection and next-day preparation.';
    }
  } else if (data.energyPattern === 'evening') {
    strategy.dailyRoutine = 'Use mornings for routine tasks, planning, and lighter work. Save your most important and challenging tasks for 6-10 PM when you naturally focus best. Begin each day with gentle planning and end with your peak performance work.';
  } else if (data.energyPattern === 'night') {
    strategy.dailyRoutine = 'Structure your day to build toward evening productivity. Use mornings and afternoons for preparation, research, and lighter tasks. Reserve 9 PM - 1 AM for your most important deep work when your mind is naturally most active.';
  } else {
    strategy.dailyRoutine = 'Track your energy patterns for one week to identify your personal peak hours. Once identified, schedule your most important work during these times and use lower-energy periods for routine tasks and planning.';
  }

  // Learning approach based on learning style
  if (data.learningStyle === 'visual') {
    strategy.learningApproach = [
      'Create detailed mind maps and visual diagrams for complex concepts and processes',
      'Use color-coding systems for organization, note-taking, and memory enhancement',
      'Watch educational videos, tutorials, and visual demonstrations related to your goals',
      'Create infographics, charts, and visual progress trackers to monitor your advancement',
      'Use visual goal boards, vision boards, and image-based reminders',
      'Draw out processes, timelines, and relationships between different concepts',
      'Utilize visual learning apps and tools that present information graphically'
    ];
  } else if (data.learningStyle === 'auditory') {
    strategy.learningApproach = [
      'Listen to podcasts, audiobooks, and audio courses related to your field of interest',
      'Discuss your learning with others, teach concepts aloud, or join study groups',
      'Use voice recordings to capture ideas, review material, and reinforce learning',
      'Participate in webinars, online discussions, and verbal Q&A sessions',
      'Practice explaining concepts in your own words to solidify understanding',
      'Use music or rhythmic patterns to help memorize important information',
      'Seek out mentors or experts you can have regular conversations with'
    ];
  } else if (data.learningStyle === 'kinesthetic') {
    strategy.learningApproach = [
      'Practice skills through immediate hands-on application and real-world projects',
      'Take detailed notes by hand to improve retention and understanding',
      'Use physical movement while learning - walking meetings, standing desk, or pacing',
      'Create physical models, prototypes, or tangible representations when possible',
      'Break all learning into active, practical exercises rather than passive consumption',
      'Use role-playing, simulations, and interactive learning experiences',
      'Apply new knowledge immediately in real situations to reinforce learning'
    ];
  } else {
    strategy.learningApproach = [
      'Combine multiple learning methods for maximum retention and understanding',
      'Read comprehensive materials and take detailed written notes and summaries',
      'Create outlines, lists, and written analyses of key concepts',
      'Use text-based flashcards, quizzes, and written self-assessments',
      'Keep a detailed learning journal with insights, questions, and reflections',
      'Rewrite information in your own words to ensure comprehension',
      'Experiment with different approaches to find your optimal learning style'
    ];
  }

  // Habit formation based on planning style and struggles
  if (data.personality.planning === 'planner') {
    strategy.habitFormation = [
      'Use detailed habit tracking with apps, journals, or spreadsheets to monitor progress',
      'Create specific implementation intentions: "When X happens, I will do Y in location Z"',
      'Build new habits into your existing structured routines and established schedules',
      'Set up your physical environment in advance to support and trigger good habits',
      'Plan for potential obstacles and create detailed if-then scenarios for challenges',
      'Review and systematically adjust your habit systems on a weekly basis'
    ];
  } else {
    strategy.habitFormation = [
      'Start with micro-habits that take less than 2 minutes to reduce resistance',
      'Use habit stacking - attach new habits to existing activities you already do',
      'Focus on identity-based habits: "I am someone who..." rather than outcome-based goals',
      'Allow for flexibility and imperfection - aim for 80% consistency rather than perfection',
      'Create multiple easy entry points and backup options for different situations',
      'Celebrate small wins immediately to build positive associations with new behaviors'
    ];
  }

  // Motivation techniques based on personality and energy type
  strategy.motivationTechniques = [
    'Set up a personalized reward system for achieving weekly and monthly milestones',
    'Track your progress visually to see concrete evidence of how far you\'ve come',
    'Regularly remind yourself of your deeper "why" and connect daily tasks to bigger purpose',
    'Break large goals into smaller, achievable victories that provide frequent wins',
    'Create accountability systems that match your personality and preferences'
  ];

  // Add personality-specific motivation
  if (data.personality.energy === 'extrovert') {
    strategy.motivationTechniques.push('Share your progress with friends, family, or online communities for external accountability and encouragement');
    strategy.motivationTechniques.push('Join groups, communities, or find partners who share similar goals for mutual support and motivation');
  } else {
    strategy.motivationTechniques.push('Create regular personal reflection time to assess your progress and celebrate private achievements');
    strategy.motivationTechniques.push('Keep a detailed private journal of your achievements, learnings, and personal growth milestones');
  }

  // Focus strategies based on focus breakers and personality
  strategy.focusStrategies = [
    'Identify and fiercely protect your peak focus hours from distractions and interruptions',
    'Create a dedicated, organized workspace that\'s free from your main sources of distraction',
    'Use time-boxing methods like Pomodoro Technique or custom focus blocks that work for you',
    'Turn off all non-essential notifications during focused work sessions',
    'Practice single-tasking - commit fully to one important task at a time'
  ];

  // Add specific strategies for their focus breakers
  if (data.focusBreakers.includes('social-media')) {
    strategy.focusStrategies.push('Use app blockers, website filters, or keep your phone in another room during work sessions');
  }
  if (data.focusBreakers.includes('boredom')) {
    strategy.focusStrategies.push('Gamify your tasks with rewards, timers, and variety to maintain interest and engagement');
  }
  if (data.focusBreakers.includes('people')) {
    strategy.focusStrategies.push('Find quiet workspaces, use noise-canceling headphones, or establish "do not disturb" signals');
  }
  if (data.focusBreakers.includes('clarity')) {
    strategy.focusStrategies.push('Start each work session by writing down exactly what you want to accomplish and why it matters');
  }
  if (data.focusBreakers.includes('multitasking')) {
    strategy.focusStrategies.push('Use the "one tab rule" - close everything except what you\'re currently working on to avoid temptation');
  }

  // Pressure management based on handling style
  if (data.pressureHandling === 'thrive') {
    strategy.pressureManagement = [
      'Create artificial deadlines and challenges to maintain your high-pressure energy and motivation',
      'Use time constraints and countdown timers as powerful motivation tools',
      'Channel pressure into focused action rather than anxiety by having clear action plans',
      'Set up accountability systems and public commitments that create positive pressure',
      'Break large projects into sprint-like challenges with tight but achievable deadlines'
    ];
  } else if (data.pressureHandling === 'balance') {
    strategy.pressureManagement = [
      'Break large, overwhelming tasks into smaller, more manageable pieces',
      'Create buffer time in your schedules for unexpected challenges and delays',
      'Practice stress-reduction techniques like deep breathing, meditation, or brief walks',
      'Maintain perspective by focusing on what you can control rather than external factors',
      'Use moderate pressure as motivation while having stress-relief strategies ready'
    ];
  } else {
    strategy.pressureManagement = [
      'Start important tasks well before deadlines to avoid last-minute stress and panic',
      'Practice daily relaxation techniques like meditation, deep breathing, or gentle exercise',
      'Create calm, organized, and supportive environments for important work',
      'Build in extra time for all tasks and projects to reduce time pressure',
      'Focus on progress over perfection to reduce self-imposed pressure and criticism',
      'Develop a support network you can turn to when feeling overwhelmed'
    ];
  }

  // Goal achievement plan tailored to their specific goal and personality
  strategy.goalAchievementPlan = [
    'Define your goal in specific, measurable terms with a clear deadline and success criteria',
    'Break your main goal into 4-6 major milestones that feel achievable and meaningful',
    'Identify the key skills, knowledge, or resources you need to develop or acquire',
    'Create a weekly action plan with 2-3 specific, concrete tasks that move you forward',
    'Set up tracking and accountability systems that match your personality and preferences',
    'Schedule regular weekly reviews to assess progress and adjust your approach as needed',
    'Identify potential obstacles in advance and create detailed contingency plans',
    'Connect with mentors, experts, or communities in your goal area for guidance and support'
  ];

  // Weekly blueprint tailored to their goal and personality
  strategy.weeklyBlueprint = {
    week1: [
      'Set up all your tracking, organization, and workspace systems for success',
      'Create your ideal environment and eliminate or minimize major distractions',
      'Start with the smallest possible version of your new habits to build momentum',
      'Identify and connect with at least one person who can support or guide your goal',
      'Complete a detailed assessment of your current situation and starting point',
      'Establish your daily routine and schedule your most important work during peak energy times'
    ],
    week2: [
      'Gradually increase the intensity, duration, or complexity of your new habits',
      'Implement and test your focus strategies during all work sessions',
      'Actively seek out and consume learning resources specific to your goal area',
      'Practice your pressure management techniques in real situations',
      'Review and adjust your systems based on what you learned in week 1',
      'Begin applying new knowledge or skills in practical, real-world contexts'
    ],
    week3: [
      'Challenge yourself by stepping slightly outside your comfort zone',
      'Apply what you\'ve learned in practical, real-world situations with higher stakes',
      'Seek feedback from others on your progress, approach, and areas for improvement',
      'Optimize your daily routine and systems based on what\'s working best for you',
      'Celebrate your progress and acknowledge how much you\'ve grown and accomplished',
      'Identify and address any remaining obstacles or challenges that are holding you back'
    ],
    week4: [
      'Conduct a comprehensive evaluation of your overall progress toward your goal',
      'Identify which strategies, techniques, and approaches have been most effective',
      'Plan your approach for the next month based on your learnings and insights',
      'Share your progress and achievements with someone who matters to you',
      'Set up systems and habits to maintain your momentum going forward',
      'Reflect on how this process has changed you and what you\'ve discovered about yourself'
    ]
  };

  // Bonus tips based on their specific combination of traits and challenges
  strategy.bonusTips = [
    'Remember that consistency beats perfection - small daily actions compound into remarkable results over time',
    'Your unique combination of traits is actually a strength - embrace what makes you different rather than trying to fit a standard mold',
    'When motivation is low, rely on your systems and habits rather than willpower - they\'ll carry you through difficult periods',
    'Regular self-reflection helps you stay aligned with what truly matters and adjust course when needed',
    'Don\'t compare your progress to others - focus on being better than you were yesterday',
    'Build flexibility into your plans - the ability to adapt is often more valuable than perfect execution'
  ];

  // Add personality-specific bonus tips
  if (data.personality.energy === 'introvert') {
    strategy.bonusTips.push('Honor your need for quiet reflection and alone time - it\'s when your best insights and ideas emerge');
    strategy.bonusTips.push('Quality over quantity in relationships - a few deep, meaningful connections are more valuable than many shallow ones');
  } else if (data.personality.energy === 'extrovert') {
    strategy.bonusTips.push('Use your natural networking and relationship-building abilities to find mentors, collaborators, and supporters');
    strategy.bonusTips.push('Share your journey with others - your enthusiasm and energy can inspire others while creating accountability for yourself');
  } else {
    strategy.bonusTips.push('Leverage your adaptability - you can thrive in various environments and situations that others might find challenging');
  }

  if (data.personality.planning === 'planner') {
    strategy.bonusTips.push('Trust your planning instincts, but build in flexibility for unexpected opportunities and discoveries');
  } else {
    strategy.bonusTips.push('Embrace your adaptability and spontaneity as superpowers in our rapidly changing world');
  }

  // Add tips based on their specific struggles
  if (data.struggles.includes('focus')) {
    strategy.bonusTips.push('Your focus challenges are common and solvable - experiment with different techniques until you find what works for your brain');
  }
  if (data.struggles.includes('consistency')) {
    strategy.bonusTips.push('Focus on building systems rather than relying on motivation - good systems make consistency almost automatic');
  }
  if (data.struggles.includes('motivation')) {
    strategy.bonusTips.push('Connect your daily tasks to your deeper values and long-term vision - purpose is the ultimate motivator');
  }

  return strategy;
}
