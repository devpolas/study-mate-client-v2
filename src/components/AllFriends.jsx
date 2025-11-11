import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiLink } from "react-icons/hi";

export default function AllFriends() {
  return (
    <div className='tabs tabs-lift'>
      <label className='tab'>
        <input type='radio' name='my_tabs_4' />
        <HiOutlineUserGroup />
        <span className='text-xs md:text-sm'>Friends</span>
      </label>
      <div className='tab-content bg-base-100 border-base-300 p-6'>
        All Friends
      </div>
      <label className='tab'>
        <input type='radio' name='my_tabs_4' defaultChecked />
        <HiOutlineUserAdd />
        <span className='text-xs md:text-sm'>Requests</span>
      </label>
      <div className='tab-content bg-base-100 border-base-300 p-6'>
        All Send Friend Requests
      </div>
      <label className='tab'>
        <input type='radio' name='my_tabs_4' />
        <HiLink />
        <span className='text-xs md:text-sm'>Send Request</span>
      </label>
      <div className='tab-content bg-base-100 border-base-300 p-6'>
        All Send Request
      </div>
    </div>
  );
}
