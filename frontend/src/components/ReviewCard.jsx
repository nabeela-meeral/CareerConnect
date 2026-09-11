import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{review.companyName}</h3>
        <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
          <Star className="h-4 w-4 text-amber-500 fill-current mr-1" />
          <span className="font-bold text-amber-700">{review.rating}/5</span>
        </div>
      </div>

      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-700 mr-2">Interview Difficulty:</span>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          review.interviewDifficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
          review.interviewDifficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
          'bg-red-100 text-red-700'
        }`}>
          {review.interviewDifficulty}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" /> Experience
        </h4>
        <p className="text-gray-600 text-sm italic">"{review.experience}"</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Questions Asked:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {review.interviewQuestions.map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
         <p className="text-xs text-gray-400">Review by {review.postedBy?.name}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
