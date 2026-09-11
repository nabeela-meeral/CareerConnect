import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, Users, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-4xl w-full border border-gray-100">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Launch Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Career Connect</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate platform to find internships, full-time roles, and company reviews all in one place. Discover your next big opportunity today.
        </p>
        
        <div className="flex justify-center space-x-6 mb-16">
          <Link to="/signup" className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 hover:-translate-y-1 transform transition shadow-lg hover:shadow-indigo-500/30">
            Get Started
          </Link>
          <Link to="/login" className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition">
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8 border-t border-gray-100 pt-12">
          <div className="p-6 bg-indigo-50 rounded-2xl">
            <TrendingUp className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Find Opportunities</h3>
            <p className="text-gray-600">Browse thousands of jobs and internships tailored to your skills.</p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl">
            <Award className="h-10 w-10 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Read Real Reviews</h3>
            <p className="text-gray-600">Get insider knowledge about interviews and company culture.</p>
          </div>
          <div className="p-6 bg-amber-50 rounded-2xl">
            <Users className="h-10 w-10 text-amber-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Career Coach</h3>
            <p className="text-gray-600">Analyze your skills and discover the perfect career path for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
