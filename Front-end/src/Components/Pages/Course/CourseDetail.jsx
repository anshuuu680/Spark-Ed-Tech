import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar, FaUsers, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Video } from "lucide-react";



const CourseDetail = () => {
  const { id } = useParams();
  const [openSection, setOpenSection] = useState(null);
  const [data,setData] = useState();

  const loadScript = (src)=>{
    return new Promise((resolve)=>{
      const script = document.createElement('script');
      script.src = src;
      script.onload = ()=>{
        resolve(true);
      }
      script.onerror = ()=>{
        resolve(false);
      }

      document.body.appendChild(script);
    })
  }

  const onPayment = async ()=>{
   try {
     const response = await axios.post("https://spark-ed-tech.onrender.com/api/payment/create-order", { id })

     const paymentObject = new Razorpay({
      key: 'rzp_test_drUfjelNqCIKZ6',
      order_id: response.data.data?.id,
      ...response.data.data,
      handler: async (res) => {
    
        // Extracting options from the correct response structure
        const options = {
          order_id: res.razorpay_order_id,  // Correcting from response.data to res
          payment_id: res.razorpay_payment_id,
          signature: res.razorpay_signature,
          course_id: id, // Ensure id is properly declared in your code
        };
    
        try {
          // Using async/await for better error handling
          const respon = await axios.post("https://spark-ed-tech.onrender.com/api/payment/verify-payment", options);
          if (respon.status === 200) {
            alert('Payment successful');
          } else {
            alert('Payment verification failed');
          }
        } catch (error) {
          alert('An error occurred while verifying payment');
        }
      }
    });
    
      paymentObject.open();



   } catch (error) {
    console.log(error);
   }
  }

  useEffect(() => {
   
    loadScript('https://checkout.razorpay.com/v1/checkout.js');


  }, [])
  

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  useEffect(() => {
    const fetch = async ()=>{
      const response = await axios.get(`https://spark-ed-tech.onrender.com/api/course/${id}`);
      if(response.status==200)
      setData(response.data.data)
    }
    fetch();
  }, [])
  

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-6 text-white bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <img
          src={data?.thumbnail}
          alt={data?.title}
          className="w-full h-48 sm:h-64 object-cover"
        />
        <div className="p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{data?.title}</h2>
          <p className="mt-1 sm:mt-2 text-gray-400">
           <span className="font-medium">{data?.instructorDetails?.name}</span>
          </p>

          {/* Price, Rating & Users */}
          <div className="flex flex-wrap items-center mt-3 sm:space-x-6 space-x-3 text-sm sm:text-base">
            <span className="font-bold text-teal-400">₹ {data?.price}</span>
            <span className="text-yellow-400 flex items-center">
              <FaStar className="mr-1" /> {data?.rating}
            </span>
            <span className="flex items-center text-gray-300">
              <FaUsers className="mr-1" /> {data?.enrolledUsers} students
            </span>
          </div>

          <p className="mt-3 text-gray-300">{data?.description}</p>
          <button onClick={onPayment} className="w-full mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Enroll Now
          </button>

          {/* Learning Outcomes */}
          <div className="mt-6">
            <h3 className="text-xl sm:text-2xl font-semibold">What You Will Learn</h3>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-300">
              {data?.learnings.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>

          {/* Curriculum Section */}
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-semibold">Course Curriculum</h3>
            <ul className="mt-4 space-y-3">
              {data?.sections?.map((item, index) => (
                <li key={index} className="p-3 bg-gray-700 rounded-md">
                  <button
                    className="w-full flex justify-between items-center text-left text-white font-medium"
                    onClick={() => toggleSection(index)}
                  >
                    <span>Section {index+1}: {item?.title}</span>
                    {openSection === index ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {openSection === index && (
                    <ul className="mt-2 space-y-2 text-gray-300">
                      {item?.section?.map((lecture, i) => (
                        <li key={i} className="p-2 bg-gray-600 rounded-md">
                          <h1 href={lecture.videoUrl} className="text-blue-200  flex gap-2">
                          <Video size={24} /> {lecture.title}
                          </h1>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-semibold">Prerequisites</h3>
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-300">
              {data?.prerequisites.map((prerequisite, index) => (
                <li key={index}>{prerequisite}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
