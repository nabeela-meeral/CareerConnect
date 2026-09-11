import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, Edit3, Award } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-gray-600">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Viewer Section */}
        <Link to="/jobs" className="group block h-full">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full transition transform hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
            <div className="h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Eye className="h-8 w-8 text-primary group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Viewer Section</h2>
            <p className="text-gray-600 mb-6">
              Browse the latest job and internship opportunities. Discover salaries, requirements, and read genuine company reviews.
            </p>
            <span className="text-primary font-semibold flex items-center">
              Explore Jobs &rarr;
            </span>
          </div>
        </Link>

        {/* Data Giver Section */}
        <Link to="/post" className="group block h-full">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full transition transform hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/30">
            <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
              <Edit3 className="h-8 w-8 text-emerald-600 group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Giver Section</h2>
            <p className="text-gray-600 mb-6">
              Share a new job/internship opportunity or write a review about your recent interview experience to help others.
            </p>
            <span className="text-emerald-600 font-semibold flex items-center">
              Post Opportunity &rarr;
            </span>
          </div>
        </Link>
      </div>
      
      <div className="mt-8 text-center">
         <Link to="/ai-career" className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
            <Award className="h-5 w-5" />
            <span>Try AI Career Coach</span>
         </Link>
      </div>
    </div>
  );
};

export default Dashboard;
