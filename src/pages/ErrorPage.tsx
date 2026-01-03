import { Link } from "react-router";
export default function ErrorPage() {
  return (
    <div className='flex flex-col justify-center items-center h-[70vh] text-center'>
      <h1 className='mb-4 font-bold text-error text-5xl sm:text-7xl md:text-9xl'>
        404
      </h1>
      <h2 className='mb-2 font-semibold text-xl sm:text-2xl md:text-3xl'>
        Oops! Page not found
      </h2>
      <p className='mb-6 text-gray-600'>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to='/' className='btn btn-primary'>
        Go Home
      </Link>
    </div>
  );
}
