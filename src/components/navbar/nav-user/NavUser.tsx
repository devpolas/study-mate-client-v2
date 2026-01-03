import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "@/assets/study_mate.webp";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";

export default function NavUser() {
  const { logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          className='w-7 h-7 hover:cursor-pointer'
          src={logo}
          alt='study mate logo'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-4 w-56' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className='hover:cursor-pointer'>
            <Link to='/profile'>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='hover:cursor-pointer'>
            <Link to='/settings'>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='hover:cursor-pointer'>
            <Link to='/support'>Help & Support</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className='text-red-400 hover:cursor-pointer'
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
