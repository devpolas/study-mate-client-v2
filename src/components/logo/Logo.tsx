import { GiBookAura } from "react-icons/gi";

import { NavLink } from "react-router";
export default function Logo() {
  return (
    <NavLink to='/' className='w-20'>
      <div className='flex flex-col justify-center items-center p-1 border border-primary hover:border-info rounded-md text-primary hover:text-info transition-all duration-300 ease-in hover:cursor-pointer'>
        <GiBookAura className='text-2xl sm:text-3xl' />
        <p className='font-bold text-[10px] sm::text-xs'>STUDY MATE</p>
      </div>
    </NavLink>
  );
}
