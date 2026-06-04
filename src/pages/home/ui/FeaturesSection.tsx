import { useState, useRef, useEffect } from "react";
import { FEATURES } from "../data/features";
import Icon from "@/shared/ui/Icon";
import ArrowLeftIcon from "@/assets/icons/arrow_left.svg?react";
import ArrowRightIcon from "@/assets/icons/arrow_right.svg?react";
import SectionHeader from "./SectionHeader";

const DESIGN_WIDTH = 810;
const DESIGN_HEIGHT = 420;
const SHADOW_PADDING = 40;
const N = FEATURES.length;

function getPosition(idx: number, active: number): number {
  const diff = (((idx - active) % N) + N) % N;
  if (diff === 0) return 0;
  if (diff === 1) return 1;
  return -1;
}

function getCardStyle(pos: number): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    overflow: "hidden",
    borderRadius: 8,
    transition:
      "transform 0.4s ease, width 0.4s ease, height 0.4s ease, box-shadow 0.4s ease",
  };

  if (pos === 0) {
    return {
      ...base,
      width: 450,
      height: 320,
      transform: "translate(-50%, calc(-50% + 40px))",
      zIndex: 20,
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    };
  }

  return {
    ...base,
    width: 250,
    height: 270,
    transform: `translate(calc(-50% ${pos < 0 ? "-" : "+"} 289px), -55%)`,
    zIndex: 10,
    boxShadow: "none",
  };
}

export default function FeaturesSection() {
  const [active, setActive] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const prev = () => setActive((i) => (i - 1 + N) % N);
  const next = () => setActive((i) => (i + 1) % N);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / DESIGN_WIDTH));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const outerHeight = DESIGN_HEIGHT * scale + SHADOW_PADDING;

  return (
    <section id="guide" className="py-20 px-4 bg-gray-50 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="소송 준비, 이렇게 도와드려요"
          description="나홀로 소송에 필요한 모든 기능을 하나의 플랫폼에서"
          className="text-center"
        />

        <div
          ref={containerRef}
          className="relative"
          style={{ height: outerHeight }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: DESIGN_WIDTH,
              height: DESIGN_HEIGHT,
              transformOrigin: "top center",
              transform: `translateX(-50%) scale(${scale})`,
            }}
          >
            {FEATURES.map((feature, idx) => {
              const pos = getPosition(idx, active);
              return (
                <div
                  key={feature.id}
                  style={getCardStyle(pos)}
                  onClick={pos === -1 ? prev : pos === 1 ? next : undefined}
                  className={pos !== 0 ? "cursor-pointer" : undefined}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className="w-full h-full object-cover"
                  />
                  {pos !== 0 && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                      }}
                    />
                  )}
                </div>
              );
            })}

            <button
              onClick={prev}
              className="absolute z-30 hover:opacity-70 transition-opacity"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(calc(-50% - 380px), -55%)",
              }}
            >
              <Icon icon={ArrowLeftIcon} size={30} />
            </button>

            <button
              onClick={next}
              className="absolute z-30 hover:opacity-70 transition-opacity"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(calc(-50% + 380px), -55%)",
              }}
            >
              <Icon icon={ArrowRightIcon} size={30} />
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {FEATURES[active].title}
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            {FEATURES[active].description}
          </p>
        </div>
      </div>
    </section>
  );
}
