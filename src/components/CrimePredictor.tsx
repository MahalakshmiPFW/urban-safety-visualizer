// src/components/CrimePredictor.tsx
import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const modelUrl = '/crime_model_tfjs/model.json'; // Place exported model in public/

export default function CrimePredictor() {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [area, setArea] = useState(0);
  const [crimeType, setCrimeType] = useState(0);
  const [prediction, setPrediction] = useState('');

  useEffect(() => {
    tf.loadLayersModel(modelUrl).then(setModel);
  }, []);

  const predictRisk = async () => {
    if (!model) return;
    const input = tf.tensor2d([[area, crimeType]]);
    const output = model.predict(input) as tf.Tensor;
    const riskIdx = output.argMax(-1).dataSync()[0];
    const riskLabels = ['Low', 'Medium', 'High'];
    setPrediction(riskLabels[riskIdx]);
  };

  return (
    <div>
      <h2>Crime Risk Predictor</h2>
      <label>
        Area (encoded):
        <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} />
      </label>
      <label>
        Crime Type (encoded):
        <input type="number" value={crimeType} onChange={e => setCrimeType(Number(e.target.value))} />
      </label>
      <button onClick={predictRisk}>Predict</button>
      {prediction && <p>Predicted Risk: {prediction}</p>}
    </div>
  );
}