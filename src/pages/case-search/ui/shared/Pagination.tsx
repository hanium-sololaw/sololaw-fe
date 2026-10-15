import Icon from "@/shared/ui/Icon";
import ChevronLeftIcon from "@/assets/icons/case-search/chevron-left-icon.svg?react";
import ChevronRightIcon from "@/assets/icons/case-search/chevron-right-icon.svg?react";

type PaginationProps = {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
};

// 색 클래스는 상태별로 배타적으로 둔다 — 같은 속성의 유틸리티를 겹쳐 쓰면 CSS 선언 순서에 따라 활성 색이 덮인다.
const baseCls = "flex size-[30px] items-center justify-center rounded-[5px] text-[15px]";
const idleCls = `${baseCls} bg-gray-50 font-medium text-gray-300`;
const activeCls = `${baseCls} bg-blue-300 font-bold text-gray-50`;

export default function Pagination({ page, pageCount, onChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="판례 검색 결과 페이지" className="flex items-center justify-center gap-2.5 pt-2">
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`${idleCls} disabled:cursor-default`}
      >
        <Icon icon={ChevronLeftIcon} size={20} />
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          type="button"
          aria-current={number === page ? "page" : undefined}
          onClick={() => onChange(number)}
          className={number === page ? activeCls : idleCls}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        aria-label="다음 페이지"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        className={`${idleCls} disabled:cursor-default`}
      >
        <Icon icon={ChevronRightIcon} size={20} />
      </button>
    </nav>
  );
}
