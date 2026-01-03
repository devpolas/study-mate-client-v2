import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NavAuthButtons() {
  return (
    <div className='flex flex-row gap-1 md:gap-2'>
      <Link to='/signin'>
        <Button
          size='sm'
          className='font-semibold text-sm hover:cursor-pointer'
          variant='outline'
        >
          Signin
        </Button>
      </Link>
      <Link to='/signup'>
        <Button
          size='sm'
          className='font-semibold text-sm hover:cursor-pointer'
          variant='secondary'
        >
          Signup
        </Button>
      </Link>
    </div>
  );
}
