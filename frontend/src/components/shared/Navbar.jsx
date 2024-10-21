import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">
                        <Link to="/"><span className='text-green-500'>BizByte </span>
                            Job<span className="">Portal</span>
                        </Link>
                    </h1>
                </div>
                <div className="flex items-center gap-8">
                    <ul className="flex font-medium items-center gap-6 text-white">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className="hover:text-yellow-300 transition-colors">
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className="hover:text-yellow-300 transition-colors">
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className="hover:text-green-300 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="hover:text-green-300 transition-colors">
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="hover:text-green-300 transition-colors">
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline" className="border-gray-200 text-black hover:bg-green-400 hover:text-indigo-600">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-800">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <FaUserCircle className='' />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 bg-white shadow-md rounded-lg">
                                <div className="p-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar className="cursor-pointer">
                                            <FaUserCircle />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-lg text-indigo-700">{user?.fullname}</h4>
                                            <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-gray-700">
                                        {user && user.role === 'student' && (
                                            <div className="flex items-center gap-2 mb-2 cursor-pointer">
                                                <User2 className="text-gray-500" />
                                                <Button variant="link" className="text-gray-700 hover:text-indigo-600">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <LogOut className="text-gray-500" />
                                            <Button onClick={logoutHandler} variant="link" className="text-gray-700 hover:text-red-600">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
