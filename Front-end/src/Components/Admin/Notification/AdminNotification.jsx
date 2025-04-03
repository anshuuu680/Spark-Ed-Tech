import React from "react";
import { Bell, CheckCircle, AlertTriangle, UserPlus } from "lucide-react";

const AdminNotification = () => {

  const notifications = [
    {
      title: "New Course Uploaded",
      message: "An instructor has uploaded a new course.",
      time: "2 hours ago",
      icon: CheckCircle,
    },
    {
      title: "Course Approval Pending",
      message: "A course is pending your approval.",
      time: "1 hour ago",
      icon: AlertTriangle,
    },
    {
      title: "Instructor Signup Request",
      message: "A new instructor, Jane Smith, has requested to join the platform.",
      time: "30 minutes ago",
      icon: UserPlus,
    },
  ];

  return (
    <div className="w-full h-full p-4">
      <div className="text-xl text-gray-100 font-bold flex gap-2 items-center group">
        <h1>Admin Notifications</h1>
        <Bell className="w-6 h-6 transform transition duration-200 ease-in-out group-hover:rotate-[25deg]" />
      </div>

      <div className="w-full flex flex-col items-center py-4">

        <div className="w-2/3 bg-dark-card shadow-xl rounded-xl overflow-hidden mt-4">

          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-blue-500 dark:text-blue-400">
                        <notification.icon className="w-6 h-6 mr-3" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 dark:text-gray-100 font-semibold">
                          {notification.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500 dark:text-gray-400">
                No new notifications
              </li>
            )}
          </ul>
        </div>

      </div>
    </div>

  );
};

export default AdminNotification;
