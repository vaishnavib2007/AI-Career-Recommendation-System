import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from xgboost import XGBClassifier
import joblib
import os

# Load dataset
import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(BASE_DIR, "public", "dataset", "FINAL_CAREER_DATASET.csv")

df = pd.read_csv(DATA_PATH)

# Features and target
feature_cols = ['Age', 'Logical_Score', 'Creative_Score', 'Communication_Score', 'Tech_Score', 
                'Math_Score', 'Biology_Score', 'Leadership_Score', 'Problem_Solving_Score', 
                'Risk_Taking_Level', 'Stress_Tolerance', 'Learning_Speed']
cat_cols = ['Education_Level', 'Stream', 'Personality_Type', 'Preferred_Work_Style', 'Interest_Area', 'Work_Preference']
target_col = 'Recommended_Career'

# Drop non-relevant columns
df = df[feature_cols + cat_cols + [target_col]].copy()

# Handle missing values
df[feature_cols] = df[feature_cols].fillna(df[feature_cols].mean())
df[cat_cols] = df[cat_cols].fillna(df[cat_cols].mode().iloc[0])

# Encode categoricals
encoders = {}
for col in cat_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    encoders[col] = le

target_encoder = LabelEncoder()
df[target_col] = target_encoder.fit_transform(df[target_col].astype(str))

# Prepare features
X = df[feature_cols + cat_cols]
y = df[target_col]

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Scale numeric
scaler = StandardScaler()
X_train[feature_cols] = scaler.fit_transform(X_train[feature_cols])
X_test[feature_cols] = scaler.transform(X_test[feature_cols])

# Models
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import VotingClassifier

# Tuned models
rf = RandomForestClassifier(n_estimators=500, class_weight='balanced', random_state=42, n_jobs=-1)
xgb = XGBClassifier(n_estimators=500, max_depth=6, learning_rate=0.1, subsample=0.8, class_weight='balanced', random_state=42, eval_metric='mlogloss')
gb = GradientBoostingClassifier(n_estimators=500, class_weight='balanced', random_state=42)

# Basic tune
rf.fit(X_train, y_train)
xgb.fit(X_train, y_train)
gb.fit(X_train, y_train)

models = {
    'RandomForest': rf,
    'XGBoost': xgb,
    'GradientBoosting': gb,
    'LogisticRegression': LogisticRegression(solver='lbfgs', max_iter=1000, random_state=42)
}


best_model = None
best_acc = 0
results = {}

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    results[name] = acc
    print(f"{name} Accuracy: {acc:.4f}")
    print(classification_report(y_test, y_pred, target_names=target_encoder.classes_))
    if acc > best_acc:
        best_acc = acc
        best_model = model

print(f"\nBest model: {max(results, key=results.get)} with accuracy {best_acc:.4f}")

# Save
os.makedirs('models', exist_ok=True)
joblib.dump(best_model, 'models/career_model.pkl')
joblib.dump(scaler, 'models/scaler.pkl')
joblib.dump(encoders, 'models/encoders.pkl')
joblib.dump(target_encoder, 'models/target_encoder.pkl')
joblib.dump(feature_cols + cat_cols, 'models/feature_columns.pkl')

print("Models and preprocessors saved to backend/models/")
