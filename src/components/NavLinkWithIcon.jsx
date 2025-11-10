import { NavLink } from "react-router";

export default function NavLinkWithIcon({ path, icon, children }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${
          isActive ? "text-info" : "text-primary"
        } hover:text-info text-sm sm:text-lg md:text-xl lg:text-2xl transition-all duration-150 ease-in-out`
      }
    >
      <span className='flex flex-row gap-2 items-center'>
        {icon}
        <span>{children}</span>
      </span>
    </NavLink>
  );
}
