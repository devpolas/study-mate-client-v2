import { GiBookAura } from "react-icons/gi";

import { NavLink } from "react-router";
import ThemeSwitch from "./ThemeSwitch";
export default function Logo() {
  return (
    <NavLink to='/' className='w-20'>
      <div className='flex flex-col justify-center items-center transition-all text-primary duration-300 ease-in border border-primary hover:border-info hover:cursor-pointer hover:text-info p-1 rounded-md'>
        <GiBookAura className='text-2xl sm:text-3xl' />
        <p className='text-[10px] sm::text-xs font-bold'>STUDY MATE</p>
      </div>
    </NavLink>
  );
}
