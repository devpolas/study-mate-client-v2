import { Link } from "react-router";

export default function MateIntro({
  _id,
  image,
  name,
  subject,
  experienceLevel,
  ratingAverage,
}) {
  return (
    <div className='card min-w-xs glass-effect shadow-xl border border-primary-content hover:shadow-2xl transition duration-300'>
      <figure className='px-6 pt-6'>
        <img
          src={image}
          alt='profile image'
          className='rounded-full w-48 h-48 object-cover border-4 border-primary'
        />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title text-2xl font-bold'>{name}</h2>
        <p className='text-gray-500 text-xl'>{subject}</p>
        <div className='badge badge-outline my-2 text-sm'>
          {experienceLevel}
        </div>
        <div className='rating'>
          {ratingAverage !== 0 &&
            [...Array(5)].map((_, i) => (
              <input
                key={i}
                disabled
                type='radio'
                name='rating'
                className='mask mask-star-2 bg-yellow-400'
                checked={i < ratingAverage}
                readOnly
              />
            ))}
        </div>
        {ratingAverage === 0 && (
          <span className='text-xs text-gray-400'>No rating yet</span>
        )}
        <div className='card-actions pt-2'>
          <Link to={`/partner/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
