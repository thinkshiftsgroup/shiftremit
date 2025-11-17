import { Loader2, AlertCircle } from "lucide-react";
import SideNav from "../dashboard/sideNav";

const ProfileLoader = () => (
  <SideNav>
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4 text-center">
      <Loader2 size={40} className="text-main animate-spin" />
      <p className="font-poppins text-lg text-gray-700">
        Loading your profile...
      </p>
      <p className="text-sm text-gray-500">This might take a few seconds.</p>
    </div>
  </SideNav>
);

const ProfileError = () => (
  <SideNav>
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4 text-center">
      <AlertCircle size={40} className="text-red-500" />
      <p className="font-poppins text-lg text-red-600">
        Failed to load user profile.
      </p>
      <p className="text-sm text-gray-500">
        Please check your connection or try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-3 px-4 py-2 bg-main text-white rounded-md font-poppins hover:bg-main-dark transition-colors"
      >
        Retry
      </button>
    </div>
  </SideNav>
);

export { ProfileLoader, ProfileError };
