from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predictor import predict_career
from typing import Dict, Any

app = FastAPI(title="AI Career Recommendation System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
    math_score: float = 50
    programming_skill: float = 50
    communication_skill: float = 50
    logical_reasoning: float = 50
    creativity: float = 50

@app.get("/")
async def root():
    return {"message": "AI Career Recommendation System Running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/predict")
async def predict(input_data: PredictionInput):
    result = predict_career(input_data.dict())
    return {"recommended_career": result}
