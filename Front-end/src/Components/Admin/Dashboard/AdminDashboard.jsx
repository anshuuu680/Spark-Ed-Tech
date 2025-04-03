import { selectUserData } from '@/Features/userDetails';
import { FiMapPin } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const { userData } = useSelector(selectUserData);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-dark-background p-2 px-4  pt-4">
      <h1 className='font-bold text-xl text-gray-100'>Admin Dashboard</h1>
      <div className="w-full min-h-screen flex py-8 overflow-y-auto">

        <div className="w-full h-full flex flex-col gap-4">

        <div
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGFkbWluJTIwZWR1Y2F0aW9uYWwlMjBkYXJrfGVufDB8fDB8fHww')`,
  }}
  className="w-full h-72 bg-dark-card bg-cover bg-center rounded-md flex items-center gap-24 px-10"
>

          

            <div className="w-52 h-52 rounded-full overflow-hidden">
              <img className='w-full h-full object-cover rounded-md' src={userData?.avatar} alt="" />
            </div>

            <div className='min-w-[50vh] min-h-[20vh] flex flex-col gap-2'>
              <h1 className='text-gray-100 font-bold text-3xl'>{userData?.fullName}</h1>
              <h1 className='text-gray-300 text-md font-semibold'>{userData?.email}</h1>
              <br />
              <h1 className='flex gap-2 items-center'> <FiMapPin color='#f8f8f8' size={20} /> <span className='text-gray-300 font-semibold'>{userData?.address || "NA"} </span> </h1>
            </div>


          </div>


          <div className="w-full h-44 flex justify-between gap-4">

            <div className="w-full h-full bg-dark-card shadow-lg rounded-xl flex flex-col justify-center items-center gap-1 text-gray-100">
              <div className="image w-16 h-16 rounded-full overflow-hidden">
                <div style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }} className="w-full h-full flex items-center justify-center">
                  <img className="w-2/3 h-2/3 object-cover" src="https://ik.imagekit.io/anshuuuu680/Spark/course_IrSDJ1_q0X.png?updatedAt=1706531365299" alt="" />
                </div>
              </div>
              <h1 className="font-extrabold text-3xl"> 04</h1>
              <h1 className="text-gray-300">Total Courses</h1>
            </div>
            <div className="w-full h-full bg-dark-card  shadow-lg rounded-xl flex flex-col justify-center items-center gap-1">
              <div className="image w-16 h-16 rounded-full overflow-hidden">
                <div style={{ backgroundColor: 'rgba(255, 235, 0, 0.2)' }} className="w-full h-full flex items-center justify-center">
                  <img className="w-2/3 h-2/3 object-cover" src="https://ik.imagekit.io/anshuuuu680/Spark/instructor_IQ3nw_PwN.png?updatedAt=1706531365267" alt="" />
                </div>
              </div>
              <h1 className="font-extrabold text-gray-100 text-3xl">2</h1>
              <h1 className="text-gray-300">Total Instructors</h1>
            </div>
            <div className="w-full h-full bg-dark-card  shadow-lg rounded-xl flex flex-col justify-center items-center gap-1">
              <div className="image w-16 h-16 rounded-full overflow-hidden">
                <div style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }} className="w-full h-full flex items-center justify-center">
                  <img className="w-2/3 h-2/3 object-cover" src="https://ik.imagekit.io/anshuuuu680/Spark/students_6tXdiptzD.png?updatedAt=1706531365180" alt="" />
                </div>
              </div>
              <h1 className="font-extrabold text-gray-100 text-3xl">170</h1>
              <h1 className="text-gray-300">Total users</h1>
            </div>
            <div className="w-full h-full bg-dark-card  shadow-lg rounded-xl flex flex-col justify-center items-center gap-1">
              <div className="image w-16 h-16 rounded-full overflow-hidden">
                <div style={{ backgroundColor: 'rgba(255, 235, 0, 0.2)' }} className="w-full h-full flex items-center justify-center">
                  <img className="w-2/3 h-2/3 object-cover" src="https://ik.imagekit.io/anshuuuu680/Spark/money-icon_BWNsRutSj.png?updatedAt=1706531365342" alt="" />
                </div>
              </div>
              <h1 className="font-extrabold text-gray-100 text-3xl"><span className="font-thin">&#x20B9;</span> 0.8k</h1>
              <h1 className="text-gray-300">Total Earning</h1>
            </div>


          </div>
          <div className="w-full h-60   overflow-hidden flex gap-4 ">
            <div className="w-1/3 h-full bg-dark-card rounded-md p-2 px-4">
              <h1 className='text-gray-100 font-semibold text-xl mb-2'>Recent Courses</h1>
              <div className='w-full h-full flex flex-col gap-2'>

                <div className='w-full h-1/4  bg-dark-inside-card flex items-center gap-4 p-2 rounded-md'>
                  <div className='w-10 h-10  rounded-full overflow-hidden'>
                    <img className='w-full h-full object-cover' src="" alt="" />
                  </div>
                  <div className='flex flex-col justify-center'>
                    <h1 className='font-semibold text-gray-200 text-lg'>Data science and intelligence</h1>
                    <h1 className='text-sm text-gray-200'> By {'John Doe'}</h1>
                  </div>


                </div>
                <div className='w-full h-1/4  bg-dark-inside-card flex items-center gap-4 p-2 rounded-md'>
                  <div className='w-10 h-10  rounded-full overflow-hidden'>
                    <img className='w-full h-full object-cover' src="" alt="" />
                  </div>
                  <div className='flex flex-col justify-center'>
                    <h1 className='font-semibold text-gray-200 text-lg'>Data science and intelligence</h1>
                    <h1 className='text-sm text-gray-200'> By {'John Doe'}</h1>
                  </div>


                </div>
                <div className='w-full h-1/4  bg-dark-inside-card flex items-center gap-4 p-2 rounded-md'>
                  <div className='w-10 h-10  rounded-full overflow-hidden'>
                    <img className='w-full h-full object-cover' src="" alt="" />
                  </div>
                  <div className='flex flex-col justify-center'>
                    <h1 className='font-semibold text-gray-200 text-lg'>Data science and intelligence</h1>
                    <h1 className='text-sm text-gray-200'> By {'John Doe'}</h1>
                  </div>


                </div>



              </div>
            </div>



            <div className="w-1/3 h-full bg-dark-card rounded-md p-2 px-4">
              <h1 className="text-gray-100 font-semibold text-xl mb-2">Instructor Request</h1>
              <div className="w-full h-[30vh]  overflow-y-auto no-scrollbar flex flex-col gap-2 pb-4">
                <div className="w-full h-7/11 bg-dark-inside-card flex items-center gap-4 p-2 rounded-md">
                  {/* Profile Image */}
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="" alt="Profile" />
                  </div>

                  {/* Instructor Details */}
                  <div className="w-full flex  items-center justify-around">
                    <h1 className="font-semibold text-gray-200 text-lg">Anshu Patidar</h1>
                    <button
                      className="mt-2 bg-gray-100 hover:bg-gray-200  font-medium px-4 py-1 rounded-md transition duration-200"
                      onClick={() => navigate("/admin/instructor-request")}
                    >
                      More Details
                    </button>
                  </div>
                </div>


              </div>
            </div>

          </div>

        </div>

      </div>




    </div>
  )
}
export default AdminDashboard;