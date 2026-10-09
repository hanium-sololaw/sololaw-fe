import { useEffect, useEffectEvent, useState } from "react";
import { createEvidence, nextExhibitNo, uploadEvidenceFile, type PartyType } from "@/pages/evidence/api";
import { listMyCitations, type PrecedentCitation } from "@/shared/api/citations";

export function useExhibitStart(
  caseId: number | null,
  partyType: PartyType,
  onLoaded: (exhibitNo: string) => void,
) {
  const [isAuto, setIsAuto] = useState(false);
  const applyLoaded = useEffectEvent(onLoaded);

  useEffect(() => {
    if (caseId === null) return;
    let cancelled = false;
    nextExhibitNo(caseId, partyType)
      .then((no) => {
        if (cancelled) return;
        applyLoaded(String(no));
        setIsAuto(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [caseId, partyType]);

  return isAuto;
}

const stripExtension = (fileName: string) => fileName.replace(/\.[^.]+$/, "");

export function useEvidenceUpload(
  caseId: number | null,
  partyType: PartyType,
  onUploaded: (names: string[]) => void,
) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0 || caseId === null) return;
    setUploading(true);
    setError("");
    const names: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const meta = await uploadEvidenceFile(caseId, file);
        await createEvidence(caseId, { ...meta, partyType });
        names.push(stripExtension(file.name));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "파일을 올리지 못했어요.");
    } finally {
      if (names.length > 0) onUploaded(names);
      setUploading(false);
    }
  };

  return { uploading, error, upload };
}

export function useCaseCitations(caseId: number | null) {
  const [citations, setCitations] = useState<PrecedentCitation[]>([]);

  useEffect(() => {
    if (caseId === null) return;
    let cancelled = false;
    listMyCitations({ caseId })
      .then((list) => !cancelled && setCitations(list))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [caseId]);

  return citations;
}
