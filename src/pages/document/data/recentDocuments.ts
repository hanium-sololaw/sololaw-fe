export type RecentDocument = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
};

export const recentDocuments: RecentDocument[] = [
  {
    id: "1",
    name: "임대차_보증금_반환_소장.pdf",
    type: "소장",
    createdAt: "2026-03-05",
  },
  {
    id: "2",
    name: "준비서면_1차.pdf",
    type: "준비서면",
    createdAt: "2026-03-03",
  },
  {
    id: "3",
    name: "증거목록_1차.pdf",
    type: "증거목록",
    createdAt: "2026-02-28",
  },
];
