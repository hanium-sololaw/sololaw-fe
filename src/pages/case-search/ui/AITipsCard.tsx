import LightIcon from "@/assets/icons/light_icon.svg?react";
import Icon from "@/shared/ui/Icon";

const aiTips = [
  "관련성 보통",
  "대법원 판례는 하급심 판례보다 참고 가치가 높게 평가되는 편입니다.",
  "청구 취지에 판례 번호를 함께 표기해 두면 자료를 정리하기 편합니다.",
];

export default function AITipsCard() {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-yellow-700">
        <Icon icon={LightIcon} size={18} className="text-yellow-500" />
        AI 팁
      </h2>

      <ul className="flex flex-col gap-2">
        {aiTips.map((tip) => (
          <li
            key={tip}
            className="flex gap-2 text-sm text-yellow-800 before:content-['•']"
          >
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
