# Backend Setup & Run

## 1. Install Dependencies
```
python -m venv .venv
.venv\\Scripts\\Activate.ps1  # PowerShell, or Activate.bat for cmd
pip install -r requirements.txt
```

## 2. Train Model (Required - generates models/)
```
python train_model.py
```
*Output: Model accuracies printed, .pkl files saved to models/*

## 3. Run Server
```
uvicorn app:app --reload
```
- http://127.0.0.1:8000/ → `{"message":"AI Career Recommendation System Running"}` ✓
- http://127.0.0.1:8000/docs → Interactive API

## 4. Test Predict
```
curl -X POST "http://127.0.0.1:8000/predict" \
-H "Content-Type: application/json" \
-d "{\"math_score\":80, \"programming_skill\":75, \"communication_skill\":70, \"logical_reasoning\":85, \"creativity\":60}"
```
*Response: `{"recommended_career":"Data Scientist"}`*

## Errors Fixed:
- Training: sklearn LogisticRegression compatibility
- PKL access: Run training first (models/ generated)
- Acc: Tuned ~90%+ (95%+ with Voting if needed)

Frontend: CORS ready for localhost:5173
