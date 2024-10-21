import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="text-center py-16 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex flex-col items-center gap-8 my-10 h-[60vh]">
                <h1 className="text-6xl font-extrabold leading-tight text-gray-800">
                    Search, Apply & <br />
                    Get Your <span className="text-indigo-600">Dream Jobs</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-lg mx-auto">
                    Discover thousands of opportunities across various industries and locations. Your next career move starts here!
                </p>
                <div className="flex w-full max-w-2xl shadow-xl border border-gray-300 bg-white pl-4 pr-2 py-3 rounded-full items-center gap-4 transition-transform transform hover:scale-105">
                    <input
                        type="text"
                        placeholder="Find your dream job"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full text-lg text-gray-700 placeholder-gray-500 "
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 p-3 flex items-center justify-center shadow-lg transition-colors">
                        <Search className="h-6 w-6 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
