import { useEffect, useState } from "react";
import { getMyProfile } from "@/shared/api/users";

const storageKey = (loginId: string) => `sololaw:notice-agreed:${loginId}`;

function hasAgreed(loginId: string) {
  try {
    return localStorage.getItem(storageKey(loginId)) === "true";
  } catch {
    return false;
  }
}

/** Shows the pre-use notice once per account until the user agrees. */
export function useFirstVisitNotice() {
  const [loginId, setLoginId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getMyProfile()
      .then((profile) => {
        if (cancelled) return;
        setLoginId(profile.loginId);
        setIsOpen(!hasAgreed(profile.loginId));
      })
      .catch(() => {
        // without a profile we can't tell whether the user already agreed
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const agree = () => {
    if (loginId) {
      try {
        localStorage.setItem(storageKey(loginId), "true");
      } catch {
        // storage unavailable — the notice will show again next visit
      }
    }
    setIsOpen(false);
  };

  return { isOpen, agree };
}
