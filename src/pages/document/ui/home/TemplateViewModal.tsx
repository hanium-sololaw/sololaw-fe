import { useState } from "react";
import { documentTemplates, type TemplateBlock } from "../../data/templates";
import Modal from "../shared/Modal";

const blockToText = (block: TemplateBlock): string => {
  switch (block.type) {
    case "party":
    case "kv":
    case "list":
      return block.rows.map((row) => row.slice(0, 2).join("\t")).join("\n");
    case "table":
      return [block.head, ...block.rows].map((row) => row.join("\t")).join("\n");
    default:
      return block.text;
  }
};

const toPlainText = (blocks: TemplateBlock[]) => blocks.map(blockToText).join("\n\n");

const Row = ({ left, right, wide }: { left: string; right: string; wide?: boolean }) => (
  <div className={`grid gap-x-4 ${wide ? "grid-cols-[162px_1fr]" : "grid-cols-[auto_auto] justify-start gap-x-10"}`}>
    <span>{left}</span>
    <span className={wide ? "" : "text-right"}>{right}</span>
  </div>
);

function PaperBlock({ block }: { block: TemplateBlock }) {
  switch (block.type) {
    case "title":
      return <h4 className="pb-4 text-center text-[22px] font-bold tracking-[0.6em] pl-[0.6em]">{block.text}</h4>;
    case "heading":
      return <h5 className="pt-3 text-center font-bold tracking-[0.5em] pl-[0.5em]">{block.text}</h5>;
    case "center":
      return <p className="text-center font-bold">{block.text}</p>;
    case "p":
      return <p className={`whitespace-pre-wrap break-keep text-justify ${block.indent ? "pl-[22px]" : ""}`}>{block.text}</p>;
    case "note":
      return <p className="whitespace-pre-wrap break-keep text-[11px] leading-[1.75] text-gray-700">{block.text}</p>;
    case "sign":
      return <p className="whitespace-pre-wrap pt-3 text-right">{block.text}</p>;
    case "court":
      return <p className="pt-6 text-sm font-bold">{block.text}</p>;
    case "party":
      return (
        <div className="flex flex-col gap-2.5">
          {block.rows.map(([label, value]) => (
            <div key={label} className="flex gap-5">
              <span className="flex w-[58px] shrink-0 justify-between">
                {[...label].map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </span>
              <span className="whitespace-pre-wrap">{value}</span>
            </div>
          ))}
        </div>
      );
    case "kv":
      return (
        <div className="flex flex-col">
          {block.rows.map(([label, value, total]) => (
            <div key={label} className={total ? "border-t border-gray-600 font-bold" : ""}>
              <Row left={label} right={value} />
            </div>
          ))}
        </div>
      );
    case "list":
      return (
        <div className="flex flex-col">
          {block.rows.map(([left, right]) => (
            <Row key={left} left={left} right={right} wide />
          ))}
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[10.75px] leading-[1.55]">
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} className="border border-gray-700 bg-gray-100 px-1.5 py-1 text-center font-bold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={index} className="border border-gray-700 px-1.5 py-1 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

const categories = [...new Set(documentTemplates.map((template) => template.category))];

export default function TemplateViewModal({ onClose }: { onClose: () => void }) {
  const [selectedId, setSelectedId] = useState(documentTemplates[0].id);
  const [copied, setCopied] = useState(false);
  const selected = documentTemplates.find((template) => template.id === selectedId) ?? documentTemplates[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toPlainText(selected.blocks));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 권한이 없으면 복사 표시만 생략
    }
  };

  return (
    <Modal
      title={
        <>
          템플릿 보기
          <span className="mt-1 block text-sm font-normal text-gray-500">
            법원 제출 서면의 양식 예시입니다. 당사자·금액·날짜는 지어낸 것이니 내 사건에 맞게 바꿔 쓰세요.
          </span>
        </>
      }
      onClose={onClose}
      maxWidthClassName="max-w-5xl"
    >
      <div className="flex h-[60vh] flex-col gap-4 sm:flex-row">
        <nav className="flex shrink-0 flex-row gap-4 overflow-auto rounded-xl bg-gray-50 p-3 sm:w-56 sm:flex-col sm:gap-3">
          {categories.map((category) => (
            <div key={category} className="flex flex-col gap-1">
              <p className="px-2 text-[11px] font-semibold text-gray-500">{category}</p>
              {documentTemplates
                .filter((template) => template.category === category)
                .map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedId(template.id)}
                    aria-current={template.id === selected.id}
                    className={`whitespace-nowrap rounded-lg px-2.5 py-2 text-left text-[13px] ${
                      template.id === selected.id ? "bg-blue-50 font-semibold text-blue-500" : "font-medium text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {template.label}
                  </button>
                ))}
            </div>
          ))}
        </nav>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-xl font-semibold text-gray-900">{selected.label}</h3>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-500">{selected.badge}</span>
            </div>
            <p className="text-[13px] text-gray-500">{selected.description}</p>
          </div>

          <div key={selected.id} className="min-h-0 flex-1 overflow-auto rounded-xl bg-gray-100 p-4 sm:p-5">
            <article className="mx-auto flex max-w-[600px] flex-col gap-3 bg-white px-6 py-10 font-template text-[12.5px] leading-[1.75] text-gray-900 shadow-md sm:px-10">
              {selected.blocks.map((block, index) => (
                <PaperBlock key={index} block={block} />
              ))}
            </article>
          </div>
        </section>
      </div>

      <div className="flex justify-between gap-2">
        <button type="button" onClick={handleCopy} className="rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-600">
          {copied ? "복사됨" : "본문 복사"}
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void import("../../lib/templateDocx").then((m) => m.downloadTemplateDocx(selected.label, selected.blocks))}
            className="rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-600"
          >
            워드 다운로드
          </button>
          <button type="button" onClick={onClose} className="rounded-lg bg-blue-400 px-6 py-2 text-sm font-semibold text-white">
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
