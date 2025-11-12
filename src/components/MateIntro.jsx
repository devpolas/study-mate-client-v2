export default function MateIntro() {
  const rating = 4;
  return (
    <div className='card min-w-xs bg-base-100 shadow-xl border border-primary-content hover:shadow-2xl transition duration-300'>
      <figure className='px-6 pt-6'>
        <img
          src='https://i.ibb.co.com/nT9TXxz/Polas-CB.jpg'
          alt='profile image'
          className='rounded-full w-48 h-48 object-cover border-4 border-primary'
        />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title text-2xl font-bold'>Polas Chandra Barmon</h2>
        <p className='text-gray-500 text-xl'>Mechanical</p>
        <div className='badge badge-outline my-2 text-sm'>Expert</div>
        <div className='rating my-2'>
          {[...Array(5)].map((_, i) => (
            <input
              key={i}
              type='radio'
              name='rating'
              className='mask mask-star-2 bg-yellow-400'
              checked={i < rating}
              readOnly
            />
          ))}
          {rating === 0 && (
            <span className='text-xs text-gray-400 ml-2'>No rating yet</span>
          )}
        </div>

        <div className='card-actions'>
          <button className='btn btn-primary'>View Profile</button>
        </div>
      </div>
    </div>
  );
}
