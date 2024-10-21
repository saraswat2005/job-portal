import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Android Developer",
    "Software Engineer",
    "Member of Technical Staff",
    "Data Scientist",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="w-full max-w-5xl mx-auto my-20">
            <Carousel className="relative">
                <CarouselContent className="flex space-x-6 justify-center">
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="basis-full md:basis-1/3 lg:basis-1/4 text-center">
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="rounded-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold transition-transform transform hover:scale-105 shadow-lg"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
