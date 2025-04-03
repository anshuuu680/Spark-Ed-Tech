import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const Comment = ({ comment, userId }) => {
    const [isLiked, setIsLiked] = useState(comment?.isLiked || false);
    const [allLikes, setAllLikes] = useState(comment?.likes?.length || 0);
    const timeDifference = formatDistanceToNow(new Date(comment?.createdAt), { addSuffix: true });
    const _id = comment?._id;
    const { owner } = comment;

    const handleLike = async () => {
        try {
            setIsLiked(prevIsLiked => !prevIsLiked);
            const response = await axios.post('/api/feed/like', { _id, type: "comment", userId });
            setAllLikes(response.data.data); // Assumes response.data.data returns the new number of likes
        } catch (error) {
            console.error("Error liking comment:", error);
            setIsLiked(prevIsLiked => !prevIsLiked); // Revert like state on error
        }
    };

    return (
        <div className="comment w-full h-fit flex flex-col gap-2 sm:gap-3 p-2 rounded-lg shadow-sm">
            {/* Avatar Section */}
            <div className='flex gap-3 items-center'>

            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                <img className="w-full h-full object-cover" src={owner?.avatar} alt={`${owner?.username}'s avatar`} />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
                    <h1 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-100">
                        {owner?.username}
                    </h1>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 font-light">{timeDifference}</span>
                </div>


            </div>
            {/* Comment Content */}
            <div className="w-full px-14">
                {/* Username & Timestamp */}
               
                {/* Comment Text */}
                <p className="text-sm  sm:text-base text-gray-800 dark:text-gray-200">{comment?.content}</p>

                {/* Like Section */}
                <div className="flex items-center gap-2 cursor-pointer mt-2">
                    <svg
                        onClick={handleLike}
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isLiked ? 'green' : 'none'}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14"></polygon>
                    </svg>
                    <p className="text-xs sm:text-sm md:text-base dark:text-gray-200">{allLikes || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default Comment;
