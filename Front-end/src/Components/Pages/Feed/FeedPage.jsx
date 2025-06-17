import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import Comment from './Comment';
import { Button } from "@/components/ui/button.jsx";
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector } from 'react-redux';
import { selectUserData } from '@/Features/userDetails';

const FeedPage = () => {
    const location = useLocation();
    const _id = location.pathname.split('=')[1].split('&')[0];
    const type = location.pathname.split('=')[2];
    const [postData, setPostData] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [allLikes, setAllLikes] = useState(null);
    const [time, setTime] = useState('');
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const { userData } = useSelector(selectUserData);
    const userId = userData?._id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/feed/post-data?id=${_id}&type=${type}`, { withCredentials: true });
                if (response.status === 200) {
                    const { result, existingLike, commentsWithLikes, totalLikes } = response.data.data;
                    setPostData(result);
                    setIsLiked(existingLike || false);
                    setComments(commentsWithLikes);
                    setAllLikes(totalLikes.length);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [_id, type, userId]);

    useEffect(() => {
        if (postData?.createdAt) {
            const timeDifference = formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true });
            setTime(timeDifference);
        }
    }, [postData]);

    const handleLike = async () => {
        try {
            setIsLiked(prev => !prev);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/feed/like`, { _id, type, userId }, { withCredentials: true });
            setAllLikes(response.data.data);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const openHandler = () => setIsOpen(!isOpen);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/feed/add-comment`, { value, type, _id }, { withCredentials: true });
            setIsOpen(false);
            setValue('');
            setComments(response.data.data);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="w-full px-4 py-6 flex justify-center items-start">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2 bg-white dark:bg-[#111] border border-gray-200 dark:border-dark-border rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6">
                        <Navbar user={postData?.postedBy} time={time} data={postData} />
                        {postData?.title && (
                            <h1 className="text-lg font-semibold dark:text-gray-100 mt-3">{postData.title}</h1>
                        )}
                        {postData?.question && (
                            <h2 className="text-md font-medium dark:text-gray-300 mt-2">{postData.question}</h2>
                        )}
                        {postData?.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{postData.description}</p>
                        )}
                        {postData?.imageUrl && (
                            <div className="w-full h-[300px] sm:h-[450px] mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-dark-border">
                                <img
                                    src={postData.imageUrl}
                                    alt={postData.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                         <div className="flex items-center justify-start gap-4 mt-3 text-white text-sm">
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="flex items-center gap-1 cursor-pointer hover:text-pink-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3a5.75 5.75 0 0 1 4.25 9.68l-7.5 8.07a.75.75 0 0 1-1.08 0l-7.5-8.07A5.75 5.75 0 1 1 16.5 3z"
            />
          </svg>
          <span>{allLikes || 0}</span>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          className="hover:text-blue-400 cursor-pointer"
        >
          💬 Comment
        </motion.div>
      </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 h-fit max-h-[90vh] overflow-y-auto no-scrollbar bg-white dark:bg-[#111] border border-gray-200 dark:border-dark-border rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <h2 className="text-lg font-semibold dark:text-gray-100">
                            {comments.length || 0} Comments
                        </h2>
                        <Dialog open={isOpen} onOpenChange={openHandler}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm px-4 py-2">
                                    Add Comment
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] w-full bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 border-none rounded-xl">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-medium">Add a Comment</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={submitHandler} className="mt-4 flex flex-col gap-4">
                                    <textarea
                                        id="comment"
                                        placeholder="Share your thoughts..."
                                        className="w-full h-24 p-3 rounded-lg border dark:border-dark-border bg-gray-50 dark:bg-[#111] focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        onChange={(e) => setValue(e.target.value)}
                                        value={value}
                                    />
                                    <Button type="submit" className="self-end bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md">
                                        Comment
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="mt-6 flex flex-col gap-5">
                        {comments.map((comment, index) => (
                            <Comment key={index} comment={comment} userId={userData?._id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedPage;
