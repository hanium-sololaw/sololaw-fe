import { useState } from "react";

import GuideHeader from "./ui/GuideHeader";
import LawsuitCaseCard from "./ui/LawsuitCaseCard";
import { mockLawsuits } from "./data/mockLawsuits";

export default function GuidePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <GuideHeader />

      <section className="relative flex flex-col gap-6 overflow-hidden rounded-[14px] bg-white p-8">
        <h2 className="relative z-10 text-lg font-semibold text-gray-900">
          현재 진행 중인 소송을 선택해주세요.
        </h2>

        <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockLawsuits.map((lawsuit) => (
            <LawsuitCaseCard
              key={lawsuit.id}
              title={lawsuit.title}
              court={lawsuit.court}
              caseNumber={lawsuit.caseNumber}
              lastUpdatedAt={lawsuit.lastUpdatedAt}
              selected={lawsuit.id === selectedId}
              onClick={() => setSelectedId(lawsuit.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
