import { FcGoogle } from "react-icons/fc";
import { Button } from "../../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { appAuth } from "@/firebase/firebase.config";

export default function LoginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { socialLogin } = useAuth();
  async function handleSocialLogin() {
    const response = await signInWithPopup(appAuth, provider);
    const token = await response.user.getIdToken();
    if (token) {
      socialLogin(token);
    }
  }
  return (
    <Button
      onClick={handleSocialLogin}
      variant='outline'
      className='w-full hover:cursor-pointer'
      type='button'
    >
      <FcGoogle /> Login with Google
    </Button>
  );
}
