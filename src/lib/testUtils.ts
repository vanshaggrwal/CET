/* ===================== TYPES ===================== */

export type Subject = "physics" | "chemistry" | "mathematics";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: Subject;
}

export interface UserData {
  firstName: string;
  lastName: string;
  currentCollege: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  
}

export interface SubjectResult {
  correct: number;
  total: number;
}

export interface TestResult {
  totalScore: number;
  maxScore: number; // ✅ already correct
  physics: SubjectResult;
  chemistry: SubjectResult;
  mathematics: SubjectResult;
}

export interface TestState {
  questions: Question[];
  answers: Record<string, number | null>;
  startTime: number;
  currentQuestion: number;
  isSubmitted: boolean;
  submissionReason?: "completed" | "timeout" | "violation";
}

/* ===================== USER DATA ===================== */

export const saveUserData = (data: UserData) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

export const getUserData = (): UserData | null => {
  const raw = localStorage.getItem("userData");
  return raw ? JSON.parse(raw) : null;
};

/* ===================== STATES / CITIES ===================== */

export const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",

  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const citiesByState: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Naharlagun"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala","Yamunanagar"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Dharamshala", "Solan"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
  Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  Sikkim: ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Tripura: ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Varanasi", "Agra"],
  Uttarakhand: ["Dehradun", "Haridwar", "Roorkee"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti"],
  Puducherry: ["Puducherry", "Karaikal"],
};

export const getCitiesForState = (state: string): string[] => {
  return citiesByState[state] || [];
};

/* ===================== TEST STATE ===================== */

export const saveTestState = (state: TestState) => {
  localStorage.setItem("testState", JSON.stringify(state));
};

export const getTestState = (): TestState | null => {
  const raw = localStorage.getItem("testState");
  return raw ? JSON.parse(raw) : null;
};

/* ===================== RESULTS ===================== */

export const saveTestResult = (result: TestResult) => {
  localStorage.setItem("testResult", JSON.stringify(result));
};

export const getTestResult = (): TestResult | null => {
  const raw = localStorage.getItem("testResult");
  return raw ? JSON.parse(raw) : null;
};

export const clearTestData = () => {
  localStorage.removeItem("testState");
  localStorage.removeItem("testResult");
};

/* ===================== CALCULATE RESULT ===================== */

export const calculateResults = (
  questions: Question[],
  answers: Record<string, number | null>
): TestResult => {

  const result: TestResult = {
    totalScore: 0,
    maxScore: 0, // ✅ ADDED
    physics: { correct: 0, total: 0 },
    chemistry: { correct: 0, total: 0 },
    mathematics: { correct: 0, total: 0 },
  };

  questions.forEach((q) => {
    result[q.subject].total++;
    result.maxScore++; // ✅ ADDED

    if (answers[q.id] === q.correctAnswer) {
      result[q.subject].correct++;
      result.totalScore++;
    }
  });

  return result;
};
