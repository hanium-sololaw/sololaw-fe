import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { tabs } from "../../data/tabs";
import { useCaseSearchStore } from "../../store/useCaseSearchStore";

const TAB_SLANT = 16;
const TAB_HEIGHT = 48;
const CORNER_RADIUS = 10;

function roundedTrapezoidPath(width: number, isFirst: boolean) {
  const w = Math.max(width, TAB_SLANT * 2);
  const h = TAB_HEIGHT;
  const diagLength = Math.hypot(TAB_SLANT, h);
  const dx = (CORNER_RADIUS * TAB_SLANT) / diagLength;
  const dy = (CORNER_RADIUS * h) / diagLength;

  if (isFirst) {
    const vx = w - TAB_SLANT;
    const p1x = vx - CORNER_RADIUS;
    const p2x = vx + dx;
    return `path("M0,0 L${p1x},0 Q${vx},0 ${p2x},${dy} L${w},${h} L0,${h} Z")`;
  }

  const vx = TAB_SLANT;
  const p1x = vx + CORNER_RADIUS;
  const p2x = vx - dx;
  return `path("M${p1x},0 L${w},0 L${w},${h} L0,${h} L${p2x},${dy} Q${vx},0 ${p1x},0 Z")`;
}

export default function CaseSearchTabs() {
  const activeTab = useCaseSearchStore((state) => state.activeTab);
  const setActiveTab = useCaseSearchStore((state) => state.setActiveTab);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabs.some((tab) => tab.id === tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam as (typeof tabs)[number]["id"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabClick = (tabId: (typeof tabs)[number]["id"]) => {
    setActiveTab(tabId);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", tabId);
      return next;
    });
  };

  useLayoutEffect(() => {
    const measure = () =>
      setWidths(
        buttonRefs.current.map((el) => el?.getBoundingClientRect().width ?? 0),
      );

    measure();

    const observer = new ResizeObserver(measure);
    buttonRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="-mx-1 -mt-2 flex overflow-x-auto px-1 pt-2">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        const isFirst = index === 0;
        const width = widths[index];

        return (
          <div
            key={tab.id}
            style={{ marginLeft: isFirst ? 0 : -TAB_SLANT }}
            className={`relative shrink-0 ${
              isActive
                ? "z-10 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.10)]"
                : "z-0"
            }`}
          >
            <button
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              style={{
                height: TAB_HEIGHT,
                clipPath: width ? roundedTrapezoidPath(width, isFirst) : undefined,
              }}
              className={`flex items-center justify-center rounded-t-xl px-5 text-sm whitespace-nowrap transition-colors sm:px-8 sm:text-base ${
                isActive
                  ? "bg-white font-bold text-gray-700"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          </div>
        );
      })}
    </div>
  );
}
