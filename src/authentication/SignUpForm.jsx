import { useForm } from "react-hook-form";
import useSignUp from "./useSignUp";
import Button from "../components/Button";
import { TbCancel } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

function SignUpForm() {
  const { signup, isLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <div className="max-w-xl p-4 mx-auto mt-10 bg-white border-2 rounded-lg dark:bg-gray-300">
      <h1 className="mb-3 text-2xl font-semibold text-center">
        Create a new account to Log In
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="fullName">Full name:</label>
          <input
            type="text"
            id="fullName"
            disabled={isLoading}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            {...register("fullName", { required: "This field is required" })}
          />
          {errors?.fullName && (
            <p className="text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            id="email"
            disabled={isLoading}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          {errors?.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password">Password: (min 8 characters)</label>
          <input
            type="password"
            id="password"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            disabled={isLoading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          {errors?.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="passwordConfirm">Repeat password:</label>
          <input
            type="password"
            id="passwordConfirm"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
          {errors?.passwordConfirm && (
            <p className="text-red-600">{errors.passwordConfirm.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center gap-5">
          <Button type="reset" disabled={isLoading} onClick={reset}>
            Cancel <TbCancel />
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create new user <FaUser />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
