import { useEffect, useState } from "react";
import DocumentIcon from "@/assets/icons/mypage/document-icon.svg?react";
import DataIcon from "@/assets/icons/mypage/folder-icon.svg?react";
import CalendarIcon from "@/assets/icons/mypage/calendar-icon.svg?react";
import { useModal } from "@/shared/hooks/useModal";
import { myProfile } from "../data/mockMyPage";
import { getMyProfile } from "../api/getMyProfile";
import { updateMyProfile } from "../api/updateMyProfile";
import { getSchedules } from "@/pages/schedule/api/getSchedules";
import PremiumUpgradeModal from "./PremiumUpgradeModal";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState(myProfile.name);
  const [profileEmail, setProfileEmail] = useState(myProfile.email);
  const [draftName, setDraftName] = useState(myProfile.name);
  const [draftEmail, setDraftEmail] = useState(myProfile.email);
  const [isSaving, setIsSaving] = useState(false);
  const [scheduleCount, setScheduleCount] = useState(myProfile.stats.schedules);
  const premiumModal = useModal();

  useEffect(() => {
    getMyProfile()
      .then((profile) => {
        setProfileName(profile.name);
        setProfileEmail(profile.email);
      })
      .catch(() => {
        // keep the placeholder profile when the API call fails
      });

    getSchedules()
      .then((schedules) => setScheduleCount(schedules.length))
      .catch(() => {
        // keep the placeholder schedule count when the API call fails
      });
  }, []);

  const handleEdit = () => {
    setDraftName(profileName);
    setDraftEmail(profileEmail);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await updateMyProfile({
        name: draftName,
        email: draftEmail,
      });
      setProfileName(updated.name);
      setProfileEmail(updated.email);
      setIsEditing(false);
    } catch {
      window.alert("프로필을 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  const statItems = [
    {
      icon: DocumentIcon,
      value: myProfile.stats.documents,
      label: "생성한 문서",
    },
    { icon: DataIcon, value: myProfile.stats.evidence, label: "등록한 증거" },
    {
      icon: CalendarIcon,
      value: scheduleCount,
      label: "등록한 일정",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-4 rounded-[20px] border border-gray-200 bg-white p-6">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-19 w-19 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-blue-500">
            {profileName.slice(0, 1)}
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="text-lg leading-[1.6] font-bold text-gray-900">
                {profileName}
              </span>
              <button
                type="button"
                onClick={premiumModal.open}
                className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-500 hover:bg-blue-100"
              >
                {myProfile.plan}
              </button>
            </div>
            <p className="text-sm leading-[1.6] font-medium text-gray-500">
              {profileEmail}
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="flex w-full flex-col gap-3">
            <input
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400"
            />
            <input
              value={draftEmail}
              onChange={(event) => setDraftEmail(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400"
            />

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-[10px] border border-gray-200 py-2.5 text-sm font-semibold text-gray-700"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 rounded-[10px] bg-blue-300 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isSaving ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="w-full rounded-xl border border-gray-200 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            프로필 수정
          </button>
        )}
      </div>

      <div className="mt-1.25 grid w-full grid-cols-3 gap-2">
        {statItems.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <Icon />
            <span className="text-lg font-bold text-gray-900">{value}건</span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      {premiumModal.isOpen && (
        <PremiumUpgradeModal onClose={premiumModal.close} />
      )}
    </section>
  );
}
