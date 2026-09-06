import type { ReactNode } from "react";

type ModalProps = {
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  maxWidthClassName?: string;
};

export default function Modal({
  title,
  onClose,
  children,
  maxWidthClassName = "max-w-lg",
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div
        className={`flex max-h-[85vh] w-full ${maxWidthClassName} flex-col gap-5 overflow-y-auto rounded-3xl bg-white p-5 sm:p-8`}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
          <button type="button" onClick={onClose} className="text-2xl text-gray-500">
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
