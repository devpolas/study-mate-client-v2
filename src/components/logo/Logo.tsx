import logo from "@/assets/study_mate.webp";
export default function Logo() {
  return (
    <div className='flex flex-row items-center gap-x-2 hover:cursor-pointer'>
      <img className='w-7 h-7' src={logo} alt='study mate logo' />
      <h1 className='hidden lg:block hover:text-ring text-xl'>Study Mate</h1>
    </div>
  );
}
