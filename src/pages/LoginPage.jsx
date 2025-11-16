import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import SignWith from "../components/SignWith";
import useAuthContext from "../context/useAuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { socialLogin, login, isError, setIsError } = useAuthContext();

  // Handle regular email/password login
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    try {
      setIsSubmitting(true);
      setIsError("");
      const response = await login(email, password);
      if (response) {
        navigate(location?.state?.from || "/", { replace: true });
      }
    } catch (error) {
      setIsError(error?.message || "An occurred Error!");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle Google login
  async function handleSocialLogin() {
    try {
      setIsSubmitting(true);
      setIsError("");
      const result = await socialLogin();
      if (result) {
        navigate(location?.state?.from || "/", { replace: true });
      }
    } catch (error) {
      setIsError(error?.message || "An occurred Error!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-[70vh]'>
      <form onSubmit={handleSubmit} className='w-full max-w-xs'>
        <fieldset className='fieldset bg-base-200 border-base-300 shadow-md rounded-box w-xs border p-4'>
          <legend className='fieldset-legend w-full text-lg'>
            {isSubmitting ? "Processing..." : "Login"}
          </legend>

          {isError && (
            <p className='label text-center pt-2 text-red-700'>{isError}</p>
          )}

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
              type={passwordVisible ? "text" : "password"}
              className='input text-sm w-11/12'
              placeholder='Enter Your Password'
            />
            <button
              type='button'
              onClick={() => setPasswordVisible((prev) => !prev)}
              className={`btn ${
                passwordVisible ? "text-red-600" : "text-green-700"
              }`}
              aria-label='Toggle password visibility'
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>

          <label className='label text-sm text-green-600 hover:text-red-600 mt-2'>
            <Link to='/forget-password' state={forgetPasswordEmail}>
              Forget Password?
            </Link>
          </label>

          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-primary btn-outline mt-2 text-lg'
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className='text-sm pt-2 text-center'>
            Create an account?{" "}
            <button
              type='button'
              onClick={() => {
                navigate("/signup", { replace: true });
                setIsError("");
              }}
              className='text-sm text-secondary ml-1 font-semibold hover:cursor-pointer'
            >
              Signup
            </button>
          </p>

          <SignWith
            onClick={handleSocialLogin}
            icon={<FcGoogle />}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in with Google"}
          </SignWith>
        </fieldset>
      </form>
    </div>
  );
}
