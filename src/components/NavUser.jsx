import { Link, useNavigate } from "react-router";
import useAuthContext from "../context/useAuthContext";

export default function NavUser() {
  const { logout, authUser } = useAuthContext();
  const navigate = useNavigate();

  async function handelLogout() {
    await logout();
    navigate("/login");
  }
  return (
    <div className='dropdown dropdown-end relative'>
      <div tabIndex={0} role='button'>
        <img
          className='w-12 h-12 mr-4 rounded-full border border-primary cursor-pointer'
          src={authUser?.image}
          alt='Profile Picture'
        />
      </div>
      <ul
        tabIndex='-1'
        className='dropdown-content menu bg-base-100 border border-primary-content rounded-md z-10 w-52 p-4 shadow-sm flex justify-center items-center gap-4 absolute top-16'
      >
        <Link
          to={"/profile"}
          className='text-green-600 text-sm font-semibold hover:underline'
        >
          My Profile
        </Link>

        <button
          onClick={() => handelLogout()}
          className='btn btn-error btn-outline btn-sm'
        >
          Logout
        </button>
      </ul>
    </div>
  );
}
