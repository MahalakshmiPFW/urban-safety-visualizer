import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
import tensorflowjs as tfjs

# Load dataset
df = pd.read_csv('LA_crime_data_2020_to_present.csv')

# Select relevant columns, including new ones
df = df[['DATE OCC', 'AREA NAME', 'Crm Cd Desc', 'Vict Sex', 'Premis Desc', 'Vict Age', 'LOCATION']]
df = df.dropna()

# Encode categorical features
le_area = LabelEncoder()
le_crime = LabelEncoder()
le_sex = LabelEncoder()
le_premis = LabelEncoder()
le_location = LabelEncoder()

df['AREA NAME'] = le_area.fit_transform(df['AREA NAME'])
df['Crm Cd Desc'] = le_crime.fit_transform(df['Crm Cd Desc'])
df['Vict Sex'] = le_sex.fit_transform(df['Vict Sex'])
df['Premis Desc'] = le_premis.fit_transform(df['Premis Desc'])
df['LOCATION'] = le_location.fit_transform(df['LOCATION'])

# Create a simple target: crime risk (low/medium/high) based on frequency
crime_counts = df['Crm Cd Desc'].value_counts()
df['risk'] = df['Crm Cd Desc'].apply(lambda x: 'low' if crime_counts[x] < 100 else ('medium' if crime_counts[x] < 500 else 'high'))
le_risk = LabelEncoder()
df['risk'] = le_risk.fit_transform(df['risk'])

# Features and target
X = df[['AREA NAME', 'Crm Cd Desc', 'Vict Sex', 'Premis Desc', 'Vict Age', 'LOCATION']]
y = df['risk']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a simple decision tree
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)

# FIXED: Create TensorFlow model with proper input specification
model = tf.keras.Sequential()
# Use Dense layer with input_shape instead of InputLayer
model.add(tf.keras.layers.Dense(16, activation='relu', input_shape=(6,)))
model.add(tf.keras.layers.Dense(8, activation='relu'))  # Added another layer for better learning
model.add(tf.keras.layers.Dense(3, activation='softmax'))

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Convert data to float32 for TensorFlow
X_train_tf = X_train.values.astype('float32')
X_test_tf = X_test.values.astype('float32')
y_train_tf = y_train.values.astype('int32')
y_test_tf = y_test.values.astype('int32')

# Train the TensorFlow model
print("Training TensorFlow model...")
history = model.fit(
    X_train_tf, y_train_tf,
    validation_data=(X_test_tf, y_test_tf),
    epochs=20,  # Increased epochs for better learning
    batch_size=32,
    verbose=1
)

# Evaluate the model
test_loss, test_accuracy = model.evaluate(X_test_tf, y_test_tf, verbose=0)
print(f"Model test accuracy: {test_accuracy:.3f}")

# Export to TensorFlow.js format
print("Saving model for TensorFlow.js...")
tfjs.converters.save_keras_model(model, 'crime_model_tfjs')

# Save label encodings for use in the web app
import json

mappings = {
    "AREA": {cls: int(idx) for idx, cls in enumerate(le_area.classes_)},
    "CRIME": {cls: int(idx) for idx, cls in enumerate(le_crime.classes_)},
    "SEX": {cls: int(idx) for idx, cls in enumerate(le_sex.classes_)},
    "PREMIS": {cls: int(idx) for idx, cls in enumerate(le_premis.classes_)},
    "LOCATION": {cls: int(idx) for idx, cls in enumerate(le_location.classes_)},
    "RISK": {cls: int(idx) for idx, cls in enumerate(le_risk.classes_)}
}

with open("encodings.json", "w") as f:
    json.dump(mappings, f, indent=2)

print("Model and encodings saved successfully!")
print(f"Risk levels: {le_risk.classes_}")
print(f"Number of areas: {len(le_area.classes_)}")
print(f"Number of crime types: {len(le_crime.classes_)}")