import { NavLink } from "react-router";
import type { LucideIcon } from "lucide-react";

type DefaultNavLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  iconSize: number;
};

export default function DefaultNavLink({
  href,
  icon: Icon,
  iconSize = 16,
  label,
}: DefaultNavLinkProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `transition-colors ${isActive ? "text-ring" : "hover:text-ring"}`
      }
    >
      <span className='flex flex-row items-center gap-3'>
        <Icon size={iconSize} />
        {label}
      </span>
    </NavLink>
  );
}
