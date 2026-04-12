# Smart Traffic Management System

An intelligent traffic control system built with React.js that dynamically adjusts traffic signals based on real-time vehicle density, waiting time, and emergency conditions.

---

## Overview

This project simulates a smart city traffic system where signal timings are not fixed. Instead, they adapt dynamically using a priority-based algorithm that considers traffic load and waiting time.

The system provides a complete monitoring dashboard with analytics, logs, sensors, and visualization tools.

---

## Features

### Intelligent Signal Control

* Dynamic signal switching based on traffic density and waiting time
* Group-based signal system (A-C and B-D)
* Adaptive signal timing (Low, Medium, High traffic)

### Real-Time Traffic Simulation

* Vehicles are added randomly over time
* Vehicles move only on green signals
* Early signal switching when roads are cleared

### Emergency Handling

* Manual emergency trigger for any road
* Overrides normal signal logic
* Immediate green signal for selected road

### Live Dashboard

* Displays active signals and timer
* Shows total vehicles and congestion level
* Real-time updates

### AI Camera Feed

* Simulated AI-based vehicle detection
* Displays live vehicle count for each road

### IoT Sensor Monitoring

* Sensor ID, type, and road mapping
* Battery percentage tracking
* Status indicators (online, warning)

### Analytics & Visualization

* Average traffic flow calculation
* Peak traffic detection
* Bar, Line, and Doughnut charts

### Heatmap

* Visual representation of traffic intensity over time

### Live Logs

* Real-time system logs with levels:

  * INFO
  * WARN
  * ALERT

### Signal Usage Tracking

* Tracks how often each road receives a green signal

---

## Core Algorithm

Signal selection is based on priority:

```
Priority = (Traffic × 2) + (Waiting Time × 1.5)
```

* The group with the highest priority gets the green signal
* Signal duration is adjusted dynamically:

  * Low Traffic → 20 seconds
  * Medium Traffic → 35 seconds
  * High Traffic → 50 seconds

---

## Tech Stack

* Frontend: React.js
* Styling: Tailwind CSS
* Charts: Chart.js
* Icons: Lucide React

---

## Project Structure

```
src/
├── App.jsx
├── index.css
├── main.jsx
│
├── components/
│   ├── analytics/
│   │   ├── AdvancedCharts.jsx
│   │   ├── Analytics.jsx
│   │   ├── Heatmap.jsx
│   │   └── LiveLogs.jsx
│   │
│   ├── control/
│   │   └── SignalControl.jsx
│   │
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── SignalOverview.jsx
│   │   └── TrafficGraph.jsx
│   │
│   ├── data/
│   │   ├── DataCollection.jsx
│   │   └── SensorTable.jsx
│   │
│   └── detection/
│       └── CameraFeed.jsx
│
├── data/
│   ├── initialData.js
│   └── sensorsData.js
│
├── logic/
│   ├── densityLogic.js
│   └── signalLogic.js
│
└── pages/
    └── Home.jsx
```

---

## Installation

```bash
git clone https://github.com/your-username/smart-traffic-system.git
cd smart-traffic-system
npm install
npm run dev
```

---

## How It Works

* Initial traffic is loaded
* Every second:

  * Vehicles are added randomly
  * Vehicles pass on active green roads
* Signal decision updates dynamically
* UI reflects changes in real-time

---

## Future Improvements

* Machine learning-based traffic prediction
* Real-time IoT hardware integration
* Map-based visualization (Google Maps API)
* Backend integration with database
* Multi-intersection coordination

---

## Author

Harshit Goel

---

## License

This project is licensed under the MIT License.
