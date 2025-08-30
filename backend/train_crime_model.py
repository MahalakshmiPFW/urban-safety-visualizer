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

# Convert to TensorFlow model
model = tf.keras.Sequential([
    tf.keras.layers.InputLayer(input_shape=(6,)),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(3, activation='softmax')
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Transfer scikit-learn predictions to TensorFlow model (retrain for demo)
model.fit(X_train, y_train, epochs=10)

# Export to TensorFlow.js format
tfjs.converters.save_keras_model(model, 'crime_model_tfjs')
