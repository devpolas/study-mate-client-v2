import { useState } from "react";
import AllFriends from "../components/AllFriends";
import ProfileInfo from "../components/ProfileInfo";

export default function ProfilePage() {
  const [isClick, setIsClick] = useState(false);
  return (
    <div className='grid place-content-center'>
      <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-12 p-6 md:p-12 lg:p-16'>
        <div className='flex flex-col gap-10 justify-center md:justify-start'>
          <div>
            <img
              className='rounded-md w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 object-cover'
              src='https://i.ibb.co.com/nT9TXxz/Polas-CB.jpg'
              alt='Polas-CB'
            />
            <div className='flex flex-col gap-2 pt-4'>
              <h3>
                <span className='text-xl sm:text-2xl font-semibold'>
                  Email:
                </span>{" "}
                <span className='text-lg sm:text-xl'>dpi.polas@gmail.com</span>
              </h3>

              <h3>
                <span className='text-xl sm:text-2xl font-semibold'>
                  Ratings:
                </span>{" "}
                <span className='text-lg sm:text-xl'>4.8</span>
              </h3>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <button
              onClick={() => setIsClick(false)}
              className='btn btn-soft btn-primary'
            >
              All Info
            </button>
            <button
              onClick={() => setIsClick(true)}
              className='btn btn-soft btn-accent'
            >
              Friends
            </button>
          </div>
        </div>

        {isClick ? <AllFriends /> : <ProfileInfo />}
      </div>
    </div>
  );
}
