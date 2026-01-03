import DefaultNavLink from "./nav/DefaultNavLink";
import type { MenuItem } from "@/types/auth";

export default function DesktopNav({
  visibleMenuItems,
}: {
  visibleMenuItems: MenuItem[];
}) {
  return (
    <div className='hidden lg:flex flex-row gap-4 lg:gap-8 xl:gap-10 text-lg'>
      {visibleMenuItems.map((item) => (
        <DefaultNavLink
          key={item.href}
          href={item.href}
          label={item.name}
          icon={item.icon}
          iconSize={16}
        />
      ))}
    </div>
  );
}
