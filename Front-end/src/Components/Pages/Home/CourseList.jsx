import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CourseCard from './CourseCard';
import './style.css';
import 'swiper/css/navigation'; // Include navigation styles if using navigation
import 'swiper/css/autoplay'; // Include autoplay styles

const dataArray = [
  {
    title: 'Mobile App Development',
    imageSrc: 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
    rating: 4.3,
    students: 130,
    tutor: 'Daniel Martinez',
    priceOrg: 62.5,
    priceDemo: 10.5,
  },
  {
    title: 'Cybersecurity Basics',
    imageSrc: 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
    rating: 3.9,
    students: 85,
    tutor: 'Sophia Anderson',
    priceOrg: 51.25,
    priceDemo: 8.75,
  },
  {
    title: 'Digital Marketing Strategies',
    imageSrc: 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
    rating: 4.6,
    students: 140,
    tutor: 'Liam Thomas',
    priceOrg: 70.0,
    priceDemo: 11.5,
  },
];

const CourseList = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile if width is less than 768px
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="sm:px-8 md:px-16 lg:px-32 py-8 flex flex-col items-center justify-center">
      {isMobile ? (
       <Swiper
       slidesPerView={1}
       spaceBetween={10}
       loop={true}
       autoplay={{
         delay: 1250,
         disableOnInteraction: false,
       }}
      
       className="w-full max-w-md flex justify-center items-center"
     >
       {dataArray.map((obj, index) => (
         <SwiperSlide key={index} className="w-full h-full py-4 md:ml-0">
           <CourseCard {...obj} />
         </SwiperSlide>
         
       ))}
     </Swiper>
     
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dataArray.map((obj, index) => (
            <div key={index} className="flex justify-center">
              <CourseCard {...obj} />
            </div>
          ))}
        </div>
      )}
    {isMobile?<h1 className='font-semibold flex items-center gap-2'>Swipe to view more</h1>:<></>}
      
    </div>
  );
};

export default CourseList;
