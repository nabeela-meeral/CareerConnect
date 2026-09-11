import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import JobCard from '../components/JobCard';
import ReviewCard from '../components/ReviewCard';
import { Search, Filter, Loader2 } from 'lucide-react';

const JobsViewer = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      
      if (activeTab === 'jobs') {
        const response = await fetch('http://127.0.0.1:5000/api/jobs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setJobs(data);
      } else {
        const response = await fetch('http://127.0.0.1:5000/api/reviews', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.role.toLowerCase().includes(search.toLowerCase()) || 
                          job.companyName.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? job.type === filterType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Viewer Section</h1>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-2 rounded-md font-medium transition ${activeTab === 'jobs' ? 'bg-white shadow text-primary' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Opportunities
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-2 rounded-md font-medium transition ${activeTab === 'reviews' ? 'bg-white shadow text-primary' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Company Reviews
          </button>
        </div>
      </div>

      {activeTab === 'jobs' && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by role or company..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative md:w-64">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none bg-white"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="internship">Internship</option>
              <option value="part-time">Part-Time</option>
              <option value="full-time">Full-Time</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      ) : activeTab === 'jobs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => <JobCard key={job._id} job={job} />)
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
              No opportunities found matching your criteria.
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map(review => <ReviewCard key={review._id} review={review} />)
          ) : (
             <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
              No reviews available yet. Be the first to share your experience!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobsViewer;
