import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CircularProgressBar from './ProgressBar';
import { toast } from 'react-toastify';

const Task = () => {
    const [showInput, setShowInput] = useState(false);
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const inputRef = useRef(null);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (showInput) {
            inputRef.current?.focus();
        }
    }, [showInput]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("/api/tasks/get-tasks");
                if (response.status === 200) {
                    const fetchedTasks = response.data.data?.tasks || [];
                    setTasks(fetchedTasks);
                    updateProgress(fetchedTasks);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const updateProgress = (taskList) => {
        const completedTasks = taskList.filter(task => task.isCompleted).length;
        setPercentage(taskList.length > 0 ? (completedTasks * 100) / taskList.length : 0);
    };

    const handleAddTask = async () => {
        if (task.trim() !== '') {
            const newTask = { title: task, description, isCompleted: false };
            try {
                const response = await axios.post("/api/tasks", newTask);
                if (response.status === 200) {
                    setTasks(response.data.data?.tasks);
                    updateProgress(response.data.data?.tasks);
                    setTask('');
                    setDescription('');
                    setShowInput(false);
                }
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    const handleUpdateTask = async (index, completed = null) => {
        const updatedTask = { ...tasks[index] };
        if (completed !== null) {
            updatedTask.isCompleted = completed;
        } else {
            updatedTask.title = task;
            updatedTask.description = description;
        }
        try {
            const response = await axios.put(`/api/tasks/${tasks[index]._id}`, updatedTask);
            if (response.status === 200) {
                const updatedTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
                setTasks(updatedTasks);
                updateProgress(updatedTasks);
                if (completed === null) {
                    setIsEditing(false);
                    setCurrentTaskIndex(null);
                    setTask('');
                    setDescription('');
                    setShowInput(false);
                }
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (index) => {
        try {
            const response = await axios.delete(`/api/tasks/${tasks[index]._id}`);
            if (response.status === 200) {
                const updatedTasks = tasks.filter((_, i) => i !== index);
                setTasks(updatedTasks);
                updateProgress(updatedTasks);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="w-full max-h-[90vh] overflow-y-auto no-scrollbar p-6 sm:p-12 sm:px-44 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="font-semibold text-xl sm:text-2xl">
                    Today
                    {tasks.length > 0 && (
                        <p className="text-gray-400 mt-2 text-sm ml-1 font-normal">{tasks.length} Tasks</p>
                    )}
                </h1>
                {tasks.length > 0 && <CircularProgressBar percentage={percentage} />}
            </div>

            <div className="w-full py-2 mt-6">
                {tasks.map((t, index) => (
                    <div key={index} className="relative pb-6 pt-2 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between group">
                        <div className="flex items-center text-[1rem]">
                            <input
                                type="checkbox"
                                className="w-4 h-4 mr-3 rounded-full border border-gray-300 checked:border-green-800 checked:border-4 focus:outline-none transition cursor-pointer"
                                checked={t.isCompleted}
                                onChange={() => handleUpdateTask(index, !t.isCompleted)}
                            />
                            <div>
                                <span>{t.title.charAt(0).toUpperCase() + t.title.slice(1)}</span>
                                {t.description && <p className="text-gray-400 dark:text-gray-500 text-sm">{t.description}</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <AiOutlineEdit size={22} className="cursor-pointer" onClick={() => setIsEditing(true) || setCurrentTaskIndex(index) || setShowInput(true)} />
                            <AiOutlineDelete size={22} className="text-red-500 cursor-pointer" onClick={() => handleDeleteTask(index)} />
                        </div>
                    </div>
                ))}
            </div>

            {!showInput && !isEditing && (
                <div className="cursor-pointer group" onClick={() => setShowInput(true)}>
                    <h1 className="flex items-center gap-4 text-orange-300 hover:text-orange-500">
                        <AiOutlinePlus className="group-hover:bg-orange-100 text-orange-400 rounded-full w-5 h-5" />
                        Add task
                    </h1>
                </div>
            )}

            {showInput && (
                <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-300 dark:border-gray-700">
                    <input type="text" className="p-2 border outline-none bg-white dark:bg-gray-900 rounded-md" placeholder="Enter your task" value={task} onChange={(e) => setTask(e.target.value)} ref={inputRef} />
                    <textarea className="p-2 border outline-none bg-white dark:bg-gray-900 rounded-md" placeholder="Enter task description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div className="flex gap-2 justify-end">
                        <button onClick={() => setShowInput(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                        <button onClick={isEditing ? () => handleUpdateTask(currentTaskIndex) : handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded-md">{isEditing ? 'Update task' : 'Add task'}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
