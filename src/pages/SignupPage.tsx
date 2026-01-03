import DatePicker from "@/components/datapicker/DatePicker";
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
import { Link } from "react-router";

export default function SignupPage() {
  return (
    <div className='flex justify-end w-full h-full'>
      <Card className='flex w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Create new account</CardTitle>
          <CardDescription>
            Enter your credentials below to create your account
          </CardDescription>
          <CardAction>
            <Link to='/signin'>
              <Button className='hover:cursor-pointer' variant='link'>
                Signin
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='gap-2 grid'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Full Name'
                  required
                />
              </div>
              <div className='gap-2 grid'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  name='email'
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
              </div>

              <div className='gap-2 grid'>
                <Label htmlFor='email'>Date of Birth</Label>
                <DatePicker />
              </div>

              <div className='gap-2 grid'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='inline-block ml-auto text-sm hover:underline underline-offset-4'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  required
                  placeholder='Enter Your Password'
                />
              </div>
              <div className='gap-2 grid'>
                <Label htmlFor='password'>Confirm Password</Label>
                <Input
                  name='confirmPassword'
                  id='password'
                  type='password'
                  placeholder='Confirm Your Password'
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button type='submit' className='w-full'>
            Signup
          </Button>
          <Button variant='outline' className='w-full'>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
