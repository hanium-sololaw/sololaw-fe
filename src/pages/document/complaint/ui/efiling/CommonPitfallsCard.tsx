import Icon from "@/shared/ui/Icon";
import ChevronTopIcon from "@/assets/icons/document/chevron-top-icon.svg?react";

const PITFALLS = [
  { title: "사용자등록 누락", desc: "회원가입만 하고 사용자등록을 안 하면 제출 버튼이 안 눌려요." },
  { title: "관할 오류", desc: "관할이 아닌 법원에 내면 이송되어 몇 주가 그냥 흘러갑니다." },
  { title: "전자송달 미확인", desc: "열람하지 않아도 1주일 뒤 송달로 간주돼 기한을 놓치기 쉬워요." },
];

export default function CommonPitfallsCard() {
  return (
    <details className="group rounded-2xl border border-gray-200 bg-white px-5 py-4" open>
      <summary className="flex cursor-pointer list-none items-start gap-3 border-b border-gray-100 py-[9px]">
        <span className="flex-1 text-[15px] leading-[1.6] font-bold tracking-[-0.225px] text-gray-900">자주 막히는 곳</span>
        <Icon icon={ChevronTopIcon} size={20} className="rotate-180 transition-transform group-open:rotate-0" />
      </summary>
      <ul>
        {PITFALLS.map((item) => (
          <li key={item.title} className="py-2 text-[13px] leading-[1.6] tracking-[-0.195px]">
            <b className="font-bold text-gray-900">{item.title}</b>{" "}
            <span className="font-medium text-gray-500">— {item.desc}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
