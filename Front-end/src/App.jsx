import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import SecuredRoutes from './SecuredRoutes.jsx';
import AdminRoutes from './AdminRoutes.jsx';
import InstructorRoutes from './InstructorRoutes.jsx';
import {
  Dashboard, Task, Feed, Login, SignUp, HomePage, AdminCourses,
  AdminDashboard, AdminNotification, AdminTransactions, FeedPage, Chat, 
  ForgotPassword, Layout, ProfileLayout, UserPageLayout, UserPosts, UserQuestions,
  DynamicChat, AdminLayout, CourseDetails, PasswordChanged, VerifyOtp, MyProfile,
  Courses, CourseDetail
} from './index.js';
import HomeLayout from './components/layout/HomeLayout';
import ILyout from './components/Instructor/ILyout';
import IDashboard from './components/Instructor/IDashboard';
import ICourses from './components/Instructor/ICourses';
import ICreate from './components/Instructor/ICreate';
import IPayment from './components/Instructor/IPayment';
import ISection from './components/Instructor/ISection';
import ISignUp from './components/Instructor/ISignUp';
import IVerify from './components/Instructor/IVerify';
import ILogin from './components/Instructor/ILogin';
import ICDetails from './components/Instructor/ICDetails';
import MyClassroom from './components/Pages/Course/MyClassroom';
import MyCourses from './components/Pages/Course/MyCourses';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
        </Route>
        <Route path="/instructor/signup" element={<ISignUp />} />
        <Route path="/instructor/login" element={<ILogin />} />
        <Route path="/instructor/verify-otp" element={<IVerify />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/password/reset' element={<ForgotPassword />} />
        <Route path="/password-changed" element={<PasswordChanged />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />


        <Route element={<InstructorRoutes />}>
        <Route path="/instructor" element={<ILyout />}>
          <Route path="dashboard" element={<IDashboard />} />
          <Route path="courses" element={<ICourses />} />
          <Route path="courses/:id" element={<ICDetails />} />
          <Route path="create-course" element={<ICreate />} />
          <Route path="create-course/:id" element={<ISection />} />
          <Route path="payments" element={<IPayment />} />
        </Route>
      </Route>

        <Route element={<AdminRoutes />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="courses/:id" element={<CourseDetails />} />
            <Route path="notifications" element={<AdminNotification />} />
            <Route path="transactions" element={<AdminTransactions />} />
          </Route>
        </Route>

        
        <Route element={<SecuredRoutes />}>
          <Route path="/users" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<Task />} />
        <Route path="my-courses" element={<MyCourses/>}/>
        <Route path="my-courses/:id" element={<MyClassroom/>}/>
        <Route path="feed" element={<Feed />} />
        <Route path="feed/:postId" element={<FeedPage />} />
        <Route path="chat" element={<Chat />}>
          <Route path=":id" element={<DynamicChat />} />
        </Route>
        <Route path=":username" element={<UserPageLayout />}>
          <Route path="posts" element={<UserPosts />} />
          <Route path="questions" element={<UserQuestions />} />
        </Route>
      </Route>
      <Route path="/my-account" element={<ProfileLayout />}>
        <Route path="my-profile" element={<MyProfile />} />
      </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;