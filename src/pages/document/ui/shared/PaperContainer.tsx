import type { ReactNode } from "react";

export default function PaperContainer({ children }: { children: ReactNode }) {
  return <div className="font-serif text-[13px] leading-loose text-gray-800">{children}</div>;
}
