import MyPageHeader from "./ui/MyPageHeader";
import ProfileCard from "./ui/ProfileCard";
import MyCases from "./ui/MyCases";
import AccountSettings from "./ui/AccountSettings";
import AccountFooter from "./ui/AccountFooter";

export default function MyPage() {
  return (
    <div className="flex flex-col gap-6">
      <MyPageHeader />

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_1fr]">
        <ProfileCard />

        <div className="flex flex-col gap-4">
          <MyCases />
          <AccountSettings />
          <AccountFooter />
        </div>
      </div>
    </div>
  );
}
