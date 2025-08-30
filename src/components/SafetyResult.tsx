import React from 'react';

interface SafetyResultProps {
  data: {
    location: string;
    riskLevel: string;
    recentCrimes: number;
  } | null;
}

const SafetyResult: React.FC<SafetyResultProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h2 className="text-lg font-semibold mb-2">Results for {data.location}</h2>
      <p><strong>Risk Level:</strong> {data.riskLevel}</p>
      <p><strong>Recent Crimes:</strong> {data.recentCrimes}</p>
    </div>
  );
};

export default SafetyResult;
