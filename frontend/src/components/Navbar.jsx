import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">Career Connect</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition">Dashboard</Link>
                <Link to="/jobs" className="text-gray-600 hover:text-primary transition">Jobs</Link>
                <Link to="/post" className="text-gray-600 hover:text-primary transition">Post</Link>
                <Link to="/ai-career" className="text-gray-600 hover:text-primary transition">AI Coach</Link>
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  <span className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    <User className="h-4 w-4 mr-1 text-primary" />
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition">Login</Link>
                <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 hover:shadow-md transition font-medium">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
