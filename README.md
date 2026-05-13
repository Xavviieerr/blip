# SentinelX: Real-Time Cybersecurity Analytics Platform

SentinelX is a high-performance, production-grade cybersecurity monitoring dashboard built with **Vue 3, TypeScript, and ECharts**. It visualizes live-streaming threat data with smooth updates, advanced analytics, and interactive insights.

## 🚀 Key Features

- **Real-Time Data Pipeline**: A robust event-driven architecture using a mocked streaming generator with Zod validation, buffering, and throttled store updates.
- **Dynamic Visualizations**: 
  - **CPU Threat Activity** (Line Chart)
  - **Network Traffic** (Area Chart)
  - **Requests Per Interval** (Bar Chart)
  - **Threat Heatmap** (Grid Visualization)
- **Animated Metrics**: Live metric cards featuring smooth number interpolation for an "alive" dashboard feel.
- **Activity Feed**: A real-time, searchable feed of security alerts with severity indicators and critical event highlighting.
- **Premium UI/UX**: Dark/Light mode support with synchronized ECharts themes and pulsing status indicators.

## 🏗 Data Architecture

The application follows a strictly decoupled data flow:
`Generator` → `StreamService` → `Zod Validation` → `Event Buffer` → `Throttled Emission` → `Subscribers` → `Pinia Store` → `UI Components`

### Core Technologies
- **Vue 3 (Composition API)**: For modular, reactive components.
- **Pinia**: Centralized state management for realtime data, filters, and themes.
- **ECharts**: High-performance charting with custom themes.
- **Zod**: Runtime schema validation for incoming stream data.

---

## 🎨 AI Styling & Modification Guide

To allow an AI (or a developer without full context) to style specific parts of this app without breaking functional logic, follow this **Component Isolation Strategy**:

### 1. Extract the Template
Provide only the `<template>` and `<style>` blocks. Remove business logic, store imports, and complex methods.

### 2. Define the Data Contract
Instead of the full store, provide a simple JSON mockup of the props or data the component expects.
*Example:*
```json
{
  "event": {
    "alert": {
      "severity": "critical",
      "message": "DDOS Traffic Surge Detected",
      "threatType": "Network Attack"
    },
    "timestamp": 1625097600000
  }
}
```

### 3. Provide Theme Tokens
Always include the global CSS variables from `src/styles/themes.css`. This ensures the AI uses variables like `--bg-secondary` and `--text-primary` instead of hardcoded hex values.

### 4. Enforce Scoped CSS
Instruct the AI to keep all styles within the `<style scoped>` block to prevent global style leakage.

---

## 🛠 Setup & Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 Recent Audit & Fixes
The platform recently underwent a full system audit where the following was implemented:
- **Repaired Real-time Pipeline**: Reconnected the subscriber-based store sync.
- **Zero-Loss Throttling**: Implemented event buffering to prevent data loss during high-frequency updates.
- **Theme Synchronization**: Integrated ECharts with the global Pinia theme store.
- **Performance Polishing**: Added `requestAnimationFrame` counters and optimized activity feed computations.
