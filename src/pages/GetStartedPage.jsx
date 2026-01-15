import Header from "../components/Header";
import LoginForm from "../authentication/LoginForm";
import SignUpForm from "../authentication/SignUpForm";
import { useState } from "react";
import Button from "../components/Button";
import { FaArrowLeft } from "react-icons/fa";

function GetStartedPage() {
  const [createAcc, setCreateAcc] = useState(true);

  return (
    <div className="min-h-screen dark:bg-gray-950">
      <Header />

      <div className="flex justify-center px-4 mt-6">
        <div className="w-full max-w-md">
          {createAcc ? <LoginForm /> : <SignUpForm />}

          <div className="flex flex-col items-center gap-3 mt-6">
            {createAcc && (
              <h1 className="text-xl text-center dark:text-white">
                Don’t have an account?
              </h1>
            )}

            <Button
              className="w-full px-10 sm:w-auto"
              onClick={() => setCreateAcc(!createAcc)}
            >
              {createAcc ? (
                "Create a new one!"
              ) : (
                <>
                  <FaArrowLeft />
                  <span>Log In</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStartedPage;
