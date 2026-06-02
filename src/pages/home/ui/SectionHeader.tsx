interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  className = "text-center mb-12",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
