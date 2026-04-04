# Integration Instructions for Gas Price Prediction

This module (`optimalGasPricePrediction.py`) needs to be integrated into the main transaction dispatcher.

## 1. Background Service
- Background scheduler or worker must run the algorithm **every 5 seconds**.
- Store outputs in a dynamic cache (Redis or in-memory).

## 2. Priority Mapping
Use these confirmation targets:
- **Priority 2 (High)**: 20s (For `executeMilestone`, `finalize`, `selectContractor`)
- **Priority 1 (Med)**: 40s (For `submitMilestone`, `submitReport`)
- **Priority 0 (Low)**: 60s (For `createTender`, `registerUser`)

## 3. Implementation
- Never compute gas price at tx time.
- Always fetch from cache based on tx type above.
- Background worker handles the heavy calculation and updates the cache.
