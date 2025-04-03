const CourseDetails = () => {
  return (
    <div className="w-full h-fit p-8 bg-dark-background text-white">
      <div className="mb-6">
        <h1 className="text-gray-100 font-bold text-3xl">{'React Beginner to advance'}</h1>
        <p className="text-gray-400 text-sm">{'John Smilga'}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★★★★☆</span>
          <span className="ml-2 text-sm">(4.5)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Course Description</h2>
          <p className="mb-6">
            This course provides an in-depth look at various topics. It is designed to help you understand and master the concepts with real-world examples and hands-on projects.
          </p>

          <h3 className="text-xl font-semibold mb-2">What you'll learn</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Understand the fundamentals of the subject.</li>
            <li>Apply knowledge to real-world scenarios.</li>
            <li>Create projects to demonstrate your skills.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Course Content</h3>
          <div className="mb-6">
            <ul className="space-y-3">
              <li className="p-3 bg-gray-800 rounded-lg">Lecture 1: Introduction</li>
              <li className="p-3 bg-gray-800 rounded-lg">Lecture 2: Advanced Concepts</li>
              <li className="p-3 bg-gray-800 rounded-lg">Lecture 3: Practical Application</li>
              <li className="p-3 bg-gray-800 rounded-lg">Lecture 1: Introduction</li>
              <li className="p-3 bg-gray-800 rounded-lg">Lecture 2: Advanced Concepts</li>
              <li className="p-3 bg-gray-800 rounded-lg">Lecture 3: Practical Application</li>
            </ul>
          </div>
        </div>

        <div className="col-span-1">
          <div className="mb-6">
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg">
              <img className="w-full h-full rounded-md object-cover" src="https://images.unsplash.com/photo-1663869262274-b2c78ae61857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGN1dGUlMjBwYW5kYXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            </div>
          </div>
         
          <div className="mt-4 text-sm text-gray-400">
            <p><strong>Duration:</strong> 10 hours</p>
            <p><strong>Level:</strong> Beginner</p>
            <p><strong>Language:</strong> English</p>
          </div>
        </div>
      </div>

      <div className="">


        <h3 className="text-xl font-semibold mt-8 mb-4">Student Reviews</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg max-w-[50vh]">
            <p className="text-sm text-gray-400">"This course was fantastic!"</p>
            <div className="flex items-center mt-2 text-yellow-500">★★★★☆</div>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg max-w-[50vh]">
            <p className="text-sm text-gray-400">"Learned so much from this!"</p>
            <div className="flex items-center mt-2 text-yellow-500">★★★★★</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
