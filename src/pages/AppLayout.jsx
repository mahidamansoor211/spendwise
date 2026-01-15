import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Layout */}
      <div className="flex flex-col min-h-[calc(100vh-64px)] md:flex-row">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <main className="flex-1 px-4 py-4 pb-24 overflow-y-auto md:px-8 md:pb-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
