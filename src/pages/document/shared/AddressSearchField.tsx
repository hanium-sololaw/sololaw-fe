import { useRef, useState } from "react";
import Modal from "./Modal";

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        width?: string;
        height?: string;
        oncomplete: (data: { roadAddress: string; jibunAddress: string; userSelectedType: "R" | "J" }) => void;
      }) => { embed: (element: HTMLElement) => void };
    };
  }
}

const POSTCODE_SRC = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

let postcodeLoader: Promise<void> | null = null;
function loadPostcode(): Promise<void> {
  if (window.daum?.Postcode) return Promise.resolve();
  if (!postcodeLoader) {
    postcodeLoader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = POSTCODE_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        postcodeLoader = null;
        reject(new Error("주소 검색 서비스를 불러오지 못했습니다"));
      };
      document.head.appendChild(script);
    });
  }
  return postcodeLoader;
}

type AddressSearchFieldProps = {
  value: string;
  onChange: (address: string) => void;
  placeholder?: string;
};

export default function AddressSearchField({ value, onChange, placeholder }: AddressSearchFieldProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const openSearch = async () => {
    setError("");
    setOpen(true);
    try {
      await loadPostcode();
    } catch (e) {
      setError(e instanceof Error ? e.message : "주소 검색 서비스를 불러오지 못했습니다");
      return;
    }
    requestAnimationFrame(() => {
      if (!boxRef.current || !window.daum) return;
      boxRef.current.replaceChildren();
      new window.daum.Postcode({
        width: "100%",
        height: "100%",
        oncomplete: (data) => {
          onChange(data.userSelectedType === "J" ? data.jibunAddress : data.roadAddress);
          setOpen(false);
        },
      }).embed(boxRef.current);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-left text-sm outline-none transition hover:border-blue-300 focus:border-blue-400"
      >
        <span className={`truncate ${value ? "text-gray-800" : "text-gray-400"}`}>
          {value || placeholder || "클릭해서 주소를 검색해주세요"}
        </span>
        <span className="shrink-0 text-xs font-semibold text-blue-500">주소 검색</span>
      </button>

      {open && (
        <Modal title="주소 검색" onClose={() => setOpen(false)} maxWidthClassName="max-w-xl">
          <div ref={boxRef} className="h-[28rem] w-full overflow-hidden rounded-xl border border-gray-200" />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </Modal>
      )}
    </>
  );
}
