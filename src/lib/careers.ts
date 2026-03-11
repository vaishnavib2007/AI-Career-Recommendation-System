export interface CareerInfo {
  name: string;
  icon: string;
  category: string;
  categoryColor: string;
  demand: 'High' | 'Medium';
  salary: string;
  description: string;
  why: string;
  steps: string[];
  colleges: string[];
}

export const CAREER_DATA: CareerInfo[] = [
  { name: "AI Engineer", icon: "🤖", category: "Technology", categoryColor: "primary", demand: "High", salary: "10-30 LPA", description: "Design and deploy AI/ML systems at scale.", why: "Strong technical and analytical skills with high problem-solving ability suit AI engineering roles.", steps: ["B.Tech CS/IT or M.Tech AI", "Learn Python, TensorFlow, PyTorch", "ML/DL specialization courses", "Research projects & publications", "Join AI-focused companies"], colleges: ["IITs", "IISc", "IIIT-H", "BITS Pilani", "CMI"] },
  { name: "Architect", icon: "🏗️", category: "Engineering", categoryColor: "warning", demand: "Medium", salary: "6-20 LPA", description: "Design buildings, structures and spatial environments.", why: "Creative vision combined with technical precision makes an excellent architect.", steps: ["B.Arch (5 years)", "Council of Architecture registration", "Internship at architecture firm", "Portfolio development", "Start practice or join firm"], colleges: ["IIT Kharagpur", "SPA Delhi", "CEPT", "JJ School of Art", "NIT Trichy"] },
  { name: "Business Analyst", icon: "📊", category: "Business", categoryColor: "warning", demand: "High", salary: "6-18 LPA", description: "Bridge business needs with technology solutions.", why: "Analytical thinking with strong communication skills enables effective business analysis.", steps: ["BBA/B.Tech/B.Com", "Learn SQL, Excel, Tableau", "Business analysis certification", "Domain knowledge building", "Join consulting or IT firms"], colleges: ["IIMs", "SRCC", "Christ University", "Symbiosis", "NMIMS"] },
  { name: "Chartered Accountant", icon: "📋", category: "Finance", categoryColor: "warning", demand: "High", salary: "7-22 LPA", description: "Expert in accounting, taxation and financial compliance.", why: "Exceptional math and logical skills are core to chartered accountancy.", steps: ["Enroll in ICAI CA Foundation", "CA Intermediate", "Articleship (3 yrs)", "CA Final", "Practice or join Big 4"], colleges: ["ICAI", "SRCC", "Christ University", "Loyola", "St. Xaviers"] },
  { name: "Civil Engineer", icon: "🏛️", category: "Engineering", categoryColor: "warning", demand: "Medium", salary: "5-15 LPA", description: "Plan and oversee construction of infrastructure projects.", why: "Strong mathematical foundation with problem-solving aptitude suits civil engineering.", steps: ["B.Tech Civil Engineering", "Internship at construction firm", "GATE exam for M.Tech/PSU", "Site experience", "Project management certification"], colleges: ["IIT Bombay", "IIT Delhi", "NIT Trichy", "BITS", "DTU"] },
  { name: "Cloud Engineer", icon: "☁️", category: "Technology", categoryColor: "primary", demand: "High", salary: "8-22 LPA", description: "Design and manage cloud infrastructure and services.", why: "Technical proficiency with systematic thinking enables cloud architecture design.", steps: ["B.Tech CS/IT", "AWS/Azure/GCP certifications", "Learn containerization", "DevOps practices", "Join cloud-first companies"], colleges: ["NITs", "VIT", "BITS", "Manipal", "SRM"] },
  { name: "Content Creator", icon: "✍️", category: "Arts", categoryColor: "accent", demand: "Medium", salary: "3-15 LPA", description: "Create engaging content across digital platforms.", why: "High creativity and communication skills drive successful content creation.", steps: ["Degree in Media/Journalism", "Build content portfolio", "Learn video editing & SEO", "Social media presence", "Freelance or agency work"], colleges: ["IIMC", "Symbiosis", "Xavier's", "Jamia", "Asian College of Journalism"] },
  { name: "Cybersecurity Analyst", icon: "🔐", category: "Technology", categoryColor: "primary", demand: "High", salary: "8-22 LPA", description: "Protect organizations from cyber threats and attacks.", why: "Analytical mindset with technical skills enables identification and prevention of security threats.", steps: ["B.Tech CS/IT", "CEH/CompTIA Security+", "Learn networking & Linux", "Bug bounty practice", "Join security operations centers"], colleges: ["IITs", "NITs", "IIIT-H", "Amity", "VIT"] },
  { name: "Data Analyst", icon: "📈", category: "Technology", categoryColor: "primary", demand: "High", salary: "5-15 LPA", description: "Extract insights from data to drive business decisions.", why: "Strong analytical and mathematical abilities with attention to detail suit data analysis.", steps: ["B.Tech/BSc Statistics/BCA", "Learn SQL, Python, Excel", "Tableau/Power BI", "Kaggle projects", "Join analytics firms"], colleges: ["ISI Kolkata", "IITs", "BITS", "Christ University", "Manipal"] },
  { name: "Data Scientist", icon: "🔬", category: "Technology", categoryColor: "primary", demand: "High", salary: "10-24 LPA", description: "Build ML models and extract insights from complex datasets.", why: "High math and analytical skills suit data science roles.", steps: ["Learn Python/R & statistics", "ML/AI courses", "Kaggle projects", "B.Tech/M.Tech/MCA", "Join analytics firms"], colleges: ["IITs", "IISc", "IIIT-H", "Manipal", "Amity"] },
  { name: "DevOps Engineer", icon: "⚙️", category: "Technology", categoryColor: "primary", demand: "High", salary: "8-18 LPA", description: "Automate and streamline development operations.", why: "Tech skills combined with organization aptitude fit DevOps workflows.", steps: ["Learn Linux & scripting", "Docker/Kubernetes", "CI/CD pipelines", "B.Tech IT/CS", "Work in product companies"], colleges: ["NITs", "VIT", "Pune University", "KIIT", "SRM"] },
  { name: "Digital Marketer", icon: "📣", category: "Business", categoryColor: "warning", demand: "High", salary: "4-15 LPA", description: "Drive online growth through digital marketing strategies.", why: "Creative thinking with analytical skills enables effective digital marketing campaigns.", steps: ["BBA/B.Com/Any degree", "Google Ads & Analytics certs", "Social media marketing", "SEO/SEM mastery", "Agency or in-house marketing"], colleges: ["MICA Ahmedabad", "Symbiosis", "NMIMS", "Christ", "Manipal"] },
  { name: "Doctor", icon: "🏥", category: "Healthcare", categoryColor: "success", demand: "High", salary: "8-25 LPA", description: "Diagnose and treat medical conditions to improve health.", why: "High biology scores with strong dedication and empathy are essential for medical practice.", steps: ["NEET qualification", "MBBS (5.5 years)", "Internship", "MD/MS specialization", "Practice or hospital position"], colleges: ["AIIMS", "CMC Vellore", "JIPMER", "Maulana Azad", "KEM Mumbai"] },
  { name: "Entrepreneur", icon: "🚀", category: "Business", categoryColor: "warning", demand: "High", salary: "Variable", description: "Build and lead innovative business ventures.", why: "High risk-taking with leadership and problem-solving skills drive entrepreneurial success.", steps: ["Any degree + business knowledge", "Identify market opportunity", "Build MVP", "Secure funding", "Scale the business"], colleges: ["IIMs", "ISB", "BITS", "IITs", "Startup incubators"] },
  { name: "Financial Analyst", icon: "💹", category: "Finance", categoryColor: "warning", demand: "High", salary: "6-18 LPA", description: "Analyze financial data and provide investment guidance.", why: "Strong mathematical and analytical abilities enable accurate financial modeling.", steps: ["B.Com/BBA/B.Tech", "CFA certification", "Financial modeling courses", "Internship at banks/firms", "Join investment banking"], colleges: ["SRCC", "IIMs", "NMIMS", "Christ", "Symbiosis"] },
  { name: "Game Developer", icon: "🎮", category: "Technology", categoryColor: "primary", demand: "Medium", salary: "6-16 LPA", description: "Create interactive gaming experiences across platforms.", why: "Blend of creativity and technical skills is ideal for game development.", steps: ["Learn Unity/Unreal Engine", "C++/C# programming", "B.Tech CS or B.Des", "Build game portfolio", "Gaming studios"], colleges: ["MAAC", "Arena Animation", "MIT-WPU", "Amity", "Whistling Woods"] },
  { name: "Graphic Designer", icon: "🎨", category: "Arts", categoryColor: "accent", demand: "Medium", salary: "4-14 LPA", description: "Create visual concepts to communicate ideas.", why: "High creative ability with visual thinking produces compelling graphic designs.", steps: ["B.Des/BFA", "Master Adobe Creative Suite", "Build design portfolio", "Freelance projects", "Join design agency or studio"], colleges: ["NID", "Srishti", "Pearl Academy", "NIFT", "JJ School of Art"] },
  { name: "HR Manager", icon: "👥", category: "Business", categoryColor: "warning", demand: "High", salary: "6-18 LPA", description: "Manage human resources and organizational development.", why: "Strong communication and leadership skills are essential for HR management.", steps: ["BBA/MBA HR", "HR certification (SHRM/HRCI)", "Internship in HR department", "People management experience", "Join corporate HR teams"], colleges: ["XLRI", "TISS", "IIMs", "Symbiosis", "MDI Gurgaon"] },
  { name: "Journalist", icon: "📰", category: "Arts", categoryColor: "accent", demand: "Medium", salary: "4-12 LPA", description: "Investigate and report news across media platforms.", why: "Excellent communication skills with curiosity and research ability drive journalism.", steps: ["BA Journalism/Mass Communication", "Internship at media house", "Build portfolio of published work", "Digital journalism skills", "Join newsroom or freelance"], colleges: ["IIMC", "Symbiosis", "ACJ Chennai", "Xavier's", "Jamia"] },
  { name: "Lawyer", icon: "⚖️", category: "Law", categoryColor: "accent", demand: "High", salary: "5-20 LPA", description: "Provide legal counsel and represent clients in court.", why: "Logical reasoning with strong communication makes an effective legal professional.", steps: ["CLAT exam", "BA LLB (5 years) or LLB (3 years)", "Internship at law firm/court", "Bar Council registration", "Practice or join firm"], colleges: ["NLSIU", "NALSAR", "NLU Delhi", "NUJS Kolkata", "ILS Pune"] },
  { name: "Marketing Manager", icon: "📣", category: "Business", categoryColor: "warning", demand: "High", salary: "8-22 LPA", description: "Develop and execute marketing strategies for brands.", why: "Creative thinking combined with leadership drives effective marketing management.", steps: ["BBA/B.Com/MBA Marketing", "Digital marketing skills", "Brand management experience", "Campaign portfolio", "Join FMCG or tech marketing teams"], colleges: ["IIMs", "MICA", "XLRI", "FMS Delhi", "SP Jain"] },
  { name: "Mechanical Engineer", icon: "⚙️", category: "Engineering", categoryColor: "warning", demand: "Medium", salary: "5-16 LPA", description: "Design and build mechanical systems and products.", why: "Strong mathematical and problem-solving skills with technical knowledge suit mechanical engineering.", steps: ["B.Tech Mechanical Engineering", "GATE exam for M.Tech/PSU", "CAD/CAM software skills", "Industry internship", "Join manufacturing or automotive firms"], colleges: ["IIT Bombay", "IIT Madras", "NIT Trichy", "BITS", "VIT"] },
  { name: "Network Engineer", icon: "🌐", category: "Technology", categoryColor: "primary", demand: "High", salary: "5-16 LPA", description: "Design and maintain computer network infrastructure.", why: "Technical aptitude with systematic thinking enables effective network architecture.", steps: ["B.Tech CS/IT/ECE", "CCNA/CCNP certification", "Network security knowledge", "Lab practice", "Join IT infrastructure companies"], colleges: ["NITs", "VIT", "KIIT", "SRM", "Manipal"] },
  { name: "Pharmacist", icon: "💊", category: "Healthcare", categoryColor: "success", demand: "Medium", salary: "4-12 LPA", description: "Dispense medications and provide pharmaceutical guidance.", why: "Strong biology knowledge with attention to detail is essential for pharmacy.", steps: ["B.Pharm (4 years)", "Pharmacy Council registration", "Hospital/retail pharmacy internship", "M.Pharm for specialization", "Practice or pharmaceutical company"], colleges: ["NIPER", "Jamia Hamdard", "ICT Mumbai", "Manipal", "BHU"] },
  { name: "Product Manager", icon: "📦", category: "Technology", categoryColor: "primary", demand: "High", salary: "12-30 LPA", description: "Lead product strategy and development from vision to launch.", why: "Combination of analytical thinking, communication and leadership skills drive product management.", steps: ["B.Tech/MBA", "Learn product frameworks", "Build side projects", "User research skills", "Join tech product companies"], colleges: ["IITs", "IIMs", "ISB", "BITS", "IIIT-H"] },
  { name: "Psychologist", icon: "🧠", category: "Healthcare", categoryColor: "success", demand: "Medium", salary: "4-15 LPA", description: "Study behavior and provide mental health counseling.", why: "Strong empathy and communication with analytical observation skills suit psychology.", steps: ["BA/BSc Psychology", "MA/MSc Psychology", "RCI registration", "Clinical internship", "Private practice or institutional role"], colleges: ["TISS", "Christ University", "JMI", "BHU", "Ambedkar University"] },
  { name: "Robotics Engineer", icon: "🤖", category: "Engineering", categoryColor: "warning", demand: "High", salary: "8-20 LPA", description: "Design and build robotic systems for various applications.", why: "Strong technical and mathematical aptitude suits robotics engineering.", steps: ["B.Tech Mechanical/Electronics/CS", "Robotics specialization", "ROS/Python/MATLAB", "Research projects", "R&D labs/manufacturing"], colleges: ["IITs", "NIT Trichy", "BITS", "IIST", "IISc"] },
  { name: "Software Developer", icon: "💻", category: "Technology", categoryColor: "primary", demand: "High", salary: "6-20 LPA", description: "Build software applications and systems.", why: "High technical and problem-solving scores indicate strong software development potential.", steps: ["B.Tech CS/IT/MCA", "Master programming languages", "Data structures & algorithms", "Build project portfolio", "Join tech companies"], colleges: ["IITs", "NITs", "BITS", "IIIT-H", "VIT"] },
  { name: "Teacher", icon: "🏫", category: "Education", categoryColor: "accent", demand: "High", salary: "4-12 LPA", description: "Educate and inspire students across academic levels.", why: "Strong communication and patience make an excellent educator.", steps: ["B.Ed after graduation", "CTET/TET exams", "Master's in subject", "NET for college teaching", "Government/private schools"], colleges: ["NCERT", "DU", "BHU", "Jamia", "Amity"] },
  { name: "UI/UX Designer", icon: "🎨", category: "Arts", categoryColor: "accent", demand: "High", salary: "6-20 LPA", description: "Design intuitive and beautiful user interfaces and experiences.", why: "Creative vision with user empathy creates intuitive and beautiful digital experiences.", steps: ["B.Des/BCA/Self-learning", "Master Figma/Sketch/Adobe XD", "UX research methodology", "Build design portfolio", "Join product design teams"], colleges: ["NID", "IIT Bombay IDC", "Srishti", "Pearl Academy", "MIT-WPU"] },
];

export const CAREER_CATEGORIES = ["All", "Technology", "Healthcare", "Business", "Arts", "Law", "Education", "Engineering", "Finance"];

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    Technology: 'bg-primary/20 text-primary',
    Healthcare: 'bg-success/20 text-success',
    Business: 'bg-warning/20 text-warning',
    Finance: 'bg-warning/20 text-warning',
    Arts: 'bg-accent/20 text-accent',
    Law: 'bg-accent/20 text-accent',
    Education: 'bg-accent/20 text-accent',
    Engineering: 'bg-warning/20 text-warning',
  };
  return map[category] || 'bg-muted text-muted-foreground';
}

export function getDemandColor(demand: string): string {
  return demand === 'High' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning';
}

export function getMockPrediction(scores: Record<string, number>): {
  top3: { career: CareerInfo; confidence: number }[];
} {
  // Simple mock: pick careers based on highest scores
  const techWeight = (scores.tech_score || 50) + (scores.logical_score || 50) + (scores.math_score || 50);
  const creativeWeight = (scores.creative_score || 50) + (scores.communication_score || 50);
  const healthWeight = (scores.biology_score || 50) + (scores.stress_tolerance || 50);
  
  const weights: { career: CareerInfo; weight: number }[] = CAREER_DATA.map(c => {
    let w = Math.random() * 30;
    if (c.category === 'Technology') w += techWeight / 3;
    if (c.category === 'Arts') w += creativeWeight / 2;
    if (c.category === 'Healthcare') w += healthWeight / 2;
    if (c.category === 'Engineering') w += (scores.math_score || 50) + (scores.problem_solving_score || 50);
    if (c.category === 'Business') w += (scores.leadership_score || 50) + (scores.communication_score || 50);
    return { career: c, weight: w };
  });
  
  weights.sort((a, b) => b.weight - a.weight);
  const maxW = weights[0].weight;
  
  return {
    top3: weights.slice(0, 3).map((w, i) => ({
      career: w.career,
      confidence: Math.round((w.weight / maxW) * 100 * (1 - i * 0.06) * 10) / 10,
    })),
  };
}
