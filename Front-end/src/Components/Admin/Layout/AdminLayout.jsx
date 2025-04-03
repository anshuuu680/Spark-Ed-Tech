import { AdminNavbar } from "@/index"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="w-full flex h-screen bg-dark-background">
        <AdminNavbar/>
     <div className="flex flex-grow max-h-[100vh] overflow-y-auto no-scrollbar">
          <Outlet/>
     </div>
    </div>
  )
}
export default AdminLayout