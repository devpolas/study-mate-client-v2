import NavLinkWithIcon from "./NavLinkWithIcon";
import { GrHomeRounded } from "react-icons/gr";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";
export default function NavLinks() {
  return (
    <div className='flex-row gap-8 items-center hidden md:flex'>
      <NavLinkWithIcon path='/' icon={<GrHomeRounded />}>
        Home
      </NavLinkWithIcon>
      <NavLinkWithIcon path='/find-partner' icon={<MdPersonSearch />}>
        Find Partner
      </NavLinkWithIcon>
      <NavLinkWithIcon path='/profile' icon={<BsPersonBoundingBox />}>
        Profile
      </NavLinkWithIcon>
    </div>
  );
}
