import AboutIcon from "@/assets/icons/case-search/about-icon.svg?react";
import Icon from "@/shared/ui/Icon";

const aboutItems = [
  { label: "데이터 출처", value: "공개된 대법원·일부 하급심 판례와 법령" },
  { label: "제공하지 않는 것", value: "승소율·재판 결과 예측·전국 통계" },
  {
    label: "'관련성' 의미",
    value: "입력 내용과의 텍스트 유사도이며, 법적 중요도가 아닙니다",
  },
  { label: "한계", value: "공개 판례 일부만 대상이라 전체를 대표하지 않습니다" },
];

export default function AboutSearchCard() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
        <Icon icon={AboutIcon} size={16} />이 검색에 대하여
      </h2>

      <dl className="flex flex-col gap-3">
        {aboutItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <dt className="text-sm font-semibold text-gray-800">
              {item.label}
            </dt>
            <dd className="text-sm text-gray-400">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
