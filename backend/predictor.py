import pandas as pd
import joblib
import numpy as np
import os

def load_artifacts():
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model = joblib.load(os.path.join(BASE_DIR, 'models/career_model.pkl'))
    scaler = joblib.load(os.path.join(BASE_DIR, 'models/scaler.pkl'))
    encoders = joblib.load(os.path.join(BASE_DIR, 'models/encoders.pkl'))
    target_encoder = joblib.load(os.path.join(BASE_DIR, 'models/target_encoder.pkl'))
    feature_columns = joblib.load(os.path.join(BASE_DIR, 'models/feature_columns.pkl'))
    numeric_cols = ['Age', 'Logical_Score', 'Creative_Score', 'Communication_Score', 'Tech_Score', 
                    'Math_Score', 'Biology_Score', 'Leadership_Score', 'Problem_Solving_Score', 
                    'Risk_Taking_Level', 'Stress_Tolerance', 'Learning_Speed']
    cat_cols = [col for col in feature_columns if col not in numeric_cols]
    return model, scaler, encoders, target_encoder, feature_columns, numeric_cols, cat_cols

def preprocess_input(input_data, encoders, scaler, feature_columns, numeric_cols, cat_cols):
    # Map API input keys to dataset cols
    mapping = {
        'math_score': 'Math_Score',
        'programming_skill': 'Tech_Score',
        'communication_skill': 'Communication_Score',
        'logical_reasoning': 'Logical_Score',
        'creativity': 'Creative_Score'
    }
    for api_key, ds_key in mapping.items():
        if api_key in input_data:
            input_data[ds_key] = input_data.pop(api_key)
    
    # Fill defaults for missing
    df = pd.DataFrame([input_data])
    defaults = {'Age': 22, 'Logical_Score': 50, 'Creative_Score': 50, 'Communication_Score': 50, 
                'Tech_Score': 50, 'Math_Score': 50, 'Biology_Score': 50, 'Leadership_Score': 50, 
                'Problem_Solving_Score': 50, 'Risk_Taking_Level': 50, 'Stress_Tolerance': 50, 
                'Learning_Speed': 50, 'Education_Level': 'Undergraduate', 'Stream': 'Computer Science', 
                'Personality_Type': 'Analytical', 'Preferred_Work_Style': 'Hybrid', 
                'Interest_Area': 'Technology', 'Work_Preference': 'Hybrid'}
    for col, default in defaults.items():
        if col not in df.columns:
            df[col] = default
    
    df = df.reindex(columns=feature_columns, fill_value=defaults.get(feature_columns[0], 50))
    
    # Encode cats
    for col in cat_cols:
        le = encoders[col]
        # Handle unseen labels
        labels = le.classes_
        val = df[col].iloc[0]
        if val not in labels:
            val = labels[np.argmin(np.abs(labels.astype(float) - val))]
        df[col] = le.transform([str(val)])[0]
    
    # Scale numerics
    df[numeric_cols] = scaler.transform(df[numeric_cols])
    
    return df

def predict_career(input_data):
    model, scaler, encoders, target_encoder, feature_columns, numeric_cols, cat_cols = load_artifacts()
    X = preprocess_input(input_data, encoders, scaler, feature_columns, numeric_cols, cat_cols)
    pred_idx = model.predict(X)[0]
    career = target_encoder.inverse_transform([pred_idx])[0]
    return career
