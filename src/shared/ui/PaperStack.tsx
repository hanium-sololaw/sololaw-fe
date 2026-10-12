import { cn } from "@/shared/utils/cn";

type PaperStackProps = {
  className?: string;
};

/**
 * The two stacked papers from assets/lawsuit/folder-image.svg, drawn as separate layers so each
 * can animate on its own. Fans out on hover of the nearest `group` parent, matching the document
 * type cards (pages/document/ui/home/DocumentTypeSelector). Positions are derived from the SVG's
 * 226×247 viewBox, so the resting state looks identical to the original image.
 */
export default function PaperStack({ className }: PaperStackProps) {
  return (
    <div aria-hidden="true" className={cn("relative aspect-[226/247]", className)}>
      <div className="absolute top-[54.6%] left-[59.5%] h-[78.4%] w-[72.5%] -translate-x-1/2 -translate-y-1/2 rotate-[5.54deg] rounded-[14px] bg-[#c0cad7] transition-all duration-300 ease-out group-hover:top-[55.6%] group-hover:rotate-[14.22deg]" />
      <div className="absolute top-[50%] left-[48.5%] h-[78.4%] w-[72.5%] -translate-x-1/2 -translate-y-1/2 -rotate-[4.3deg] rounded-[14px] bg-white shadow-[0_0_22px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out group-hover:top-[52%] group-hover:-rotate-[7.28deg]" />
    </div>
  );
}
