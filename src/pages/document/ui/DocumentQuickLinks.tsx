import calculatorImage from "@/assets/images/document/calculator.png";
import guideBookImage from "@/assets/images/document/guide-book.png";
import recommendImage from "@/assets/images/document/recommend.png";
import templateImage from "@/assets/images/document/template.png";
import { quickLinks, type QuickLinkId } from "../data/quickLinks";

const quickLinkImages: Record<QuickLinkId, string> = {
  calculator: calculatorImage,
  guide: guideBookImage,
  template: templateImage,
  recommend: recommendImage,
};

export default function DocumentQuickLinks() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {quickLinks.map((link) => (
        <div
          key={link.id}
          className="flex flex-col justify-between gap-6 rounded-2xl border border-gray-200 bg-white"
        >
          <div className="flex flex-col gap-1 pt-6 px-6">
            <h3 className="text-base font-bold text-gray-900">{link.title}</h3>
            <p className="text-sm text-gray-500">{link.description}</p>
          </div>

          <img
            src={quickLinkImages[link.id]}
            alt=""
            className="w-50 self-end object-contain pr-[20px]"
          />
        </div>
      ))}
    </section>
  );
}
