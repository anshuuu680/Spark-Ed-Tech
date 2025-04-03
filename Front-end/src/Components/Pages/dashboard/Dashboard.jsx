import { Calendar } from "@/Components/ui/calendar";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import ChartPie from "./ChartPie";
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";
import axios from "axios";
import CircularProgressBar from "./ProgressBar";
import { toast } from "react-toastify";
import { Button } from "@/Components/ui/button";
import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const { userData } = useSelector(selectUserData);
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState([]);
  const [percentage, setPercentage] = useState(50);
  const navigate = useNavigate();

  const formatDay = (date) => {
    return new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
  };

  const formatDateMonthYear = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const currentDate = new Date();
  const day = formatDay(currentDate);
  const dateMonthYear = formatDateMonthYear(currentDate);


  const toggleTaskCompletion = async (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, isCompleted: !t.isCompleted } : t
    );
    try {
      const response = await axios.put(`/api/tasks/${tasks[index]._id}`, updatedTasks[index]);
      if (response.status === 200) {
        if (updatedTasks[index]?.isCompleted === true)
          toast.success('Task completed successfully!')
        setTasks(updatedTasks);
        const p = updatedTasks.filter(task => task.isCompleted);
        setPercentage((p.length * 100) / updatedTasks.length)
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks/get-tasks");
        if (response.status === 200) {
          const task = response.data.data.tasks;
          const p = task?.filter(task => task.isCompleted);
          setPercentage((p?.length * 100) / task?.length)

          setTasks(task || []);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchCourses = async () => {
      const response = await axios.get("/api/course/my-courses");
      setData(response.data.data);
    }
    fetchTasks();
    fetchCourses();


  }, []);


  return (
    <div className="w-full  lg:p-4 p-2 bg-light-background dark:bg-dark-background">
      <div className="flex h-full flex-col lg:flex-row">
        <div className="w-full lg:w-[75%] h-[85vh] pr-0 lg:pr-3 border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border overflow-y-auto no-scrollbar">
          <div className="w-full sticky top-0 bg-light-background bg-zinc-50 dark:bg-dark-background z-10 pb-3 border-b border-light-border dark:border-dark-border">
            <div className="flex justify-between pr-4">
              <div>
                <h1 className="text-gray-700 dark:text-gray-200 font-semibold text-sm">Welcome Back!</h1>
                <h1 className="text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-semibold capitalize">{userData?.fullName}</h1>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{day}</h1>
                <h1 className="text-gray-500 dark:text-gray-300 font-semibold text-sm">{dateMonthYear}</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2 py-4">
            <Chart />
            <div className="w-full lg:w-1/2 h-fit md:h-[26w] lg:h-[26w] border border-light-border dark:border-dark-border rounded-lg">
              <ChartPie />
            </div>
          </div>

          <div className="w-full  h-fit flex-1 flex flex-col lg:flex-row gap-2">
            <div className="w-full lg:hidden min-h-[20vh] border border-light-card dark:border-dark-border p-2 px-4 rounded-lg shadow-md bg-light-card ">
              <div className="flex  justify-between items-center pb-2">
                <h1 className="text-gray-700 dark:text-gray-200 font-semibold text-xl mb-4">Your Tasks</h1>
                {tasks?.length > 0 && <CircularProgressBar percentage={percentage} />}
              </div>
              <div className=" lg:space-y-2 -space-y-2 pl-2 text-gray-600 dark:text-gray-300 max-h-[28vh] overflow-y-auto no-scrollbar">
                {tasks?.length > 0 ? (
                  tasks.map((task, index) => (
                    <div key={task?._id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="appearance-none w-4 h-4 mr-3 rounded-full border border-gray-400 dark:border-gray-300 checked:accent-white checked:border-green-600 dark:checked:border-green-800 checked:border-4 focus:outline-none transition duration-200 cursor-pointer"
                        checked={task?.isCompleted}
                        onChange={() => toggleTaskCompletion(index)}
                      />
                      <h1 className="bg-light-background dark:bg-dark-background min-w-[85%] hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-md transition-all duration-300 font-semibold">
                        {task?.title}
                      </h1>
                    </div>
                  ))
                ) : (
                  <div className="w-full h-fit flex gap-2 flex-col items-center pb-6">
                    <h1 className="text-gray-500 dark:text-gray-500">No tasks for today.</h1>
                    <Button><NavLink to="/users/tasks">Add here</NavLink></Button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/3 border h-fit border-light-border dark:border-dark-border rounded-md p-3">
              <h1 className="font-semibold text-gray-800 dark:text-gray-100 text-xl">Your Instructors</h1>
              <div className="w-full min-h-fit py-2">
                {data?.map((obj, index) => (
                  <div
                    key={index}
                    className="w-full h-fit flex gap-4 items-center font-semibold text-gray-700 dark:text-gray-200 bg-light-background dark:bg-dark-background hover:bg-light-card dark:hover:bg-dark-card p-2 rounded-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full border bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <img
                        src={obj?.course.instructor?.avatar || "/default-avatar.png"}
                        alt={obj?.course.instructor?.name}
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-full flex flex-col justify-center">
                      <h1 className="text-lg">{obj?.course.instructor?.name}</h1>
                      <h1 className="text-sm text-gray-500 dark:text-gray-400">{obj?.course?.title}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses Card */}
            <div className="w-full lg:w-2/3 rounded-md border border-light-border dark:border-dark-border h-full p-3">
              <h1 className="font-semibold text-gray-800 dark:text-gray-100 text-xl">Your Courses</h1>
              <div className="w-full min-h-fit py-2 space-y-4">
                {data?.map((obj, index) => (
                  <div
                    onClick={() => navigate(`/users/my-courses/${obj?.course?._id}`)} // Fix: Wrapped in arrow function
                    key={index}
                    className="w-full h-fit border border-gray-400 dark:border-gray-600 p-4 rounded-lg bg-light-card dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-black transition-all duration-300 flex  gap-6 md:justify-start items-center cursor-pointer"
                  >
                    <GraduationCap size={60} />
                    <div>
                      <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                        {obj?.course?.title}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {obj?.course?.description}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[25%] h-44  hidden lg:flex flex-col items-center gap-4 px-3">

          <div className="w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card border-opacity-50 text-gray-800 dark:text-gray-100 px-8"
            />
          </div>


          <div className="w-full min-h-fit border border-light-card dark:border-dark-card p-2 px-4 rounded-lg shadow-md bg-light-card dark:bg-dark-card">
            <div className="flex justify-between items-center pb-2">
              <h1 className="text-gray-700 dark:text-gray-200 font-semibold text-xl mb-4">Your Tasks</h1>
              {tasks?.length > 0 && <CircularProgressBar percentage={percentage} />}
            </div>
            <div className="space-y-2 pl-2  text-gray-600 dark:text-gray-300 max-h-[28vh] overflow-y-auto no-scrollbar">
              {tasks?.length > 0 ? (
                tasks.map((task, index) => (
                  <div key={task?._id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="appearance-none w-4 h-4 mr-3 rounded-full border border-gray-400 dark:border-gray-300 checked:accent-white checked:border-green-600 dark:checked:border-green-800 checked:border-4 focus:outline-none transition duration-200 cursor-pointer"
                      checked={task?.isCompleted}
                      onChange={() => toggleTaskCompletion(index)}
                    />
                    <h1 className="bg-light-background dark:bg-dark-background min-w-[85%] hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-md transition-all duration-300">
                      {task?.title}
                    </h1>
                  </div>
                ))
              ) : (
                <div className="w-full h-fit flex gap-2 flex-col items-center pb-6">
                  <h1 className="text-gray-500 dark:text-gray-500">No tasks for today.</h1>
                  <Button><NavLink to="/users/tasks">Add here</NavLink></Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Dashboard;
