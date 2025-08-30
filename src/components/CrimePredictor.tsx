// src/components/CrimePredictor.tsx
import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const modelUrl = '/crime_model_tfjs/model.json';

export default function CrimePredictor() {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [area, setArea] = useState(0);
  const [crimeType, setCrimeType] = useState(0);
  const [victSex, setVictSex] = useState(0);
  const [premisDesc, setPremisDesc] = useState(0);
  const [victAge, setVictAge] = useState(0);
  const [location, setLocation] = useState(0);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tf.loadLayersModel(modelUrl)
      .then(m => {
        setModel(m);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const predictRisk = async () => {
    if (!model) return;
    // Input order: AREA NAME, Crm Cd Desc, Vict Sex, Premis Desc, Vict Age, LOCATION
    const inputArr = [area, crimeType, victSex, premisDesc, victAge, location];
    const input = tf.tensor2d([inputArr], [1, 6]);
    const output = model.predict(input) as tf.Tensor;
    const riskIdx = output.argMax(-1).dataSync()[0];
    const riskLabels = ['Low', 'Medium', 'High'];
    setPrediction(riskLabels[riskIdx]);
  };

  return (
    <div>
      <h2>Crime Risk Predictor</h2>
      {loading ? (
        <p>Loading model...</p>
      ) : (
        <>
          <label>
            Area (encoded):
            <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} />
          </label>
          <label>
            Crime Type (encoded):
            <input type="number" value={crimeType} onChange={e => setCrimeType(Number(e.target.value))} />
          </label>
          <label>
            Victim Sex (encoded):
            <input type="number" value={victSex} onChange={e => setVictSex(Number(e.target.value))} />
          </label>
          <label>
            Premis Desc (encoded):
            <input type="number" value={premisDesc} onChange={e => setPremisDesc(Number(e.target.value))} />
          </label>
          <label>
            Victim Age:
            <input type="number" value={victAge} onChange={e => setVictAge(Number(e.target.value))} />
          </label>
          <label>
            Location (encoded):
            <input type="number" value={location} onChange={e => setLocation(Number(e.target.value))} />
          </label>
          <button onClick={predictRisk}>Predict</button>
          {prediction && <p>Predicted Risk: {prediction}</p>}
        </>
      )}
    </div>
  );
}