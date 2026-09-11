# Career Connect

A complete full-stack web application connecting job seekers with opportunities and real company reviews, powered by React, Node.js, Express, and MongoDB.

## Features

- **Authentication**: Secure JWT-based signup and login system.
- **Jobs Viewer**: Browse internships and jobs, search by role, filter by type.
- **Reviews**: Read genuine interview experiences and ratings.
- **Data Giver**: Post your own job opportunities and interview reviews to help the community.
- **AI Career Coach**: Input your skills and get a personalized career path recommendation and skill gap analysis (using a simulated AI for ease of setup).

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Lucide React (Icons).
- **Backend**: Node.js, Express.
- **Database**: In-Memory MongoDB Server (`mongodb-memory-server`) for zero-configuration, seamless setup.

## Step-by-Step Setup Instructions

Follow these steps to run the project locally. 

### 1. Backend Setup

Open a terminal and run the following commands:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server (runs on http://localhost:5000)
node server.js
```

> **Note**: The backend uses an in-memory MongoDB database. This means no database setup or connection strings are required! Everything will run entirely locally out of the box.

### 2. Frontend Setup

Open a second terminal window/tab and run the following commands:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```

### 3. Accessing the App

Once both servers are running, open your browser and navigate to:
**http://localhost:5173** (or the port Vite provides in the terminal).

## How to Test the App

1. Click **Get Started** to create a new account.
2. Fill in the dummy details (e.g. `john@example.com`, password: `password123`) and select your role.
3. You will be redirected to the Dashboard.
4. Go to **Post Opportunity** (Data Giver Section) and post a dummy Job and a dummy Review.
5. Go to **Viewer Section** to see the job and review you just posted.
6. Click **Try AI Career Coach**, type in a few skills like "HTML, CSS", and watch the AI give you insights!
