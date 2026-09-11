import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostOpportunity = () => {
  const [activeTab, setActiveTab] = useState('job');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [jobData, setJobData] = useState({
    type: 'full-time',
    companyName: '',
    role: '',
    salary: '',
    duration: '',
    skillsRequired: '',
    location: '',
    description: '',
    applicationLink: '',
    deadline: ''
  });

  const [reviewData, setReviewData] = useState({
    companyName: '',
    rating: 5,
    interviewDifficulty: 'Medium',
    interviewQuestions: '',
    experience: ''
  });

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const formattedData = {
        ...jobData,
        skillsRequired: jobData.skillsRequired.split(',').map(s => s.trim())
      };

      const response = await fetch('http://127.0.0.1:5000/api/jobs', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData)
      });

      if (response.ok) {
        setMessage('Job posted successfully!');
        setTimeout(() => navigate('/jobs'), 1500);
      } else {
        setMessage('Failed to post job.');
      }
    } catch (err) {
      setMessage('Server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const formattedData = {
        ...reviewData,
        interviewQuestions: reviewData.interviewQuestions.split('\n').filter(q => q.trim())
      };

      const response = await fetch('http://127.0.0.1:5000/api/reviews', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData)
      });

      if (response.ok) {
        setMessage('Review posted successfully!');
        setTimeout(() => navigate('/jobs'), 1500);
      } else {
        setMessage('Failed to post review.');
      }
    } catch (err) {
      setMessage('Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Data Giver Section</h1>
      
      <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
        <button
          onClick={() => setActiveTab('job')}
          className={`flex-1 py-2 rounded-md font-medium transition ${activeTab === 'job' ? 'bg-white shadow text-primary' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Post Opportunity
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`flex-1 py-2 rounded-md font-medium transition ${activeTab === 'review' ? 'bg-white shadow text-primary' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Write a Review
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {activeTab === 'job' ? (
        <form onSubmit={handleJobSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={jobData.companyName} onChange={e => setJobData({...jobData, companyName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role/Position</label>
              <input type="text" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={jobData.role} onChange={e => setJobData({...jobData, role: e.target.value})} />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white" value={jobData.type} onChange={e => setJobData({...jobData, type: e.target.value})}>
                <option value="internship">Internship</option>
                <option value="part-time">Part-Time</option>
                <option value="full-time">Full-Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary/Stipend</label>
              <input type="text" required placeholder="e.g. $5000/mo" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={jobData.salary} onChange={e => setJobData({...jobData, salary: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input type="text" required placeholder="e.g. 6 Months" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={jobData.duration} onChange={e => setJobData({...jobData, duration: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" required placeholder="Remote, NY, etc." className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={jobData.location} onChange={e => setJobData({...jobData, location: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
              <input type="date" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={jobData.deadline} onChange={e => setJobData({...jobData, deadline: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills Required (comma separated)</label>
            <input type="text" required placeholder="React, Node.js, MongoDB" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={jobData.skillsRequired} onChange={e => setJobData({...jobData, skillsRequired: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Link</label>
            <input type="url" required placeholder="https://..." className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={jobData.applicationLink} onChange={e => setJobData({...jobData, applicationLink: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required rows={4} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={jobData.description} onChange={e => setJobData({...jobData, description: e.target.value})}></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Post Opportunity'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={reviewData.companyName} onChange={e => setReviewData({...reviewData, companyName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Overall Rating (1-5)</label>
              <input type="number" min="1" max="5" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={reviewData.rating} onChange={e => setReviewData({...reviewData, rating: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interview Difficulty</label>
            <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white" value={reviewData.interviewDifficulty} onChange={e => setReviewData({...reviewData, interviewDifficulty: e.target.value})}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interview Questions Asked (One per line)</label>
            <textarea required rows={4} placeholder="- Tell me about yourself.&#10;- Explain event loop." className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={reviewData.interviewQuestions} onChange={e => setReviewData({...reviewData, interviewQuestions: e.target.value})}></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Overall Experience</label>
            <textarea required rows={4} placeholder="Describe how the interview went..." className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" value={reviewData.experience} onChange={e => setReviewData({...reviewData, experience: e.target.value})}></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PostOpportunity;
