import { FcGoogle } from "react-icons/fc";
import { Button } from "../../ui/button";

export default function LoginWithGoogle() {
  return (
    <Button variant='outline' className='w-full hover:cursor-pointer'>
      <FcGoogle /> Login with Google
    </Button>
  );
}
