import { buildEvidenceListDoc } from "../lib/buildDoc";
import type { EvidenceListForm } from "../lib/types";

type ReviewStepProps = {
  form: EvidenceListForm;
  onChange: <K extends keyof EvidenceListForm>(key: K, value: EvidenceListForm[K]) => void;
};

export default function ReviewStep({ form, onChange }: ReviewStepProps) {
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= form.items.length) return;
    const next = [...form.items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange("items", next);
  };

  const doc = buildEvidenceListDoc(form);
  const namedRows = doc.rows.filter((row) => row.name);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900">순서를 확인해주세요</h3>
        <p className="mt-1 text-sm text-gray-500">순서를 바꾸면 호증 번호도 함께 바뀌어요.</p>
      </div>

      <div className="flex flex-col gap-2">
        {form.items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-2.5">
            <span className="shrink-0 rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-500">
              {doc.rows[index]?.no}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm text-gray-800">{item.name || "[ 서증명 없음 ]"}</span>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="위로 이동"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === form.items.length - 1}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="아래로 이동"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-2 text-sm font-bold text-gray-900">미리보기</p>
        {namedRows.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-xs text-gray-400">
            서증명을 입력한 증거가 없어요. 이전 단계에서 추가해주세요.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[560px] border-collapse text-left text-xs">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  {["호증번호", "서증명", "입증취지", "원본", "작성자", "작성일"].map((head) => (
                    <th key={head} className="border-b border-gray-200 px-3 py-2 font-semibold">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {namedRows.map((row) => (
                  <tr key={row.no}>
                    <td className="border-b border-gray-100 px-3 py-2 font-semibold text-blue-500">{row.no}</td>
                    <td className="border-b border-gray-100 px-3 py-2">{row.name}</td>
                    <td className="border-b border-gray-100 px-3 py-2 text-gray-600">{row.purpose}</td>
                    <td className="border-b border-gray-100 px-3 py-2">{row.originalLabel}</td>
                    <td className="border-b border-gray-100 px-3 py-2">{row.author}</td>
                    <td className="border-b border-gray-100 px-3 py-2">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
