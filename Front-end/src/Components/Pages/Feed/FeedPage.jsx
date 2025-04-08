import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import Comment from './Comment';
import { Button } from "@/Components/ui/button.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
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
                const response = await axios.get(`https://spark-ed-tech.onrender.com/api/feed/post-data?id=${_id}&type=${type}`, {
                    params: { userId }
                });
                if (response.status === 200) {
                    setPostData(response.data.data.result);
                    setIsLiked(response.data.data.existingLike || false);
                    setComments(response.data.data.commentsWithLikes);
                    setAllLikes(response.data.data.totalLikes.length);
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
            setIsLiked(prevIsLiked => !prevIsLiked);
            const response = await axios.post('https://spark-ed-tech.onrender.com/api/feed/like', { _id, type, userId });
            setAllLikes(response.data.data);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const openHandler = () => {
        setIsOpen(!isOpen);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://spark-ed-tech.onrender.com/api/feed/add-comment", { value, type, _id });
            setIsOpen(false)
            setValue('');
            setComments(response.data.data);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };


    return (
        <div className="w-full h-fit max-h-[100vw] flex  pt-4 px-4 gap-2">
            <div className="dynamic w-full h-fit flex flex-col lg:flex-row  gap-4">
                <div className="p-4 sm:h-fit h-full w-full sm:w-1/2  scrollable rounded-xl overflow-hidden shadow-lg border dark:border-dark-border border-gray-300 transition-all ">
                    <Navbar user={postData?.postedBy} time={time} data={postData} />
                    {postData?.title && (
                        <div className="text-base mb-1">
                            <h1 className='dark:text-gray-100 font-bold'>{postData.title}</h1>
                        </div>
                    )}
                    {postData?.question && (
                        <div className="text-base pt-2">
                            <h1 className='dark:text-gray-100 font-bold'>{postData.question}</h1>
                        </div>
                    )}
                    {postData?.description && (
                        <div className="para text-gray-400">
                            <p className="text-sm dark:text-gray-200">{postData.description}</p>
                        </div>
                    )}
                    {postData?.imageUrl && (
                        <div className="img-div w-full  border border-gray-300 dark:border-dark-border flex justify-center items-center m-auto mt-3 rounded-2xl overflow-hidden p-2 sm:h-screen">
                            <img style={{ objectFit: 'contain', height: '100%', width: '100%' }} src={postData.imageUrl} alt={postData.title} />
                        </div>
                    )}
                    <div className="footer px-3 w-full p-2 h-12 flex items-end gap-4">
                        <div className="likes h-fit flex items-center gap-2 cursor-pointer dark:text-gray-100">
                            <svg
                                onClick={handleLike}
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill={isLiked ? 'green' : 'none'}
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14"></polygon>
                            </svg>
                            <p className="text-sm">{allLikes || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 w-full sm:w-1/2 max-h-[90vh] overflow-y-auto no-scrollbar rounded-xl">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-start sm:items-center">
                        {/* Comment Count */}
                        <h1 className="font-bold text-base sm:text-lg md:text-xl h-auto text-gray-900 dark:text-gray-200">
                            {comments.length || 0} Comments
                        </h1>

                        {/* Dialog for Adding Comments */}
                        <Dialog open={isOpen} onOpenChange={openHandler}>
                            <DialogTrigger asChild>
                                <Button className="hover:bg-blue-600 border-0 px-4 py-2 text-sm sm:text-base">Add Comment</Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px] w-full bg-dark-background border-0 text-gray-100 rounded-lg shadow-lg p-4 sm:p-6 transition duration-500">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-lg sm:text-xl">Add a Comment</DialogTitle>
                                </DialogHeader>

                                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="comment" className="block text-sm font-medium mb-2">
                                            Comment
                                        </label>
                                        <textarea
                                            id="comment"
                                            placeholder="Add a comment"
                                            className="w-full p-3 rounded-lg border outline-none bg-dark-background border-dark-border focus:ring-blue-600 focus:border-blue-600 resize-none"
                                            onChange={(e) => setValue(e.target.value)}
                                            value={value}
                                        />
                                    </div>
                                    <Button type="submit" className="self-end sm:self-start px-4 py-2 text-sm sm:text-base">Add</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="w-full h-fit mt-4 flex flex-col gap-4">
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
