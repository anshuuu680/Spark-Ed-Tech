import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CourseCard = ({ imageSrc, title, rating, students, tutor, priceOrg, priceDemo }) => {
  return (
    <div className="flex flex-col w-full  max-w-[90vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[40vw] xl:max-w-[30vw] bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="w-full h-40 sm:h-48 md:h-56 bg-gray-200 overflow-hidden rounded-t-lg">
        <img
          className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110"
          src={imageSrc}
          alt={title}
        />
      </div>

      <div className="px-4 py-4 flex flex-col gap-2">
        <h1 className="text-lg md:text-xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500">By {tutor}</p>

        <div className="flex items-center gap-2 text-sm text-yellow-500">
          <span className="font-semibold">{rating}</span>
          <span className="text-gray-500">({students} Students)</span>
        </div>

        <div className="flex gap-2 items-center">
          <h1 className="text-lg md:text-xl font-bold text-green-600">
            &#8377; {priceDemo}/-
          </h1>
          <h1 className="text-sm line-through text-gray-500">
            &#8377; {priceOrg}/-
          </h1>
        </div>

        <Link to="">
          <Button className="w-full py-2 px-4 font-semibold text-white bg-gray-800 hover:bg-gray-900 rounded-md transition duration-300">
            More details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
