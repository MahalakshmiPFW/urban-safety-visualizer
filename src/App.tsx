
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import SafetyMap from './components/SafetyMap';
import ActivityDetector from './components/ActivityDetector';
import Footer from './components/Footer';

type CrimeData = {
  location: string;
  riskLevel: string;
  confidence: number;
  recentCrimes: number;
  trendDirection: string;
  safetyScore: number;
  recommendations: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
};

type ImageAnalysis = {
  filename: string;
  detections: { object: string; confidence: number; suspicious: boolean }[];
  overallThreat: string;
  recommendations: string[];
};

const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [isLoadingCrimeData, setIsLoadingCrimeData] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [crimeData, setCrimeData] = useState<CrimeData | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate fetching crime data
  const fetchCrimeData = async (searchLocation: string): Promise<CrimeData> => {
    setIsLoadingCrimeData(true);
    // Geocode using OpenStreetMap Nominatim
    let lat = 40.7128;
    let lng = -74.0060;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}`);
      const results = await response.json();
      if (results && results.length > 0) {
        lat = parseFloat(results[0].lat);
        lng = parseFloat(results[0].lon);
      }
    } catch (e) {
      // fallback to NYC
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockData: CrimeData = {
      location: searchLocation,
      riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      confidence: Math.floor(Math.random() * 30) + 70,
      recentCrimes: Math.floor(Math.random() * 50) + 10,
      trendDirection: Math.random() > 0.5 ? 'increasing' : 'decreasing',
      safetyScore: Math.floor(Math.random() * 40) + 60,
      recommendations: [
        'Avoid walking alone after 10 PM',
        'Well-lit main streets are safer',
        'Police patrol frequency is high in this area',
        'Consider using rideshare services at night'
      ],
      coordinates: {
        lat,
        lng
      }
    };
    setIsLoadingCrimeData(false);
    return mockData;
  };

  // Simulate image analysis
  const analyzeImage = async (imageFile: File): Promise<ImageAnalysis> => {
    setIsAnalyzingImage(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const mockAnalysis: ImageAnalysis = {
      filename: imageFile.name,
      detections: [
        { object: 'person', confidence: 0.95, suspicious: false },
        { object: 'bag', confidence: 0.87, suspicious: true },
        { object: 'vehicle', confidence: 0.92, suspicious: false }
      ],
      overallThreat: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
      recommendations: [
        'Unattended bag detected - notify security',
        'Monitor area for 5-10 minutes',
        'Check for bag owner in vicinity'
      ]
    };
    setIsAnalyzingImage(false);
    return mockAnalysis;
  };

  // Event handlers
  const handleLocationSearch = async () => {
    if (!location.trim()) {
      alert('Please enter a location to analyze');
      return;
    }
    try {
      const data = await fetchCrimeData(location);
      setCrimeData(data);
    } catch (error) {
      alert('Error analyzing location. Please try again.');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB');
      return;
    }
    try {
      const analysis = await analyzeImage(file);
      setImageAnalysis(analysis);
    } catch (error) {
      alert('Error analyzing image. Please try again.');
    }
  };

  const getRiskColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'map' && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Location to Analyze
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g., 123 Main St, New York, NY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    onKeyPress={e => e.key === 'Enter' && handleLocationSearch()}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleLocationSearch}
                    disabled={isLoadingCrimeData}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    {isLoadingCrimeData ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>Analyze Safety</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <SafetyMap crimeData={crimeData} getRiskColor={getRiskColor} />
          </>
        )}
        {activeTab === 'detector' && (
          <ActivityDetector
            imageAnalysis={imageAnalysis}
            isAnalyzingImage={isAnalyzingImage}
            handleImageUpload={handleImageUpload}
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
            getRiskColor={getRiskColor}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
