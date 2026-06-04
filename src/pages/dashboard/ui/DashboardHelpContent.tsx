import PlayIcon from "@/assets/dashboard/video_icon.svg?react";
import BookIcon from "@/assets/dashboard/guide_icon.svg?react";
import FileIcon from "@/assets/dashboard/tamplate_icon.svg?react";

type ContentItem = {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const contents: ContentItem[] = [
  {
    id: "video",
    title: "준비서면 작성 방법 (동)",
    badge: "동영상",
    icon: PlayIcon,
  },
  {
    id: "guide",
    title: "소송 진행 절차 (가이드)",
    badge: "가이드",
    icon: BookIcon,
  },
  {
    id: "petition",
    title: "소장 (템플릿)",
    badge: "템플릿",
    icon: FileIcon,
  },
  {
    id: "extension",
    title: "기일변경신청서 (템플릿)",
    badge: "템플릿",
    icon: FileIcon,
  },
];

export default function DashboardHelpContent() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[20px]
        border border-gray-200
        bg-white
        px-6.5
        pt-6
        pb-12.5
        shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.08)]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          left-8
          right-8
          bottom-3
          h-16
          rounded-[28px]
          bg-[linear-gradient(180deg,transparent_0%,#F6FAFF_35%,#E8F2FF_100%)]
          blur-xl
        "
      />
      <div className="relative z-10 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">도움 콘텐츠</h2>

          <button type="button" className="text-sm font-medium text-blue-400">
            더보기 →
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {contents.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                className="
                flex items-center justify-between
                rounded-[10px]
                border border-gray-200
                bg-white
                px-4 py-3.25
              "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                    flex h-8 w-8 px-2 items-center justify-center
                    rounded-[10px]
                    bg-blue-50
                  "
                  >
                    <Icon />
                  </div>

                  <p className="text-base font-medium text-gray-800">
                    {item.title}
                  </p>
                </div>

                <span
                  className="
                  rounded-sm
                  bg-blue-50
                  px-2 py-1
                  text-xs font-semibold text-blue-500
                "
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
