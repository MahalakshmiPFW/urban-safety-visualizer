import React from 'react';
import { MapPin, Camera } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => (
  <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
    <button
      onClick={() => setActiveTab('map')}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        activeTab === 'map'
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      <MapPin className="w-4 h-4 inline-block mr-2" />
      Safety Map
    </button>
    <button
      onClick={() => setActiveTab('detector')}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        activeTab === 'detector'
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      <Camera className="w-4 h-4 inline-block mr-2" />
      Activity Detector
    </button>
  </nav>
);

export default NavigationTabs;