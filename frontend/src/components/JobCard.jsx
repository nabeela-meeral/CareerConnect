import React from 'react';
import { Building, MapPin, DollarSign, Clock, Calendar } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{job.role}</h3>
          <div className="flex items-center text-primary font-medium mt-1">
            <Building className="h-4 w-4 mr-1" />
            {job.companyName}
          </div>
        </div>
        <span className="px-3 py-1 bg-indigo-50 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
          {job.type}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

      <div className="grid grid-cols-2 gap-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <DollarSign className="h-4 w-4 mr-2" />
          {job.salary}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          {job.duration}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          Deadline: {new Date(job.deadline).toLocaleDateString()}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skillsRequired.map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
            {skill}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-400">
          Posted by {job.postedBy?.name}
        </span>
        <a
          href={job.applicationLink.startsWith('http') ? job.applicationLink : `https://${job.applicationLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard;
