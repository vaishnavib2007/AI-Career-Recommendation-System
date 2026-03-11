export interface PredictionRecord {
  id: string;
  date: string;
  name: string;
  age: number;
  stream: string;
  personality: string;
  interestArea: string;
  workStyle: string;
  workPreference: string;
  education: string;
  scores: Record<string, number>;
  topCareer: string;
  confidence: number;
  top3: { career: string; confidence: number; icon: string }[];
  why: string;
  steps: string[];
  salary: string;
  colleges: string[];
  demand: string;
}

export function savePrediction(record: PredictionRecord) {
  const existing = getPredictions();
  existing.unshift(record);
  localStorage.setItem('careerai_predictions', JSON.stringify(existing));
}

export function getPredictions(): PredictionRecord[] {
  try {
    return JSON.parse(localStorage.getItem('careerai_predictions') || '[]');
  } catch { return []; }
}

export function clearPredictions() {
  localStorage.removeItem('careerai_predictions');
}
