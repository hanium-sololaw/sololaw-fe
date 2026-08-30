const tips = [
  "정확한 당사자 정보를 입력하세요",
  "사실관계를 시간순으로 작성하면 좋습니다",
  "증거자료를 함께 준비하세요",
  "법적 용어는 정확하게 사용하세요",
];

export default function DocumentTips() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">작성 팁</h2>

      <ul className="flex flex-col gap-3">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
}
