# Urban Safety Visualizer

A modern, recruiter-friendly React app for visualizing urban safety and crime risk by location. Enter any address to see real-time safety analysis and an interactive map.

## Features
- **Location-based Safety Analysis:** Enter any address and get a risk assessment, crime stats, and safety tips.
- **Live Map:** Interactive map updates to the exact location using OpenStreetMap geocoding and Leaflet.
- **Activity Detector:** Upload images to simulate AI-based suspicious activity detection (mocked for demo).
- **Responsive UI:** Built with Tailwind CSS for a clean, mobile-friendly experience.
- **Beginner/Recruiter Friendly:** Simple code structure, clear documentation, and easy to extend.

## Tech Stack
- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Map:** Leaflet.js + React-Leaflet
- **Icons:** lucide-react
- **Geocoding:** OpenStreetMap Nominatim API (no API key required)

## How It Works
1. Enter a location/address in the search box.
2. The app geocodes the address and shows a risk assessment, crime stats, and safety tips.
3. The map updates to the real location.
4. Switch to the Activity Detector tab to upload an image and see mock AI analysis.

## Future Plans
- **Backend Integration:** Replace mock data with real crime datasets and APIs.
- **AI/Deep Learning:** Integrate ML models for crime prediction and image analysis (YOLO, MobileNet, etc.).
- **User Accounts:** Save favorite locations, get alerts, and personalize safety tips.
- **Data Visualization:** Add charts, heatmaps, and historical trends.
- **Mobile App:** React Native version for on-the-go safety checks.

## Getting Started
1. `npm install`
2. `npm run dev`
3. Open [http://localhost:5173](http://localhost:5173) in your browser

---

Built for learning, demos, and as a full-stack portfolio starter. Contributions welcome!
