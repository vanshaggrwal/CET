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
  attempted: number; // ✅ ADDED
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
  Haryana: [ "Ambala",
  "Bhiwani",
  "Charkhi Dadri",
  "Faridabad",
  "Fatehabad",
  "Gurugram",
  "Hisar",
  "Jhajjar",
  "Jind",
  "Kaithal",
  "Karnal",
  "Kurukshetra",
  "Mahendragarh",
  "Nuh",
  "Palwal",
  "Panchkula",
  "Panipat",
  "Rewari",
  "Rohtak",
  "Sirsa",
  "Sonipat",
  "Yamunanagar"],
  "Himachal Pradesh": [
  "Bilaspur",
  "Chamba",
  "Hamirpur",
  "Kangra",
  "Kinnaur",
  "Kullu",
  "Lahaul and Spiti",
  "Mandi",
  "Shimla",
  "Sirmaur",
  "Solan",
  "Una"
],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
  Maharashtra: [
  "Mumbai City",
  "Mumbai Suburban",
  "Thane",
  "Palghar",
  "Raigad",
  "Ratnagiri",
  "Sindhudurg",
  "Pune",
  "Satara",
  "Sangli",
  "Kolhapur",
  "Solapur",
  "Nashik",
  "Ahmednagar",
  "Dhule",
  "Nandurbar",
  "Jalgaon",
  "Aurangabad",
  "Jalna",
  "Beed",
  "Osmanabad",
  "Latur",
  "Nanded",
  "Hingoli",
  "Parbhani",
  "Amravati",
  "Akola",
  "Washim",
  "Buldhana",
  "Yavatmal",
  "Nagpur",
  "Wardha",
  "Bhandara",
  "Gondia",
  "Chandrapur",
  "Gadchiroli"
],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
  Punjab: [
  "Amritsar",
  "Barnala",
  "Bathinda",
  "Faridkot",
  "Fatehgarh Sahib",
  "Fazilka",
  "Ferozepur",
  "Gurdaspur",
  "Hoshiarpur",
  "Jalandhar",
  "Kapurthala",
  "Ludhiana",
  "Malerkotla",
  "Mansa",
  "Moga",
  "Mohali",
  "Muktsar",
  "Nawanshahr",
  "Pathankot",
  "Patiala",
  "Rupnagar",
  "Sangrur",
  "Tarn Taran"
],
  Rajasthan: [
  "Ajmer","Alwar","Anupgarh","Balotra","Banswara","Baran","Barmer",
  "Beawar","Bharatpur","Bhilwara","Bikaner","Bundi","Chittorgarh",
  "Churu","Dausa","Deeg","Dholpur","Didwana-Kuchaman","Dungarpur",
  "Gangapur City","Hanumangarh","Jaipur","Jaipur Rural","Jaisalmer",
  "Jalore","Jhalawar","Jhunjhunu","Jodhpur","Jodhpur Rural",
  "Karauli","Kekri","Khairthal-Tijara","Kota","Kotputli-Behror",
  "Nagaur","Neem Ka Thana","Pali","Phalodi","Pratapgarh",
  "Rajsamand","Salumber","Sanchore","Sawai Madhopur","Shahpura",
  "Sikar","Sirohi","Sri Ganganagar","Tonk","Udaipur"
],
  Sikkim: ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Tripura: ["Agartala"],
  "Uttar Pradesh": [
  "Agra","Aligarh","Ambedkar Nagar","Amethi","Amroha","Auraiya",
  "Ayodhya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur",
  "Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor",
  "Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria",
  "Etah","Etawah","Farrukhabad","Fatehpur","Firozabad",
  "Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda",
  "Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras",
  "Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat",
  "Kanpur Nagar","Kasganj","Kaushambi","Kheri","Kushinagar",
  "Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri",
  "Mathura","Mau","Meerut","Mirzapur","Moradabad",
  "Muzaffarnagar","Pilibhit","Pratapgarh","Prayagraj",
  "Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar",
  "Shahjahanpur","Shamli","Shravasti","Siddharthnagar",
  "Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"
],
  Uttarakhand: [
  "Dehradun",
  "Haridwar",
  "Pauri Garhwal",
  "Tehri Garhwal",
  "Rudraprayag",
  "Chamoli",
  "Uttarkashi",
  "Nainital",
  "Almora",
  "Pithoragarh",
  "Bageshwar",
  "Champawat",
  "Udham Singh Nagar"
],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
  Delhi: [
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "Shahdara",
  "South Delhi",
  "South East Delhi",
  "South West Delhi",
  "West Delhi"
],
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
    physics: { correct: 0, total: 0, attempted: 0 },
    chemistry: { correct: 0, total: 0, attempted: 0 },
    mathematics: { correct: 0, total: 0, attempted: 0 },
 
  };
questions.forEach((q) => {
  result[q.subject].total++;
  result.maxScore++;

  const answer = answers[q.id];

  if (answer !== null && answer !== undefined) {
    result[q.subject].attempted++;
  }

  if (answer === q.correctAnswer) {
    result[q.subject].correct++;
    result.totalScore++;
  }
});

  return result;
};
