# 🎪 Pandal Hopping (Kolkata Durga Puja Guide)

An offline-first mobile application built with **React Native**, **Expo Router**, and **TypeScript** designed to help over 4+ million festival-goers explore, curate, and walk Durga Puja pandal trails across Kolkata without cellular data dependency.

---

## 💡 The Problem
During Durga Puja, dense crowds and narrow heritage lanes cause cellular mobile data networks to jam completely. Web-based maps and search engines fail right when visitors need them most. Route plans get lost in chat screenshots, and dynamic traffic closures change every evening.

## 🚀 The Solution
- **100% Offline-First Architecture:** Bundled offline Kolkata map and curated database of 248+ historic, traditional, and theme pandals across 20 distinct zones.
- **Smart Trail Planning:** Custom route builder with nearest-neighbor order optimization and walking time estimations based on real pedestrian trail formulas.
- **Dynamic Updates:** Online polling pipeline for nightly police closures, traffic notices, and no-vehicle zones that caches the latest bulletin locally.
- **Trilingual & Inclusive:** Full interface localization across English, Bengali (featuring native Bengali digits), and Hindi with WCAG-compliant high-contrast themes (Light/Dark).
- **Privacy By Design:** Zero tracking, no server backend, and no account creation. Custom routes are shared as lightweight deep-link payloads.

---

## 🛠️ Tech Stack & Architecture
- **Framework:** React Native 0.76+ / Expo SDK 52+ (Managed Workflow)
- **Routing:** Expo Router (File-based navigation & deep linking)
- **State Management:** Zustand with AsyncStorage local persistence
- **Animation Engine:** React Native Reanimated & React Native SVG (Hardware-accelerated native animations with `AccessibilityInfo` reduce-motion compliance)
- **Language:** TypeScript with strict type-safety
- **Localization:** i18next & react-i18next
