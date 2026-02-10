import questionsData from '@/data/questions.json';

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  subject: 'physics' | 'chemistry' | 'mathematics';
}

export interface UserData {
  firstName: string;
  lastName: string;
  currentCollege: string;
  state: string;
  city: string;
  email: string;
  phone: string;
}

export interface TestState {
  questions: Question[];
  answers: Record<string, number | null>;
  startTime: number;
  currentQuestion: number;
  isSubmitted: boolean;
  submissionReason?: 'completed' | 'timeout' | 'violation';
}

export interface TestResult {
  totalScore: number;
  maxScore: number;
  physics: { correct: number; total: number };
  chemistry: { correct: number; total: number };
  mathematics: { correct: number; total: number };
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateRandomQuestions(): Question[] {
  const physicsQuestions = shuffleArray(questionsData.physics)
    .slice(0, 50)
    .map((q) => ({ ...q, subject: 'physics' as const }));
  
  const chemistryQuestions = shuffleArray(questionsData.chemistry)
    .slice(0, 50)
    .map((q) => ({ ...q, subject: 'chemistry' as const }));
  
  const mathematicsQuestions = shuffleArray(questionsData.mathematics)
    .slice(0, 50)
    .map((q) => ({ ...q, subject: 'mathematics' as const }));

  return [...physicsQuestions, ...chemistryQuestions, ...mathematicsQuestions];
}

export function calculateResults(questions: Question[], answers: Record<string, number | null>): TestResult {
  let physicsCorrect = 0;
  let chemistryCorrect = 0;
  let mathematicsCorrect = 0;
  let physicsTotal = 0;
  let chemistryTotal = 0;
  let mathematicsTotal = 0;

  questions.forEach((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.answer;

    switch (q.subject) {
      case 'physics':
        physicsTotal++;
        if (isCorrect) physicsCorrect++;
        break;
      case 'chemistry':
        chemistryTotal++;
        if (isCorrect) chemistryCorrect++;
        break;
      case 'mathematics':
        mathematicsTotal++;
        if (isCorrect) mathematicsCorrect++;
        break;
    }
  });

  // Each correct answer is worth 200/150 = 1.33 marks (approximately)
  // For simplicity, we'll use whole numbers: 150 questions = 200 marks
  const marksPerQuestion = 1;
  const totalCorrect = physicsCorrect + chemistryCorrect + mathematicsCorrect;
  const totalScore = Math.round(totalCorrect * marksPerQuestion);

  return {
    totalScore,
    maxScore: 150,
    physics: { correct: physicsCorrect, total: physicsTotal },
    chemistry: { correct: chemistryCorrect, total: chemistryTotal },
    mathematics: { correct: mathematicsCorrect, total: mathematicsTotal },
  };
}

// LocalStorage keys
const STORAGE_KEYS = {
  USER_DATA: 'cet_user_data',
  TEST_STATE: 'cet_test_state',
  TEST_RESULT: 'cet_test_result',
};

export function saveUserData(data: UserData): void {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
}

export function getUserData(): UserData | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
}

export function saveTestState(state: TestState): void {
  localStorage.setItem(STORAGE_KEYS.TEST_STATE, JSON.stringify(state));
}

export function getTestState(): TestState | null {
  const data = localStorage.getItem(STORAGE_KEYS.TEST_STATE);
  return data ? JSON.parse(data) : null;
}

export function saveTestResult(result: TestResult): void {
  localStorage.setItem(STORAGE_KEYS.TEST_RESULT, JSON.stringify(result));
}

export function getTestResult(): TestResult | null {
  const data = localStorage.getItem(STORAGE_KEYS.TEST_RESULT);
  return data ? JSON.parse(data) : null;
}

export function clearTestData(): void {
  localStorage.removeItem(STORAGE_KEYS.TEST_STATE);
  localStorage.removeItem(STORAGE_KEYS.TEST_RESULT);
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  localStorage.removeItem(STORAGE_KEYS.TEST_STATE);
  localStorage.removeItem(STORAGE_KEYS.TEST_RESULT);
}

// Indian states and cities data
export const statesAndCities: Record<string, string[]> = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Noida', 'Ghaziabad'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
  'Andhra Pradesh': ['Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Karnal'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rishikesh'],
};

export const states = Object.keys(statesAndCities);

export function getCitiesForState(state: string): string[] {
  return statesAndCities[state] || [];
}
