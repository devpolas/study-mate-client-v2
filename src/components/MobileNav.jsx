import { useState } from "react";
import NavLinkWithIcon from "./NavLinkWithIcon";
import { ImMenu4 } from "react-icons/im";
import { ImMenu3 } from "react-icons/im";
import { GrHomeRounded } from "react-icons/gr";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { MdPersonSearch } from "react-icons/md";
import { Link } from "react-router";
import SignWith from "./SignWith";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='md:hidden relative'>
      <button
        onClick={() => setIsOpen((pre) => !pre)}
        className='transition-all duration-200 ease-in'
      >
        {isOpen ? (
          <ImMenu4 className='text-5xl text-primary' />
        ) : (
          <ImMenu3 className='text-5xl text-primary' />
        )}
      </button>

      {isOpen && (
        <div className='absolute top-[65px] -left-4 w-xs p-4 shadow rounded-md bg-white/97 dark:bg-gray-900/97 backdrop-blur-md'>
          <div>
            <div className='flex-col gap-4 flex pb-2'>
              <NavLinkWithIcon path='/' icon={<GrHomeRounded />}>
                Home
              </NavLinkWithIcon>
              <NavLinkWithIcon path='/find-partner' icon={<MdPersonSearch />}>
                Find Partner
              </NavLinkWithIcon>
              <NavLinkWithIcon
                path='/create-profile'
                icon={<BsPersonBoundingBox />}
              >
                Profile
              </NavLinkWithIcon>
            </div>
          </div>
          <div>
            <div className='flex flex-col'>
              <div className='flex flex-row items-center justify-center pt-2 border-t-2 border-gray-300 dark:border-gray-700 gap-2'>
                <Link to='/login' class='btn btn-outline btn-info'>
                  Login
                </Link>
                <Link to='/signup' class='btn btn-outline btn-primary'>
                  Signup
                </Link>
              </div>
              <SignWith icon={<FcGoogle />}>Continue with Google</SignWith>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
