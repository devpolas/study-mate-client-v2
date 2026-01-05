import LoginWithGoogle from "@/components/button/social/LoginWithGoogle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import type { LoginCredentials } from "@/types/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginPage() {
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSignin(formData: LoginCredentials) {
    const response = await login(formData.email, formData.password);
    if (response.payload) {
      navigate(location.state?.from || "/");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignin)}
      className='flex justify-end w-full h-full'
    >
      <Card className='flex w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link state={location.state?.from || "/"} to='/signup'>
              <Button
                type='button'
                className='hover:cursor-pointer'
                variant='link'
              >
                Signup
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div>
            <div className='flex flex-col gap-6'>
              <div className='gap-2 grid'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='user@example.com'
                  {...register("email", { required: "email is required!" })}
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email.message}</p>
                )}
              </div>
              <div className='gap-2 grid'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='inline-block ml-auto text-xs sm:text-sm hover:underline underline-offset-4'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='Enter Your Password'
                  {...register("password", {
                    required: "password is required!",
                  })}
                />
                {errors.password && (
                  <p className='text-red-500 text-sm'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button type='submit' className='w-full hover:cursor-pointer'>
            Login
          </Button>
          <LoginWithGoogle />
        </CardFooter>
      </Card>
    </form>
  );
}
