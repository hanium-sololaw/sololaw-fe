import Icon from "@/shared/ui/Icon";
import CheckIcon from "@/assets/icons/case-search/check-icon.svg?react";
import type { ComplaintDoc } from "../../lib/buildDoc";
import type { ComplaintForm } from "../../lib/types";

type SubmissionChecklistProps = {
  doc: ComplaintDoc;
  form: ComplaintForm;
  onEdit: () => void;
};

export default function SubmissionChecklist({ doc, form, onEdit }: SubmissionChecklistProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="font-bold text-gray-900">제출 전 확인</h2>
      <ul className="mt-3 space-y-3 text-sm">
        <li className="flex items-start gap-2.5">
          <Icon icon={CheckIcon} size={18} className="mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">당사자 표시</p>
            <p className="text-gray-500">
              원고 {form.plaintiffs[0]?.name || "-"} · 피고 {form.defendants[0]?.name || "-"}
            </p>
          </div>
        </li>
        <li className="flex items-start gap-2.5">
          <Icon icon={CheckIcon} size={18} className="mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">관할 법원</p>
            <p className="text-gray-500">{doc.court}</p>
          </div>
        </li>
        <li className="flex items-start gap-2.5">
          <Icon icon={CheckIcon} size={18} className="mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">증거 첨부</p>
            <p className="text-gray-500">{doc.evidence.length > 0 ? doc.evidence[0] : "증거 없음"}</p>
          </div>
        </li>
        <li className="flex items-start gap-2.5 rounded-xl bg-gray-50 p-3">
          <span className="mt-0.5 text-gray-400">ⓘ</span>
          <div>
            <p className="font-semibold text-gray-900">기명날인</p>
            <p className="text-gray-500">
              종이로 낼 때만 — 출력본 「(인)」 자리에 서명·날인하고 간인하세요. 전자소송은 공동인증서 전자서명으로 갈음합니다.
            </p>
          </div>
        </li>
      </ul>
      <button
        type="button"
        onClick={onEdit}
        className="mt-4 w-full rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        소장 내용 수정하기
      </button>
    </div>
  );
}
