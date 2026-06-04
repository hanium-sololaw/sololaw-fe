type SummaryCard = {
  id: string;
  title: string;
  value: string;
  badge: string;
};

const summaryCards: SummaryCard[] = [
  {
    id: "cases",
    title: "진행 중인 사건",
    value: "2건",
    badge: "1건 기일 임박",
  },
  {
    id: "deadline",
    title: "다음 변론기일",
    value: "D-3",
    badge: "7월 1일",
  },
  {
    id: "documents",
    title: "생성한 문서",
    value: "7",
    badge: "2개 제출 완료",
  },
  {
    id: "evidence",
    title: "등록된 증거",
    value: "14",
    badge: "갑호증 9개",
  },
];

type SummaryCardItemProps = {
  title: string;
  value: string;
  badge: string;
};

function SummaryCardItem({ title, value, badge }: SummaryCardItemProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        flex h-47 flex-col justify-between
        rounded-[20px]
        border border-gray-200
        bg-white
        px-9 pt-6 pb-7.5
        shadow-[inset_0_6px_10px_-2px_rgba(130,130,132,0.08)]
      "
    >
      <div
        className="
        pointer-events-none
        absolute
        left-5
        right-5
        bottom-3
        h-16
        rounded-[20px]
        bg-[linear-gradient(180deg,transparent_0%,#F6FAFF_30%,#E8F2FF_100%)]    blur-lg
        opacity-70
      "
      />

      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-blue-700">{title}</h3>

        <p className="text-3xl font-bold text-blue-700">{value}</p>
      </div>

      <div className="relative z-10">
        <span
          className="
            inline-flex items-center
            rounded-[20px]
            bg-blue-50
            px-4 py-1
            text-xl
            font-normal
            text-blue-300
          "
        >
          {badge}
        </span>
      </div>
    </div>
  );
}

export default function DashboardSummary() {
  return (
    <section className="grid grid-cols-4 gap-2.5">
      {summaryCards.map((card) => (
        <SummaryCardItem
          key={card.id}
          title={card.title}
          value={card.value}
          badge={card.badge}
        />
      ))}
    </section>
  );
}
