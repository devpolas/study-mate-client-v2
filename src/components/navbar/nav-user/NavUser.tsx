import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";

export default function NavUser() {
  const {
    logout,
    auth: { user, loading },
  } = useAuth();

  if (loading || !user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          className='border rounded-full w-7 h-7 hover:cursor-pointer'
          src={user?.image || "/avatar.svg"}
          alt='profile image'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-4 w-56' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link to='/profile'>
            <DropdownMenuItem className='hover:cursor-pointer'>
              Profile
            </DropdownMenuItem>
          </Link>
          <Link to='/settings'>
            <DropdownMenuItem className='hover:cursor-pointer'>
              Settings
            </DropdownMenuItem>
          </Link>
          <Link to='/support'>
            <DropdownMenuItem className='hover:cursor-pointer'>
              Help & Support
            </DropdownMenuItem>
          </Link>
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
