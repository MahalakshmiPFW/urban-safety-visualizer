import React from 'react';
import { MapPin, AlertTriangle, TrendingUp, Users } from 'lucide-react';

interface CrimeData {
  location: string;
  riskLevel: string;
  confidence: number;
  recentCrimes: number;
  trendDirection: string;
  safetyScore: number;
  recommendations: string[];
}

interface SafetyMapProps {
  crimeData: CrimeData | null;
  getRiskColor: (level: string) => string;
}

const SafetyMap: React.FC<SafetyMapProps> = ({ crimeData, getRiskColor }) => {
  if (!crimeData) return null;
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Assessment Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Risk Level:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(crimeData.riskLevel)}`}>
                {crimeData.riskLevel}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Confidence:</span>
              <span className="text-sm font-medium text-gray-900">{crimeData.confidence}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Safety Score:</span>
              <span className="text-sm font-medium text-gray-900">{crimeData.safetyScore}/100</span>
            </div>
          </div>
        </div>
        {/* Crime Statistics Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Crime Statistics</h3>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Recent Incidents:</span>
              <span className="text-sm font-medium text-gray-900">{crimeData.recentCrimes}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Trend:</span>
              <span className={`text-sm font-medium ${
                crimeData.trendDirection === 'increasing' ? 'text-red-600' : 'text-green-600'
              }`}>
                {crimeData.trendDirection === 'increasing' ? '↗ Increasing' : '↘ Decreasing'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Updated:</span>
              <span className="text-sm font-medium text-gray-900">2 hours ago</span>
            </div>
          </div>
        </div>
        {/* Safety Recommendations Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Safety Tips</h3>
            <Users className="w-5 h-5 text-green-500" />
          </div>
          <ul className="space-y-3">
            {crimeData.recommendations.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Map Placeholder */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            Interactive Safety Map
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Crime data visualization for {crimeData.location}
          </p>
        </div>
        <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Interactive Map Integration</p>
            <p className="text-sm text-gray-500 mt-2">
              Leaflet.js map with crime data visualization will be integrated here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;