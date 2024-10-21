import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 p-8 bg-white shadow-md rounded-lg'>
            <div className='flex items-start justify-between mb-8'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-800'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-3 mt-3'>
                        <Badge className={'bg-blue-100 text-blue-700 font-semibold'} variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className={'bg-red-100 text-red-700 font-semibold'} variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className={'bg-purple-100 text-purple-700 font-semibold'} variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-md px-6 py-3 font-medium ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h2 className='border-b-2 border-gray-300 text-lg font-semibold py-3 mb-6'>Job Details</h2>
            <div className='space-y-4'>
                <h3 className='text-gray-700 font-bold'>Role: <span className='pl-4 font-normal'>{singleJob?.title}</span></h3>
                <h3 className='text-gray-700 font-bold'>Location: <span className='pl-4 font-normal'>{singleJob?.location}</span></h3>
                <h3 className='text-gray-700 font-bold'>Description: <span className='pl-4 font-normal'>{singleJob?.description}</span></h3>
                <h3 className='text-gray-700 font-bold'>Experience: <span className='pl-4 font-normal'>{singleJob?.experience} years</span></h3>
                <h3 className='text-gray-700 font-bold'>Salary: <span className='pl-4 font-normal'>{singleJob?.salary} LPA</span></h3>
                <h3 className='text-gray-700 font-bold'>Total Applicants: <span className='pl-4 font-normal'>{singleJob?.applications?.length}</span></h3>
                <h3 className='text-gray-700 font-bold'>Posted Date: <span className='pl-4 font-normal'>{new Date(singleJob?.createdAt).toLocaleDateString()}</span></h3>
            </div>
        </div>
    );
};

export default JobDescription;
