import { useLoaderData } from "react-router";
import Mate from "../components/Mate";

export default function PartnerDetailsPage() {
  const mateData = useLoaderData();
  const user = mateData.data.user;

  return (
    <div className='flex flex-col sm:flex-row justify-center-safe items-center sm:items-stretch gap-8 pt-8'>
      <div className='flex flex-col justify-center md:justify-start'>
        <div>
          <img
            className='rounded-md w-56 lg:w-64 xl:w-72 object-cover'
            src={user?.image}
            alt='profile picture'
          />
          <div className='flex flex-col gap-2 pt-4'>
            <h3>
              <span className='text-xl sm:text-2xl font-semibold'>Email:</span>{" "}
              <span className='text-lg sm:text-xl'>{user?.email}</span>
            </h3>

            <h3>
              <span className='text-xl sm:text-2xl font-semibold'>
                Ratings:
              </span>{" "}
              <span className='text-lg sm:text-xl'>{user?.ratingAverage}</span>
            </h3>
          </div>
        </div>
      </div>
      <Mate user={user} />
    </div>
  );
}
