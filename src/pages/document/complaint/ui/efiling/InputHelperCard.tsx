import Icon from "@/shared/ui/Icon";
import ChevronTopIcon from "@/assets/icons/document/chevron-top-icon.svg?react";
import type { ComplaintDoc } from "../../lib/buildDoc";
import type { ComplaintForm } from "../../lib/types";
import AccordionSection from "./AccordionSection";
import CopyRow from "./CopyRow";
import CopyTextBlock from "./CopyTextBlock";
import PartyFields from "./PartyFields";
import { FIRST_TIME_STEPS, splitEvidenceLine } from "./helpers";

type InputHelperCardProps = {
  doc: ComplaintDoc;
  form: ComplaintForm;
  claimValue: number;
  onEdit: () => void;
};

export default function InputHelperCard({
  doc,
  form,
  claimValue,
  onEdit,
}: InputHelperCardProps) {
  const claimPurposeText = doc.claimPurpose.join("\n");
  const claimCauseText = doc.claimCause.join("\n");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900">전자소송 입력 도우미</h2>
        <a
          href="https://ecfs.scourt.go.kr"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-500"
        >
          포털 열기 ↗
        </a>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-gray-500">
        포털 소장 작성 화면의 순서 그대로예요. 옆 창에 포털을 띄워 두고
        위에서부터 복사해 옮기세요. <br />
        당사자·관할·소가는 화면 입력만 되고, 청구취지·청구원인은 2,000자를
        넘으면 파일로 붙입니다.
      </p>

      <div className="mt-3 divide-y divide-gray-100">
        <AccordionSection
          index={1}
          title="사건 기본정보"
          hint="소가를 넣으면 인지액·송달료가 자동 계산돼요."
        >
          <CopyRow label="관할법원" value={doc.court} />
          <CopyRow label="사건명" value={doc.caseName} />
          <CopyRow
            label="소가"
            value={claimValue ? `${claimValue.toLocaleString("ko-KR")} 원` : ""}
          />
        </AccordionSection>

        <PartyFields
          index={2}
          title="당사자 — 원고 (나)"
          party={form.plaintiffs[0]}
        />
        <PartyFields
          index={3}
          title="당사자 — 피고 (상대방)"
          hint="주소를 모르면 아는 범위까지만 넣고 접수하세요. 이후 보정명령으로 확인할 수 있어요."
          party={form.defendants[0]}
        />

        <AccordionSection
          index={4}
          title="청구취지"
          hint="2,000자를 넘거나 표가 들어가면 「청구취지별지 첨부하기」로 파일을 붙이세요."
        >
          <CopyTextBlock
            label="청구취지 전문"
            text={claimPurposeText}
            filename="청구취지.txt"
          />
        </AccordionSection>

        <AccordionSection
          index={5}
          title="청구원인"
          hint="2,000자를 넘거나 표가 들어가면 「청구취지별지 첨부하기」로 파일을 붙이세요."
        >
          <CopyTextBlock
            label="청구원인 전문"
            text={claimCauseText}
            filename="청구원인.txt"
          />
        </AccordionSection>

        <AccordionSection
          index={6}
          title="입증서류 (증거)"
          hint="복사가 아니라 파일 첨부입니다. 서증명은 청구원인에 적은 이름과 똑같이 맞춰야 재판부가 대조할 수 있어요."
        >
          {doc.evidence.length === 0 ? (
            <p className="text-sm text-gray-400">등록된 증거가 없어요.</p>
          ) : (
            <>
              {doc.evidence.map((line, index) => {
                const { label, value } = splitEvidenceLine(line);
                return <CopyRow key={index} label={label} value={value} />;
              })}
              <p className="mt-3 rounded-xl bg-gray-50 p-3 text-center text-sm text-gray-500">
                올리신 {doc.evidence.length}건은 증빙자료에 등록돼 있어요.{" "}
                <button
                  type="button"
                  onClick={onEdit}
                  className="font-semibold text-blue-500 hover:text-blue-600"
                >
                  증빙자료 열기
                </button>
              </p>
            </>
          )}
        </AccordionSection>

        <AccordionSection
          index={7}
          title="첨부서류"
          hint="증거가 아닌 서류만 넣습니다."
        >
          <p className="mb-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
            첨부서류로 낸 문서는{" "}
            <b className="font-semibold text-gray-900">
              증거로 쓰이지 않습니다
            </b>
            . 증거가 될 자료는 반드시 6번 입증서류로 내세요.
          </p>
          {doc.attachments.length === 0 ? (
            <p className="text-sm text-gray-400">등록된 첨부서류가 없어요.</p>
          ) : (
            doc.attachments.map((line, index) => (
              <CopyRow key={index} label={`${index + 1}.`} value={line} />
            ))
          )}
        </AccordionSection>

        <AccordionSection
          index={8}
          title="전자서명 후 제출"
          hint="작성완료 → 전자서명 → 인지대·송달료 결제 순으로 진행됩니다."
        >
          <p className="text-sm font-semibold text-gray-800">
            공동인증서로 전자서명하면 서명·날인이 끝납니다. 결제까지 마치고
            접수번호가 나오면 제출이 완료된 거예요.
          </p>
        </AccordionSection>
      </div>

      <details className="group mt-4 rounded-xl border border-gray-100 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
          전자소송, 처음이신가요?
          <Icon icon={ChevronTopIcon} size={20} className="rotate-180 transition-transform group-open:rotate-0" />
        </summary>
        <ol className="mt-3 space-y-3 text-sm">
          {FIRST_TIME_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{step.title}</p>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
