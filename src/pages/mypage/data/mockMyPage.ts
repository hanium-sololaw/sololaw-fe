export type CaseStatus = "진행 중" | "준비 중" | "종료";

export type MyCase = {
  id: string;
  title: string;
  status: CaseStatus;
  caseNumber: string;
  court: string;
};

export const myProfile = {
  name: "김지민",
  email: "example@gmail.com",
  plan: "free",
  stats: {
    documents: 7,
    evidence: 14,
    schedules: 9,
  },
};

export const myCases: MyCase[] = [];

export const caseStatusStyle: Record<CaseStatus, string> = {
  "진행 중": "bg-blue-50 text-blue-500",
  "준비 중": "bg-yellow-50 text-yellow-500",
  "종료": "bg-gray-100 text-gray-500",
};

export type AccountSettingItem = {
  id: string;
  label: string;
  description: string;
};

export const accountSettingItems: AccountSettingItem[] = [
  {
    id: "notification",
    label: "알림 확인 및 설정",
    description: "기일·제출 기한 알림을 관리해요",
  },
  {
    id: "password",
    label: "비밀번호 및 보안",
    description: "기일·제출 기한 알림을 관리해요",
  },
  {
    id: "terms",
    label: "서비스 이용약관",
    description: "서비스 이용 조건을 확인해요",
  },
  {
    id: "privacy",
    label: "개인정보처리방침",
    description: "수집·보관되는 정보를 확인해요",
  },
];

export type SubscriptionItem = {
  id: string;
  title: string;
  badge: string;
  description: string;
  actionLabel: string;
};

export const subscriptionItems: SubscriptionItem[] = [
  {
    id: "storage",
    title: "증빙자료 저장공간",
    badge: "기본",
    description: "현재 500 MB까지 보관",
    actionLabel: "저장공간 늘리기",
  },
  {
    id: "caseSearch",
    title: "판례검색 이용권",
    badge: "기본",
    description: "검색당 유사 판례 최대 5건 확인",
    actionLabel: "프리미엄 보기",
  },
];

export type StoragePlan = {
  id: string;
  title: string;
  badge?: string;
  capacity: string;
  description: string;
  features: string[];
  price: string;
  actionLabel: string;
  current?: boolean;
  highlighted?: boolean;
};

export const storagePlans: StoragePlan[] = [
  {
    id: "basic",
    title: "기본",
    badge: "현재 플랜",
    capacity: "500 MB",
    description: "증빙자료를 시작하기 위한 기본 저장공간",
    features: ["파일 종류·사건 수 제한 없음", "판례검색 이용권과 별도 관리"],
    price: "무료",
    actionLabel: "현재 이용중",
    current: true,
  },
  {
    id: "standard",
    title: "안심 보관 10GB",
    badge: "추천",
    capacity: "10GB",
    description: "진행 중인 사건의 증빙을 비공개로 모아 관리하는 개인 사용자용",
    features: ["파일 종류·사건 수 제한 없음", "판례검색 이용권과 별도 관리"],
    price: "12,900원 / 월",
    actionLabel: "10 GB 구독",
    highlighted: true,
  },
  {
    id: "pro",
    title: "전문 보관 50GB",
    capacity: "50 GB",
    description: "여러 사건과 대용량 증빙을 장기간 관리하는 사용자용",
    features: ["파일 종류·사건 수 제한 없음", "판례검색 이용권과 별도 관리"],
    price: "24,900원 / 월",
    actionLabel: "50 GB 구독",
  },
];
