import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const PasswordChanged = () => {
  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-96 h-60 border border-gray-300 dark:border-gray-600 rounded-lg flex flex-col text-center text-xl text-gray-900 dark:text-white font-semibold items-center justify-center p-6 gap-10">
            <h1 className="dark:text-gray-100">Your Password has been changed successfully.</h1>
            <Button className="p-5 px-12 text-lg bg-blue-500 text-white dark:bg-blue-600">
              <NavLink to="/login">Login</NavLink>
            </Button>
        </div>
    </div>
  );
};

export default PasswordChanged;
