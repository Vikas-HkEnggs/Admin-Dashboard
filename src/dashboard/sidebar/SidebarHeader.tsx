import Image from "next/image";

export function SidebarHeader() {
  return (
    <div className="sticky top-0 z-10 mb-6 flex h-[73px] items-center justify-center bg-white">
      <Image src="/assets/logo-r-bg.png" width={60} height={60} alt="H K Logo" />
    </div>
  );
}
