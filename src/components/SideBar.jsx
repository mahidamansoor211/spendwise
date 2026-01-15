import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { AiOutlineSetting } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import Logout from "../authentication/Logout";

function SideBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  const linkClass = (path) => {
    const base =
      "flex flex-col items-center justify-center w-full h-full rounded-md " +
      "md:flex-row md:justify-start md:gap-3 md:px-4 md:py-3 md:rounded-lg " +
      "transition-all duration-200";

    const active =
      " text-blue-600 bg-blue-50 dark:bg-gray-800 dark:text-blue-400";

    const inactive =
      " text-gray-500 hover:text-blue-600 hover:bg-blue-50 " +
      "dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800";

    return base + (isActive(path) ? active : inactive);
  };

  return (
    <aside className="fixed bottom-0 left-0 z-50 w-full bg-white border-t shadow-sm h-14 md:static md:h-auto md:w-60 md:border-t-0 md:border-r md:shadow-none dark:bg-gray-950 dark:border-gray-800">
      <nav className="flex h-full md:flex-col md:p-4">
        <div className="flex items-center justify-around w-full h-full md:flex-col md:items-stretch md:gap-1">
          {/* Links */}
          <Link to="Dashboard" className={linkClass("Dashboard")}>
            <LuLayoutDashboard className="text-lg md:text-xl" />
            <span className="hidden text-sm font-medium md:inline">
              Dashboard
            </span>
          </Link>

          <Link to="Income" className={linkClass("Income")}>
            <FaMoneyBillWave className="text-lg md:text-xl" />
            <span className="hidden text-sm font-medium md:inline">Income</span>
          </Link>

          <Link to="Budget" className={linkClass("Budget")}>
            <FaPiggyBank className="text-lg md:text-xl" />
            <span className="hidden text-sm font-medium md:inline">Budget</span>
          </Link>

          <Link to="Expense" className={linkClass("Expense")}>
            <FaArrowRightArrowLeft className="text-lg md:text-xl" />
            <span className="hidden text-sm font-medium md:inline">
              Expense
            </span>
          </Link>

          <Link to="AccountSettings" className={linkClass("AccountSettings")}>
            <AiOutlineSetting className="text-lg md:text-xl" />
            <span className="hidden text-sm font-medium md:inline">
              Settings
            </span>
          </Link>

          {/* Mobile Logout (icon only, sticks at bottom) */}
          <div className="flex items-center justify-center w-full mt-auto text-red-500 h-14 md:hidden">
            <Logout>
              <IoLogOutOutline className="text-lg md:text-xl" />
            </Logout>
          </div>

          {/* Desktop-only Logout */}
          <div className="items-center hidden gap-3 px-4 py-3 mt-auto text-red-500 border-t md:flex dark:border-gray-800">
            <IoLogOutOutline className="text-xl" />
            <Logout />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default SideBar;
