import UserAvatar from "../authentication/UserAvatar";
import useUser from "../authentication/useUser";
import DarkMode from "./DarkMode";
import { useLocation } from "react-router-dom";

export default function Header({ children }) {
  const { isAuthenticated } = useUser();
  const location = useLocation();

  // Hide avatar on onboarding
  const hideAvatarOn = ["/", "/GetStarted"];
  const showAvatar =
    isAuthenticated && !hideAvatarOn.includes(location.pathname);

  return (
    <header className="flex items-center justify-between px-3 py-2 bg-gray-300 border-b sm:px-6 sm:py-3 dark:bg-gray-950 border-gray-400/40 dark:border-gray-800 shrink-0">
      {/* Left Section: Logo + Title */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Smaller logo container on mobile */}
        <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-lg shadow-sm sm:w-12 sm:h-12 sm:rounded-xl dark:bg-gray-900">
          <img
            src="./logo.png"
            alt="SpendWise Logo"
            className="object-contain w-6 h-6 sm:w-9 sm:h-9"
          />
        </div>
        {/* Smaller font and tighter tracking for small screens */}
        <h2 className="text-lg font-black tracking-tight text-gray-900 sm:text-2xl sm:font-extrabold sm:tracking-wide dark:text-gray-100">
          SpendWise
        </h2>
      </div>

      {/* Right Section: Avatar + DarkMode + Extra children */}
      <div className="flex items-center gap-2 sm:gap-5">
        {/* Ensure UserAvatar internal components use small sizes. 
          Wrapping it in a div to control mobile scale if needed.
        */}
        {showAvatar && (
          <div className="scale-90 sm:scale-100">
            <UserAvatar />
          </div>
        )}

        <div className="flex items-center">
          <DarkMode />
        </div>

        {children && <div className="flex items-center">{children}</div>}
      </div>
    </header>
  );
}
