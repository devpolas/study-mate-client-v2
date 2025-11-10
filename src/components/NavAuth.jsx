import { Link } from "react-router";

export default function NavAuth() {
  return (
    <div>
      <div className='flex flex-row gap-2'>
        <Link to='/login' class='btn btn-outline btn-info'>
          Login
        </Link>
        <Link to='/signup' class='btn btn-outline btn-primary'>
          Signup
        </Link>
      </div>
    </div>
  );
}
