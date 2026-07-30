import LogoSvg from "@/assets/icons/shared/logo.svg?react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <LogoSvg width={40} height={40} />
      <span className="font-paperlogy text-3xl font-bold text-blue-400">나홀로법에</span>
    </div>
  )
}
