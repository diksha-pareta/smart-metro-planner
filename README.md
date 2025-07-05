#  Smart Metro Planner using AI

An intelligent metro travel assistant that uses Google Gemini (Generative AI) to provide the **best metro route**, **smart seat suggestions**, **exit gate info**, and **personalized actions** after reaching your destination.

Built with  React + Gemini AI + TailwindCSS

---

##  Screenshots

| Home Page | Route Summary | Seat Finder |
|-----------|---------------|-------------|
| ![Home](./screenshots/home.png) | ![Route](./screenshots/route-summary.png) | ![Seat Finder](./screenshots/seat-finder.png) |

---

##  Features

###  Smart Route Planning
- Enter source & destination stations.
- Get best metro route with **interchange tips**, **travel time**, and **fare**.
- Color-coded metro lines & interchange indicators.

###  Smart Travel Summary
- AI-generated summary with:
  - Best time to travel
  - Crowd level
  - Gate exit direction
  - Nearby landmarks

###  Smart Seat Finder (AI)
- Suggests where you’re more likely to get a seat.
- Based on time, crowd pattern, deboarding stations, and flexibility (walk to nearby stations).
- Provides chances of getting a seat (%) and boarding tips.

###  "What Can I Do After Reaching?" Suggestions
- Gemini AI gives personalized ideas like:
  - Nearby food joints
  - Landmarks
  - Short plans for your destination

###  Final Mile Planner
- Suggests walking or auto options from metro to your final destination.
- Includes walking time, fare estimate, and travel tips.

---

##  Tech Stack

| Tech          | Purpose                               |
|---------------|----------------------------------------|
| React         | Frontend Framework                     |
| TypeScript    | Type Safety                            |
| TailwindCSS   | Styling & Responsiveness               |
| Gemini (Google) | Generative AI for smart suggestions |
| PapaParse     | CSV parsing (GTFS data for metro)      |
| React Select  | Station dropdowns                    |

---

##  How It Works

- **planMetroRoute()** in `geminiService.ts`: Fetches optimized route and summary using Gemini API.
- **getNextSuggestions()**: Suggests “What to do after reaching?” via prompt-based AI output.
- **getSmartSeatSuggestion()**: Fetches crowd-based smart seat tips.
- **GTFS data**: Used to list metro stations from `stops.txt`.

---

##  Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/smart-metro-planner.git
cd smart-metro-planner

###  2. Install Dependencies

```bash
npm install

### 3. Setup Environment Variables

Create a `.env` file in the root and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here


## 4.  Run the App Locally

npm run dev


---

#### 3.  **Missing Link to Live App (If Deployed)**  
If you've deployed the project (e.g., Netlify, Vercel), add:

```md
### 🌐 Live Demo

Check out the live app: [https://smartmetroai.vercel.app](https://your-deploy-link)

### 📁 Folder Structure

```plaintext
/src
  ├── components/
  │   ├── Header.tsx
  │   ├── LocationInput.tsx
  │   ├── RouteResults.tsx
  │   ├── SmartSeatFinder.tsx
  │   ├── NearbyRecommendations.tsx
  │   └── ChatBot.tsx
  ├── services/
  │   └── geminiService.ts
  ├── data/
  │   └── delhi-metro-gtfs/stops.txt
  ├── App.tsx
  └── main.tsx


---

#### 5. **Credits Section (Optional)**  
Add author/credits if this is for a portfolio or submission:

```md
---

##  Author

Made by Diksha Kumari Pareta  
GitHub: [@your-github](https://github.com/your-github)
