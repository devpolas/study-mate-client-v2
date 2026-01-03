import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NavAuthButtons() {
  return (
    <div className='flex flex-row gap-2'>
      <Link to='/signin'>
        <Button
          size='default'
          className='font-semibold text-sm hover:cursor-pointer'
          variant='outline'
        >
          Signin
        </Button>
      </Link>
      <Link to='/signup'>
        <Button
          size='default'
          className='font-semibold text-sm hover:cursor-pointer'
          variant='secondary'
        >
          Signup
        </Button>
      </Link>
    </div>
  );
}
