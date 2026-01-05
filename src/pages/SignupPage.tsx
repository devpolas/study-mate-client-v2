import DatePicker from "@/components/date-picker/DatePicker";
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
import { Link, useLocation, useNavigate } from "react-router";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import type { SignupCredentials } from "@/types/auth";

export default function SignupPage() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const password = useWatch({ name: "password", control });

  async function handleSignup(formData: SignupCredentials) {
    const response = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.passwordConfirm,
      formData.birthdate
    );

    if (response.payload) {
      navigate("/complete-profile", {
        replace: true,
        state: location.state || "/",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <div className='flex justify-end w-full h-full'>
        <Card className='flex w-full max-w-sm'>
          <CardHeader>
            <CardTitle>Create new account</CardTitle>
            <CardDescription>
              Enter your credentials below to create your account
            </CardDescription>
            <CardAction>
              <Link to='/signin'>
                <Button
                  type='button'
                  className='hover:cursor-pointer'
                  variant='link'
                >
                  Signin
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div>
              <div className='flex flex-col gap-6'>
                <div className='gap-2 grid'>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    type='text'
                    placeholder='Full Name'
                    {...register("name", {
                      required: "full Name is required!",
                      minLength: {
                        value: 3,
                        message: "full name minimum 3 character!",
                      },
                      maxLength: {
                        value: 50,
                        message: "full name max 50 character!",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className='text-red-500 text-sm'>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className='gap-2 grid'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='username@example.com'
                    {...register("email", {
                      required: "email is required!",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "email not valid!",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='gap-2 grid'>
                  <Label htmlFor='email'>Date of Birth</Label>
                  <Controller
                    name='birthdate'
                    control={control}
                    rules={{ required: "Date of birth is required" }}
                    render={({ field }) => (
                      <DatePicker onChange={field.onChange} />
                    )}
                  />

                  {errors.birthdate && (
                    <p className='text-red-500 text-sm'>
                      {errors.birthdate.message}
                    </p>
                  )}
                </div>

                <div className='gap-2 grid'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    {...register("password", {
                      required: "password is required!",
                      minLength: {
                        value: 6,
                        message: "password minimum 6 character!",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
                        message:
                          "password at least one (uppercase and lowercase letter, special character, number)!",
                      },
                    })}
                    placeholder='Enter Your Password'
                  />
                  {errors.password && (
                    <p className='text-red-500 text-sm'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className='gap-2 grid'>
                  <Label htmlFor='password'>Confirm Password</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    placeholder='Confirm Your Password'
                    {...register("passwordConfirm", {
                      required: "please confirm your password!",
                      validate: (value) =>
                        value === password || "password doesn't match!",
                    })}
                  />
                  {errors.passwordConfirm && (
                    <p className='text-red-500 text-sm'>
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-2'>
            <Button type='submit' className='w-full hover:cursor-pointer'>
              Signup
            </Button>
            <LoginWithGoogle />
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
