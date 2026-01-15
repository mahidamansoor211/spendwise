import { useState, useEffect } from "react";
import useUser from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import Button from "../components/Button";
import { TbCancel } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";

function UpdateUserDataForm() {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  // Local state (start empty, fill once user is loaded)
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);

  // When user data loads, update local state
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.fullName || "");
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(user?.user_metadata?.fullName || "");
    setAvatar(null);
  }

  if (isLoading) return <p>Loading...</p>; // ✅ Show a loader until user is available

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white border-2 rounded-lg dark:bg-gray-300">
      <h2 className="mb-4 text-2xl font-semibold text-center">
        Update Your Account
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email (read-only) */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email address:
          </label>
          <input
            type="email"
            id="email"
            value={user?.email || ""}
            disabled
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          />
        </div>

        {/* Full name */}
        <div className="flex flex-col">
          <label htmlFor="fullName" className="mb-1 font-medium">
            Full name:
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isUpdating}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Avatar */}
        <div className="flex flex-col">
          <label htmlFor="avatar" className="mb-1 font-medium">
            Avatar image:
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center gap-5">
          <Button type="reset" disabled={isUpdating} onClick={handleCancel}>
            Cancel <TbCancel />
          </Button>
          <Button type="submit" disabled={isUpdating}>
            Update account <FaRegEdit />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserDataForm;
