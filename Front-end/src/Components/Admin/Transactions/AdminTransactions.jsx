import React from "react";
import { Table, Pagination } from "antd"; // Ant Design for UI components
import { CheckCircleIcon, XCircleIcon } from "lucide-react"; // For icons
import "../admin.css"
const transactionsData = [
  {
    key: '1',
    course: "React for Beginners",
    instructor: "John Doe",
    buyer: "Jane Smith",
    date: "2024-09-01",
    amount: "$49.99",
    status: "Completed",
  },
  {
    key: '2',
    course: "Advanced JavaScript",
    instructor: "Alice Johnson",
    buyer: "Mike Brown",
    date: "2024-09-02",
    amount: "$69.99",
    status: "Completed",
  },
  {
    key: '3',
    course: "CSS Mastery",
    instructor: "Emily Davis",
    buyer: "Sarah Connor",
    date: "2024-09-03",
    amount: "$39.99",
    status: "Pending",
  },
  {
    key: '4',
    course: "Full-Stack Development",
    instructor: "Michael Scott",
    buyer: "Dwight Schrute",
    date: "2024-09-04",
    amount: "$149.99",
    status: "Completed",
  },
  {
    key: '5',
    course: "Python for Data Science",
    instructor: "Sarah Lee",
    buyer: "Tom Hanks",
    date: "2024-09-05",
    amount: "$59.99",
    status: "Completed",
  },
  {
    key: '6',
    course: "UI/UX Design",
    instructor: "Rachel Green",
    buyer: "Monica Geller",
    date: "2024-09-06",
    amount: "$79.99",
    status: "Refunded",
  },
  {
    key: '7',
    course: "Machine Learning A-Z",
    instructor: "David Beckham",
    buyer: "Lionel Messi",
    date: "2024-09-07",
    amount: "$199.99",
    status: "Completed",
  },
  {
    key: '8',
    course: "Node.js Essentials",
    instructor: "James Bond",
    buyer: "Ethan Hunt",
    date: "2024-09-08",
    amount: "$89.99",
    status: "Pending",
  },
  {
    key: '9',
    course: "DevOps Fundamentals",
    instructor: "Sherlock Holmes",
    buyer: "John Watson",
    date: "2024-09-09",
    amount: "$109.99",
    status: "Completed",
  },
  {
    key: '10',
    course: "React Native in Action",
    instructor: "Tony Stark",
    buyer: "Steve Rogers",
    date: "2024-09-10",
    amount: "$129.99",
    status: "Completed",
  },
  {
    key: '11',
    course: "React Native in Action",
    instructor: "Tony Stark",
    buyer: "Steve Rogers",
    date: "2024-09-10",
    amount: "$129.99",
    status: "Completed",
  },
  {
    key: '12',
    course: "React Native in Action",
    instructor: "Tony Stark",
    buyer: "Steve Rogers",
    date: "2024-09-10",
    amount: "$129.99",
    status: "Completed",
  },
];

const Transactions = () => {
  const columns = [
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <span className="flex items-center">
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`flex items-center  ${status === "Completed"
            ? "text-green-500"
            : "text-red-500"
            }`}
        >
          {status === "Completed" ? (
            <CheckCircleIcon className="w-5 h-5 mr-1" />
          ) : (
            <XCircleIcon className="w-5 h-5 mr-1" />
          )}
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full p-6  rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-100">Transactions</h2>
        <Table
          columns={columns}
          dataSource={transactionsData}
          pagination={{ pageSize: 8 }}
          className="" 
        />
    </div>
  );
};

export default Transactions;
