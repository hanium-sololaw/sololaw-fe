import CloseIcon from "@/assets/icons/mypage/close-icon.svg?react";
import CheckButtonIcon from "@/assets/icons/mypage/check-button.svg?react";

type PrivacyModalProps = {
  onClose: () => void;
};

const effectiveDate = "2026년 8월 14일";

const collectionTable = {
  headers: ["구분", "항목", "수집 방법"],
  rows: [
    ["회원가입", "이름, 이메일 주소, 아이디, 비밀번호", "이용자 직접 입력"],
    [
      "사건 관리",
      "당사자 이름·주소·연락처, 사건번호, 청구금액, 사실관계 등 이용자가 입력한 소송 관련 정보",
      "이용자 직접 입력",
    ],
    [
      "증거 관리",
      "이용자가 업로드한 문서·이미지 파일 및 그 안에 포함된 정보",
      "이용자 업로드",
    ],
    ["유료 결제", "구독 상태, 결제 세션 식별자", "결제대행사로부터 전달"],
    [
      "서비스 이용",
      "작업공간 식별자(브라우저에 저장되는 임의의 문자열)",
      "이용 시 자동 생성",
    ],
  ],
};

export default function PrivacyModal({ onClose }: PrivacyModalProps) {
  return (
    <div data-modal className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="scrollbar-none flex max-h-[85vh] w-full max-w-lg flex-col gap-5 overflow-y-auto rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-900">
              개인정보처리방침
            </h2>
            <p className="text-sm text-gray-500">시행일 {effectiveDate}</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-bold text-gray-900">들어가며</h3>
            <p className="text-xs leading-[1.6] font-medium text-gray-400">
              나홀로법에(이하 "회사")는 「개인정보 보호법」 제30조에 따라
              이용자의 개인정보를 보호하고 관련 고충을 신속히 처리하기 위하여
              다음과 같이 개인정보처리방침을 수립·공개합니다.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-bold text-gray-900">
              1. 수집하는 개인정보 항목과 수집 방법
            </h3>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="divide-x divide-gray-200 bg-gray-50">
                    {collectionTable.headers.map((header) => (
                      <th
                        key={header}
                        className="border-b border-gray-200 px-3 py-2 font-medium text-gray-500"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {collectionTable.rows.map((row) => (
                    <tr
                      key={row[0]}
                      className="divide-x divide-gray-200 border-b border-gray-200 last:border-b-0"
                    >
                      {row.map((cell) => (
                        <td
                          key={cell}
                          className="px-3 py-2 leading-[1.6] font-medium text-gray-500"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs leading-[1.6] font-medium text-gray-400">
              회사는 광고 식별자나 행태정보 수집을 위한 제3자 추적 도구를
              사용하지 않습니다.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-bold text-gray-900">
              2. 개인정보의 처리 목적
            </h3>

            <ol className="flex list-decimal flex-col gap-1 pl-5 marker:text-gray-500">
              <li className="text-xs leading-[1.6] font-medium text-gray-400">
                회원 식별 및 계정 관리
              </li>
              <li className="text-xs leading-[1.6] font-medium text-gray-400">
                소송 서류 초안 생성, 증거목록 작성, 일정 관리 등 서비스 제공
              </li>
              <li className="text-xs leading-[1.6] font-medium text-gray-400">
                유료서비스 이용 자격 확인, 결제 및 환불 처리
              </li>
              <li className="text-xs leading-[1.6] font-medium text-gray-400">
                문의 대응 및 공지사항 전달
              </li>
            </ol>

            <p className="text-xs leading-[1.6] font-medium text-gray-400">
              회사는 수집한 개인정보를 위 목적 외의 용도로 이용하지 않으며,
              목적이 변경되는 경우에는 사전에 동의를 받습니다.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex w-full shrink-0 items-center justify-center gap-1 rounded-lg bg-blue-300 py-3 text-sm font-semibold text-white hover:bg-blue-500"
        >
          <CheckButtonIcon />
          확인했어요
        </button>
      </div>
    </div>
  );
}
