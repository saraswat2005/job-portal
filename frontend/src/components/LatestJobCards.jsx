import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-50 border border-gray-200 hover:shadow-2xl transition-shadow cursor-pointer"
        >
            <div className="mb-4">
                <h1 className="font-semibold text-xl text-indigo-600">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>
            <div className="mb-4">
                <h2 className="font-bold text-lg text-gray-800">{job?.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
            </div>
            <div className="flex items-center gap-3 mt-4 flex-wrap">
                <Badge className="text-blue-600 bg-blue-100 font-semibold px-3 py-1 rounded-full">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-red-600 bg-red-100 font-semibold px-3 py-1 rounded-full">
                    {job?.jobType}
                </Badge>
                <Badge className="text-purple-700 bg-purple-100 font-semibold px-3 py-1 rounded-full">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
