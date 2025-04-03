import { Outlet } from "react-router-dom";
import IHeader from "./IHeader";
import INavbar from "./INavbar";

function ILyout() {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Sidebar/Navbar */}
      <INavbar />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Header */}
        <IHeader />

        {/* Scrollable Page Content */}
        <div className="flex-grow overflow-y-auto bg-dark-background">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ILyout;
