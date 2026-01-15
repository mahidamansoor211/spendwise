import UpdatePasswordForm from "../authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../authentication/UpdateUserDataForm";

function AccountSettings() {
  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Account Settings
        </h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl dark:bg-gray-950 dark:border-gray-800">
            <UpdateUserDataForm />
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl dark:bg-gray-950 dark:border-gray-800">
            <UpdatePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
