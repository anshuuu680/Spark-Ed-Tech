import { NavLink, Outlet } from "react-router-dom"
import  UserPage from "@/Components/Pages/Feed/UserPage.jsx"

const UserPageLayout = () => {
    return (
        <div className="w-full h-full p-4 flex flex-col gap-2">
            <div className="flex w-full h-[90vh] gap-8">
                <div className="w-2/3 h-full max-h-[90vh] p-4">
                    <nav className="w-fit min-h-fit dark:text-gray-100 text-lg font-semibold flex justify-center space-x-4 gap-8">
                        <NavLink
                            to="posts"
                            className={({ isActive }) =>
                                isActive ? "border-b-2 border-blue-500" : "border-none"
                            }
                        >
                            Posts
                        </NavLink>
                        <NavLink
                            to="questions"
                            className={({ isActive }) =>
                                isActive ? "border-b-2 border-blue-500" : "border-none"
                            }
                        >
                            Questions
                        </NavLink>
                    </nav>

                    <div className="w-full h-[80vh] pt-4 overflow-y-auto no-scrollbar"> {/* Added height and scroll */}
                        <Outlet/>
                    </div>
                </div>

                <div className="w-[40vh]">

                  <UserPage/>

                </div>
            </div>

        </div>
    )
}
export default UserPageLayout