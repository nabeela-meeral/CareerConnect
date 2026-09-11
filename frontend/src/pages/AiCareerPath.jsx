import React, { useState } from 'react';
import { Bot, Sparkles, Loader2, ArrowRight } from 'lucide-react';

const AiCareerPath = () => {
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!skills.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);

    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const response = await fetch('http://127.0.0.1:5000/api/ai/suggest-skills', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ skills: skillsArray })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-6 shadow-lg">
          <Bot className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">AI Career Coach</h1>
        <p className="text-xl text-gray-600">Enter your current skills and let our AI analyze your profile to suggest your ideal career path and the missing skills you need to learn.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <form onSubmit={handleAnalyze} className="mb-8">
          <label className="block text-gray-700 font-semibold mb-3">Your Current Skills (comma separated)</label>
          <div className="flex gap-4">
            <input
              type="text"
              className="flex-grow p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:bg-white outline-none transition text-lg"
              placeholder="e.g. HTML, CSS, Python..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading || !skills.trim()}
              className="bg-gray-900 text-white px-8 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center shadow-md disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Sparkles className="h-5 w-5 mr-2 text-amber-400" /> Analyze</>}
            </button>
          </div>
        </form>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6">{error}</div>}

        {result && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Bot className="h-6 w-6 mr-2 text-indigo-600" /> AI Insights
            </h2>
            
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider font-bold text-gray-500 mb-2">Suggested Career Path</h3>
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {result.suggestedCareerPath}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider font-bold text-gray-500 mb-3">Skills to Learn Next</h3>
              <div className="flex flex-wrap gap-3">
                {result.suggestedSkills.map((skill, idx) => (
                  <span key={idx} className="flex items-center px-4 py-2 bg-white text-indigo-700 rounded-lg shadow-sm border border-indigo-100 font-semibold">
                    <ArrowRight className="h-4 w-4 mr-2 text-indigo-400" /> {skill}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500 italic bg-white/50 p-3 rounded-lg border border-indigo-50">{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiCareerPath;
