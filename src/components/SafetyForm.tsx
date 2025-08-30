import React, { useState } from 'react';

interface SafetyFormProps {
  onAnalyze: (location: string) => void;
  loading: boolean;
}

const SafetyForm: React.FC<SafetyFormProps> = ({ onAnalyze, loading }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) onAnalyze(location);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Enter location..."
        className="border rounded px-3 py-2 flex-1"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};

export default SafetyForm;
