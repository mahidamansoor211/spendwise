import useUser from "./useUser";
export default function UserAvatar() {
  const { user } = useUser();

  if (!user) return null;

  const { fullName, avatar } = user.user_metadata || {};

  return (
    <>
      <img
        className="w-10 h-10 rounded-full"
        src={avatar || "default-user.jpg"}
        alt={fullName ? `Avatar of ${fullName}` : "User avatar"}
      />
      <span className="dark:text-gray-100 text-gray-950">
        {fullName || "Anonymous"}
      </span>
    </>
  );
}
