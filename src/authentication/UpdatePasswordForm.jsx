import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import Button from "../components/Button";
import { TbCancel } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white border-2 rounded-lg dark:bg-gray-300">
      <h2 className="mb-4 text-2xl font-semibold text-center">
        Update password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* New password */}
        <div className="flex flex-col">
          <label htmlFor="password">New password (min 8 chars)</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            disabled={isUpdating}
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

        {/* Confirm password */}
        <div className="flex flex-col">
          <label htmlFor="passwordConfirm">Confirm password</label>
          <input
            type="password"
            id="passwordConfirm"
            autoComplete="new-password"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
          {errors?.passwordConfirm && (
            <p className="text-red-600">{errors.passwordConfirm.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button type="reset" onClick={reset} disabled={isUpdating}>
            Cancel <TbCancel />
          </Button>
          <Button type="submit" disabled={isUpdating}>
            Update password <RiLockPasswordLine />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
