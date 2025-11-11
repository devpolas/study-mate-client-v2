import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import SignWith from "../components/SignWith";
import { RiQuestionLine } from "react-icons/ri";

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const [imageError, setImageError] = useState("");

  // handel the image picker
  function handleImageChange(e) {
    setImageError("");
    setPickedImage(null);

    const imageSize = 2 * 1024 * 1024;
    const image = e.target.files[0];
    if (!image) {
      setPickedImage(null);
      return;
    }
    if (image.size > imageSize) {
      setImageError("Your Picked Image Incorrect Size!");
    }
    setPickedImage("");

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(image);
  }

  return (
    <form className='flex justify-center items-center '>
      <div>
        <fieldset className='fieldset bg-base-200 border-base-300 shadow-md rounded-box w-xs border p-4'>
          <legend className='fieldset-legend text-lg'>Signup</legend>

          <label className='label text-xs text-center pt-2 text-red-700'>
            {/* {state?.errors?.general} */}
          </label>

          <div className='flex flex-row gap-1 items-center'>
            <label htmlFor='password' className='label text-sm'>
              Full Name
            </label>
            <div
              className='tooltip tooltip-bottom'
              data-tip='Full Name at least 3 characters or less than 30 characters!'
            >
              <RiQuestionLine className='hover:cursor-pointer text-sm hover:text-green-700' />
            </div>
          </div>
          <input
            required
            name='name'
            type='text'
            className='input text-sm'
            placeholder='Enter Your Full Name'
          />
          <label className='label text-xs text-red-700'>
            {/* {state?.errors?.name} */}
          </label>

          <label htmlFor='email' className='label text-sm'>
            Email
          </label>
          <input
            required
            name='email'
            type='email'
            className='input text-sm'
            placeholder='Enter Your Email'
          />

          <label className='label text-xs text-red-700'>
            {/* {state?.errors?.email} */}
          </label>

          <div className='flex flex-row gap-1 items-center'>
            <label htmlFor='password' className='label text-sm'>
              Password
            </label>
            <div
              className='tooltip tooltip-bottom'
              data-tip='Password must be contain an Uppercase and a Lowercase letter at least 6 and max 30 characters!'
            >
              <RiQuestionLine className='hover:cursor-pointer text-sm hover:text-green-700' />
            </div>
          </div>
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

          <label className='label text-xs text-red-700'>
            {/* {state?.errors?.password} */}
          </label>

          <label htmlFor='passwordConfirm' className='label text-sm'>
            Confirm Password
          </label>
          <div className='w-full flex flex-row gap-1'>
            <input
              required
              name='passwordConfirm'
              type={`${confirmPasswordVisible ? "text" : "password"}`}
              className='input text-sm w-11/12'
              placeholder='Confirm Your Password'
            />
            <button
              type='button'
              onClick={() => setConfirmPasswordVisible((pre) => !pre)}
              className={`btn ${
                confirmPasswordVisible ? "text-red-600" : "text-green-700"
              }`}
            >
              {confirmPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <label className='label text-xs text-red-700'></label>

          <label htmlFor='image' className='label text-sm'>
            Pick a image
          </label>
          <input
            required
            name='image'
            onChange={handleImageChange}
            type='file'
            className='file-input'
          />
          <label className='label text-sm'>Max size 2MB</label>
          <label className='label text-sm text-red-700'>
            {imageError ? imageError : ""}
          </label>

          {pickedImage ? (
            <img
              className='w-20 h-20 p-1 border-2 border-gray-300 rounded-sm'
              src={pickedImage}
              alt='user input profile picture'
            />
          ) : (
            ""
          )}

          <button
            type='submit'
            className='btn btn-secondary btn-outline mt-4 shadow'
          >
            Signup
          </button>

          <p className='text-sm pt-2 text-center'>
            You have already an account?
            <Link
              className='text-sm text-primary font-semibold ml-1'
              to='/login'
            >
              Login
            </Link>
          </p>

          <SignWith icon={<FcGoogle />}>Sign up with Google</SignWith>
        </fieldset>
      </div>
    </form>
  );
}
