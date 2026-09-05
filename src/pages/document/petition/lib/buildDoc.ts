export type PetitionSection = {
  heading: string;
  lines: string[];
};

export type PetitionDoc = {
  title: string;
  sections: PetitionSection[];
  extraDoc: PetitionSection | null;
  court: string;
  date: string;
  applicantName: string;
};
