import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobsViewer from './pages/JobsViewer';
import PostOpportunity from './pages/PostOpportunity';
import AiCareerPath from './pages/AiCareerPath';
import { AuthProvider, AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><JobsViewer /></ProtectedRoute>} />
              <Route path="/post" element={<ProtectedRoute><PostOpportunity /></ProtectedRoute>} />
              <Route path="/ai-career" element={<ProtectedRoute><AiCareerPath /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
