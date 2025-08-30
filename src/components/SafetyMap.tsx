import React from 'react';
import { MapPin, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type Coordinates = {
  lat: number;
  lng: number;
};

type CrimeData = {
  location: string;
  riskLevel: string;
  confidence: number;
  recentCrimes: number;
  trendDirection: string;
  safetyScore: number;
  recommendations: string[];
  coordinates?: Coordinates;
};

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
            {crimeData.recommendations.map((tip: string, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Leaflet Map Integration */}
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
        <div className="h-96">
          {crimeData.coordinates ? (
            <MapContainer
              center={[crimeData.coordinates.lat, crimeData.coordinates.lng] as [number, number]}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker
                position={[crimeData.coordinates.lat, crimeData.coordinates.lng] as [number, number]}
                icon={L.icon({
                  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                  shadowSize: [41, 41],
                })}
              >
                <Popup>
                  <strong>{crimeData.location}</strong><br />
                  Risk: {crimeData.riskLevel}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No coordinates available for this location.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;