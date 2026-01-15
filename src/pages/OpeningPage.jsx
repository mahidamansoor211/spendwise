import GetStartedBtn from "../components/GetStartedBtn";
import Header from "../components/Header";
import StartJourneyBtn from "../components/StartJourneyBtn";
import SpotlightCard from "../components/SpotLightCard";
import { FaChartBar } from "react-icons/fa";
import { GiTakeMyMoney, GiWallet } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";

function OpeningPage() {
  return (
    <div className="min-h-screen text-black bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-950 dark:to-gray-900">
      <Header>
        <GetStartedBtn />
      </Header>

      {/* Hero Section */}
      <div className="flex flex-col-reverse items-center justify-between gap-10 px-4 py-16 mx-auto md:flex-row sm:px-8 md:py-20 max-w-7xl">
        {/* Left side - Hero */}
        <div className="w-full max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-extrabold leading-tight text-transparent sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text drop-shadow-md">
            Master Your Money. <br /> Unlock Your Future.
          </h1>

          <p className="text-base leading-relaxed text-gray-700 sm:text-lg dark:text-gray-300">
            Track your income, set smart budgets, monitor expenses with progress
            bars, and grow your savings. All in one simple, powerful web app
            designed to put you back in control.
          </p>

          <div className="flex justify-center md:justify-start">
            <StartJourneyBtn />
          </div>
        </div>

        {/* Right side - Features Grid */}
        <div className="flex flex-col items-center w-full max-w-lg md:items-start">
          <div className="flex flex-col items-center px-4 mb-8 text-center md:items-start sm:px-6 md:mb-10 md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              Start tracking today.
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
              All-in-one money management tools.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 px-2 sm:grid-cols-2 sm:gap-6 sm:px-0">
            {/* Feature Cards */}
            <SpotlightCard className="hover:scale-[1.03] hover:shadow-2xl transition-all">
              <div className="flex flex-col items-center space-y-2 text-center sm:space-y-3">
                <div className="p-4 text-3xl text-white rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                  <GiWallet />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                  Track Income
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  Monitor your growth and stay in control.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="hover:scale-[1.03] hover:shadow-2xl transition-all">
              <div className="flex flex-col items-center space-y-2 text-center sm:space-y-3">
                <div className="p-4 text-3xl text-white rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500">
                  <TbMoneybag />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                  Smart Budgets
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  Set budgets and track progress instantly.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="hover:scale-[1.03] hover:shadow-2xl transition-all">
              <div className="flex flex-col items-center space-y-2 text-center sm:space-y-3">
                <div className="p-4 text-3xl text-white rounded-full shadow-lg bg-gradient-to-r from-red-500 to-pink-500">
                  <GiTakeMyMoney />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                  Control Expenses
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  Get clear insights into your spending.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="hover:scale-[1.03] hover:shadow-2xl transition-all">
              <div className="flex flex-col items-center space-y-2 text-center sm:space-y-3">
                <div className="p-4 text-3xl text-white rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-fuchsia-500">
                  <FaChartBar />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                  Dashboard
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  Track your spending patterns and monitor goals.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpeningPage;
