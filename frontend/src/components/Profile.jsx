import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl my-8 p-8">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-28 w-28 border-2 border-gray-300 rounded-full">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
                            <p className="text-gray-600">{user?.profile?.bio || "No bio available"}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setOpen(true)} 
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-full p-2" 
                        variant="outline">
                        <Pen />
                    </Button>
                </div>
                <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="text-gray-600" />
                        <span className="text-gray-700">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact className="text-gray-600" />
                        <span className="text-gray-700">{user?.phoneNumber || "No phone number provided"}</span>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user?.profile?.skills.length > 0 
                            ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                                    {item}
                                </Badge>
                            ))
                            : <span className="text-gray-600">No skills added</span>
                        }
                    </div>
                </div>
                <div className="mt-6">
                    <Label className="text-md font-semibold text-gray-800">Resume: </Label>
                    {isResume && user?.profile?.resume ? (
                        <a 
                            target='_blank' 
                            href={user?.profile?.resume} 
                            className="text-blue-500 hover:underline cursor-pointer">
                            {user?.profile?.resumeOriginalName || "Download Resume"}
                        </a>
                    ) : (
                        <span className="text-gray-600">No resume available</span>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl mt-6 p-6">
                <h1 className="font-bold text-xl text-gray-800 mb-4">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
