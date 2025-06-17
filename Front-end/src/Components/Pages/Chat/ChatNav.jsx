import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/Components/ui/dialog";
import { Delete } from "lucide-react";

const ChatNav = ({ user }) => {
    return (
        <nav className="w-full h-16 rounded-md flex items-center px-4 text-gray-900 dark:text-gray-100 bg-white dark:bg-dark-card sm:px-6 md:px-8 lg:px-4">
            <div className="flex gap-4 w-full items-center justify-between">
                <div className="flex gap-4 items-center">
                    <div className="profile w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer">
                        <img className="h-full w-full rounded-full" src={user?.avatar} alt="Profile" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-sm sm:text-lg">{user?.fullName}</h1>
                        <h1 className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">@{user?.username}</h1>
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition">
                            <Delete className="mr-2 h-4 w-4 sm:h-4 sm:w-4" />
                            <span className="text-sm sm:text-lg">Delete</span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-dark-background text-gray-900 dark:text-gray-100 p-4 sm:p-6 rounded-lg shadow-lg border-gray-300 dark:border-gray-500">
                        <DialogHeader>
                            <DialogTitle className="text-lg sm:text-xl font-semibold">Are you absolutely sure?</DialogTitle>
                            <DialogDescription className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                This action cannot be undone. This will permanently delete your messages
                                and remove your chat with <span className="font-bold text-gray-900 dark:text-gray-100">{user?.username}</span>.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 flex justify-end">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded mr-2">
                                Delete
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </nav>
    );
};

export default ChatNav;
