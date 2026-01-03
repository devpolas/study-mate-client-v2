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

export default function NavUser() {
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
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className='hover:cursor-pointer'>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className='hover:cursor-pointer'>
            Help & Support
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-400 hover:cursor-pointer'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
