import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import QuestionCard from './QuestionCard';
import CreatePost from './CreatePost';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/Features/userDetails';
import { ClipLoader } from 'react-spinners';

const Feed = () => {
  const { userData } = useSelector(selectUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/feed/get-posts`, { withCredentials: true });
        setPosts(response.data.data.sortedFeed);
        setCount(response.data.data.postCount + response.data.data.questionCount);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='w-full h-full p-2 flex flex-col gap-2'>
      <div className="sm:hidden  w-full flex justify-between mb-4">
        <h1 className='text-2xl font-semibold px-4 text-gray-900 dark:text-gray-100'>My Feed</h1>
        <CreatePost />
      </div>

     

      <div className="flex w-full gap-8">

        {isLoading ? (
          <div className="flex w-2/3 justify-center items-center h-full">
            <ClipLoader color='skyBlue'/>
            </div>
        ) :   <div className="sm:w-2/3 w-full min-h-screen sm:p-4 p-2 flex flex-col ">
          {posts?.length > 0 ? (
            <div className='max-h-[90vh] md:pb-12 w-full flex flex-col gap-4 pb-4 overflow-y-auto no-scrollbar'>
              {posts.map((post) =>
                post.type === "post" ? (
                  <PostCard key={post._id} obj={post} />
                ) : (
                  <QuestionCard key={post._id} obj={post} />
                )
              )}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-600 dark:text-gray-300">
              <p>No posts available. Please check back later!</p>
            </div>
          )}
        </div>
            }
      
      

       
        <div className="hidden sm:grid w-[40vh] mt-5">
          <div className="w-full min-h-[10vh] bg-gray-100 dark:bg-dark-card p-4 rounded-md shadow-md">
            <div className="w-full h-fit flex flex-col justify-center items-center gap-4">
              <div className="w-32 h-32 rounded-full border-2 border-blue-300">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={userData?.avatar}
                  alt="User Avatar"
                />
              </div>

              <div className="w-full flex flex-col justify-center items-center">
                <h1 className='font-semibold text-gray-900 dark:text-gray-100'>{userData?.fullName}</h1>
                <h1 className='text-sm font-semibold text-gray-500 dark:text-gray-400'>
                  @{userData?.username}
                </h1>
              </div>

              {/* Stats */}
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="h-16 bg-gray-100 dark:bg-dark-inside-card rounded-md flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
                  <h1 className="text-sm">Total posts</h1>
                  <h1 className="font-semibold">{count}</h1>
                </div>

                <div className="h-16 bg-gray-100 dark:bg-dark-inside-card rounded-md flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
                  <h1 className="text-sm">Saved</h1>
                  <h1 className="font-semibold">
                   1
                  </h1>
                </div>
              </div>

              {/* Create Post Button for Desktop */}
              <div className="w-full flex justify-center">
                <CreatePost />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;