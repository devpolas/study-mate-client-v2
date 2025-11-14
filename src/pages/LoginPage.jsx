import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import SignWith from "../components/SignWith";
import useAuthContext from "../context/useAuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState(null);
  const { socialLogin, isLoading, setIsLoading, isError, setIsError, login } =
    useAuthContext();

  async function handelSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      setIsLoading(true);
      setIsError("");
      await login(data?.email, data?.password);
      if (!isError) {
        navigate(location?.state || "/");
      }
    } catch (error) {
      const msg = error?.message || error?.status || "An occurred Error!";
      setIsError(msg);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function handelSocialLogin() {
    setIsError("");
    try {
      await socialLogin();
      if (!isError) {
        navigate(location?.state || "/");
      }
    } catch (error) {
      const msg = error?.message || error?.status || "An occurred Error!";
      setIsError(msg);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-[70vh]'>
      <form onSubmit={(e) => handelSubmit(e)} className='w-full max-w-xs'>
        <div>
          <fieldset className='fieldset bg-base-200 border-base-300 shadow-md rounded-box w-xs border p-4'>
            <legend className='fieldset-legend w-full text-lg'>
              {isLoading ? "Processing....." : "Login"}
            </legend>

            <label className='label text-center pt-2 text-red-700'>
              {isError ? isError : ""}
            </label>

            <label htmlFor='email' className='label text-sm'>
              Email
            </label>
            <input
              onChange={(e) => setForgetPasswordEmail(e.target.value)}
              required
              name='email'
              type='email'
              className='input text-sm'
              placeholder='Email'
            />

            <label htmlFor='password' className='label text-sm'>
              Password
            </label>

            <div className='w-full flex flex-row gap-1'>
              <input
                required
                name='password'
                type={`${passwordVisible ? "text" : "password"}`}
                className='input text-sm w-11/12'
                placeholder='Enter Your Password'
              />
              <button
                type='button'
                onClick={() => setPasswordVisible((pre) => !pre)}
                className={`btn ${
                  passwordVisible ? "text-red-600" : "text-green-700"
                }`}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>

            <label
              htmlFor='password'
              className='label text-sm text-green-600 hover:text-red-600 mt-2'
            >
              <Link to='/forget-password' state={forgetPasswordEmail}>
                Forget Password?
              </Link>
            </label>

            <button
              disabled={isLoading}
              type='submit'
              className='btn btn-primary btn-outline mt-2 text-lg'
            >
              Login
            </button>

            <p className='text-sm pt-2 text-center'>
              Create an account?{" "}
              <Link
                className='text-sm text-secondary ml-1 font-semibold'
                to='/signup'
              >
                Signup
              </Link>{" "}
            </p>
            <SignWith onClick={() => handelSocialLogin()} icon={<FcGoogle />}>
              Sign in with Google
            </SignWith>
          </fieldset>
        </div>
      </form>
    </div>
  );
}
