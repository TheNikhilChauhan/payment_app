"use client";

import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}
export const SidebarItem = ({ href, title, icon }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div>{icon}</div>
      <div>{title}</div>
    </div>
  );
};
