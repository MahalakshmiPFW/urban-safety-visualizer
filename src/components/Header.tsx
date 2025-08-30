import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => (
  <header className="bg-white shadow-lg border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Urban Safety Visualizer</h1>
            <p className="text-sm text-gray-600">AI-Powered Community Safety Analysis</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
