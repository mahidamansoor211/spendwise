import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md text-center">
        <h1 className="font-extrabold text-blue-600 text-7xl">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Sorry, the page you’re looking for doesn’t exist or was moved.
        </p>

        <Link
          to="/Dashboard"
          className="inline-block px-6 py-2 mt-6 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          ⬅ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
