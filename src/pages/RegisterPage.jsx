import { useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { RiQuestionLine } from "react-icons/ri";
import { useState } from "react";
import SignWith from "../components/SignWith";
import useAuthContext from "../context/useAuthContext";
import { uploadImageToImgBB } from "../http/imageUpload";
import {
  emailValidation,
  nameValidation,
  passwordValidator,
} from "../utils/validator";

const ratingAverage = Number(Math.random() * 4 + 1).toFixed(1);
const IMAGE_SIZE_LIMIT = 2 * 1024 * 1024;

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    signup,
    isError,
    setIsError,
    setIsSubmitting,
    isSubmitting,
    socialLogin,
  } = useAuthContext();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Handle image selection
  function handleImageChange(e) {
    setImageError("");
    const file = e.target.files[0];
    if (!file) return setPickedImage(null);

    if (file.size > IMAGE_SIZE_LIMIT) {
      setImageError("Image size must be less than 2MB.");
      setPickedImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPickedImage(reader.result);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormErrors({});
    setIsError("");

    const formData = new FormData(e.currentTarget);
    const { name, email, password, passwordConfirm, image } =
      Object.fromEntries(formData);
    const errors = {};

    const validName = nameValidation(name);
    const validEmail = emailValidation(email);
    const validPassword = passwordValidator(password);

    if (validName !== true) errors.name = validName;
    if (validEmail !== true) errors.email = validEmail;
    if (validPassword !== true) errors.password = validPassword;
    if (password !== passwordConfirm)
      errors.passwordConfirm = "Passwords do not match.";
    if (!image || image.size > IMAGE_SIZE_LIMIT)
      errors.image = "Image is required and must be <2MB.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      const imageUrl = await uploadImageToImgBB(name, image);
      await signup({
        name,
        email,
        password,
        passwordConfirm,
        image: imageUrl,
        ratingAverage,
      });
      navigate("/");
      setIsSubmitting(false);
    } catch (err) {
      setIsError(err?.message || "An occurred Error!");
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex justify-center items-center'>
      <div>
        <fieldset className='fieldset bg-base-200 border-base-300 shadow-md rounded-box w-xs border p-4'>
          <legend className='fieldset-legend text-lg'>
            {isSubmitting ? "Processing..." : "Signup"}
          </legend>

          {isError && (
            <p className='label text-xs text-center pt-2 text-red-700'>
              {isError}
            </p>
          )}

          {/* Full Name */}
          <div className='flex flex-row gap-1 items-center'>
            <label htmlFor='name' className='label text-sm'>
              Full Name
            </label>
            <div className='tooltip tooltip-bottom' data-tip='3-30 characters'>
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
          {formErrors.name && (
            <p className='label text-xs text-red-700'>{formErrors.name}</p>
          )}

          {/* Email */}
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
          {formErrors.email && (
            <p className='label text-xs text-red-700'>{formErrors.email}</p>
          )}

          {/* Password */}
          <div className='flex flex-row gap-1 items-center'>
            <label htmlFor='password' className='label text-sm'>
              Password
            </label>
            <div
              className='tooltip tooltip-bottom'
              data-tip='6-30 chars with uppercase/lowercase'
            >
              <RiQuestionLine className='hover:cursor-pointer text-sm hover:text-green-700' />
            </div>
          </div>
          <div className='w-full flex flex-row gap-1'>
            <input
              required
              name='password'
              type={passwordVisible ? "text" : "password"}
              className='input text-sm w-11/12'
              placeholder='Enter Password'
            />
            <button
              type='button'
              onClick={() => setPasswordVisible((p) => !p)}
              className={`btn ${
                passwordVisible ? "text-red-600" : "text-green-700"
              }`}
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
          {formErrors.password && (
            <p className='label text-xs text-red-700'>{formErrors.password}</p>
          )}

          {/* Confirm Password */}
          <label htmlFor='passwordConfirm' className='label text-sm'>
            Confirm Password
          </label>
          <div className='w-full flex flex-row gap-1'>
            <input
              required
              name='passwordConfirm'
              type={confirmPasswordVisible ? "text" : "password"}
              className='input text-sm w-11/12'
              placeholder='Confirm Password'
            />
            <button
              type='button'
              onClick={() => setConfirmPasswordVisible((p) => !p)}
              className={`btn ${
                confirmPasswordVisible ? "text-red-600" : "text-green-700"
              }`}
            >
              {confirmPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
          {formErrors.passwordConfirm && (
            <p className='label text-xs text-red-700'>
              {formErrors.passwordConfirm}
            </p>
          )}

          {/* Image */}
          <label htmlFor='image' className='label text-sm'>
            Pick a profile image
          </label>
          <input
            required
            name='image'
            onChange={handleImageChange}
            type='file'
            className='file-input'
          />
          <label className='label text-sm'>Max size 2MB</label>
          {imageError && (
            <p className='label text-sm text-red-700'>{imageError}</p>
          )}
          {pickedImage && (
            <img
              src={pickedImage}
              alt='preview'
              className='w-20 h-20 p-1 border-2 border-gray-300 rounded-sm'
            />
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-secondary btn-outline mt-4 shadow'
          >
            Signup
          </button>

          <p className='text-sm pt-2 text-center'>
            Already have an account?
            <button
              type='button'
              className='text-sm text-primary font-semibold ml-1 cursor-pointer'
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>

          <SignWith onClick={() => socialLogin()} icon={<FcGoogle />}>
            Sign up with Google
          </SignWith>
        </fieldset>
      </div>
    </form>
  );
}
