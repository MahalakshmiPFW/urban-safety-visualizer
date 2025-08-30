import React from 'react';
import type { RefObject } from 'react';
import { Camera, AlertTriangle } from 'lucide-react';

interface Detection {
  object: string;
  confidence: number;
  suspicious: boolean;
}

interface ImageAnalysis {
  filename: string;
  detections: Detection[];
  overallThreat: string;
  recommendations: string[];
}

interface ActivityDetectorProps {
  imageAnalysis: ImageAnalysis | null;
  isAnalyzingImage: boolean;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  getRiskColor: (level: string) => string;
}

const ActivityDetector: React.FC<ActivityDetectorProps> = ({ imageAnalysis, isAnalyzingImage, handleImageUpload, fileInputRef, getRiskColor }) => (
  <div className="space-y-8">
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Camera className="w-5 h-5 mr-2 text-blue-500" />
        Suspicious Activity Detector
      </h3>
      <p className="text-gray-600 mb-6">
        Upload an image from security cameras or public spaces to detect potentially suspicious activities using AI.
      </p>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isAnalyzingImage}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {isAnalyzingImage ? 'Processing...' : 'Upload Image'}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Supports JPG, PNG, GIF up to 5MB
        </p>
      </div>
    </div>
    {imageAnalysis && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Results</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Threat Level:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(imageAnalysis.overallThreat)}`}>
                {imageAnalysis.overallThreat}
              </span>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Objects Detected:</h4>
              <div className="space-y-2">
                {imageAnalysis.detections.map((detection, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{detection.object}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{Math.round(detection.confidence * 100)}%</span>
                      {detection.suspicious && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                          Suspicious
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <ul className="space-y-3">
            {imageAnalysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
);

export default ActivityDetector;