import { GiBookAura } from "react-icons/gi";
export default function Logo() {
  return (
    <div className='w-20 sm:w-22'>
      <div className='flex flex-col justify-center items-center border border-secondary-content p-1 rounded-md'>
        <GiBookAura className='text-2xl sm:text-4xl' />
        <p className='text-[10px] sm::text-xs font-bold'>STUDY MATE</p>
      </div>
    </div>
  );
}
