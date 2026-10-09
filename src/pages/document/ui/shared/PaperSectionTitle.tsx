import type { ReactNode } from "react";

export default function PaperSectionTitle({ children }: { children: ReactNode }) {
  return <p className="mt-5 mb-2 text-center text-[15px] font-bold tracking-[0.35em] text-gray-900">{children}</p>;
}
