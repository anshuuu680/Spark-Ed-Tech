import { Outlet } from "react-router-dom"
import ProfileHeader from "../Header/ProfileHeader"

const ProfileLayout = () => {
    return (
        <div className="h-screen w-full flex flex-col no-scrollbar fixed">
            <ProfileHeader />

           
                <div className="flex-1 overflow-y-auto no-scrollbar ">
                    <Outlet />
                </div>
        </div>
    )
}
export default ProfileLayout