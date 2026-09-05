import { useEffect, useState } from "react";
import AlertIcon from "@/assets/icons/shared/alert-bell-icon.svg?react";
import { getMyProfile, type UserProfile } from "@/shared/api/users";

export default function Header() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getMyProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-900">
          <AlertIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[18px] font-semibold text-blue-500">
            {profile?.name.charAt(0) ?? ""}
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900">
              {profile?.name ?? ""}
            </span>
            <span className="text-xs text-gray-500">
              {profile?.email ?? ""}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
