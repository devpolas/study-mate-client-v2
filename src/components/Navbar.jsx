import NavAuth from "./NavAuth";
import NavLinks from "./NavLinks";
import Logo from "./ui/Logo";

export default function Navbar() {
  return (
    <div className='py-4 flex flex-row justify-between shadow bg-transparent px-4 h-20'>
      <Logo />
      <NavLinks />
      <NavAuth />
    </div>
  );
}
