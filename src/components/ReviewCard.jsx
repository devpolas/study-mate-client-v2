export default function ReviewCard({
  name,
  occupation,
  image,
  description,
  time,
}) {
  return (
    <div className='card w-full flex flex-col justify-center items-center max-w-md bg-base-100 shadow-md border border-base-200 hover:shadow-xl transition-all duration-300 m-4'>
      <div className='card-body'>
        <div className='flex items-center justify-center space-x-4'>
          <img
            src={image}
            alt={name}
            className='w-16 h-16 rounded-full object-cover border-2 border-primary'
          />
          <div>
            <h3 className='font-bold text-lg'>{name}</h3>
            <p className='text-sm text-gray-400'>{occupation}</p>
          </div>
        </div>

        {/* Review Description */}
        <p className='mt-4 text-gray-400 text-center'>{description}</p>

        <p className='text-xs text-gray-400 mt-2 text-center'>{time}</p>
      </div>
    </div>
  );
}
