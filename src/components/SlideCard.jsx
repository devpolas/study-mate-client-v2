export default function SlideCard() {
  return (
    <div className='flex glass-effect rounded-md border border-primary-content flex-row gap-1 sm:gap-2 md:gap-3 lg:gap-4 p-4 max-w-full shadow-lg'>
      <div className='flex flex-col gap-4'>
        <img
          className='rounded-md h-[25vh] sm:h-[35vh] object-cover'
          src='https://i.ibb.co.com/nT9TXxz/Polas-CB.jpg'
          alt='Polas-CB'
        />
        <button className='btn btn-primary btn-outline flex sm:hidden'>
          Details
        </button>
      </div>
      <div className='flex flex-col justify-around pl-4 w-1/2 sm:w-2/3'>
        <h3 className='text-sm sm:text-lg md:text-2xl lg:text-4xl font-semibold'>
          Polas Chandra Barmon
        </h3>
        <div className='text-sm sm:text-lg'>
          <p>
            Rating: <strong>4.8</strong>
          </p>
          <p>
            <span className='flex flex-col sm:flex-row'>
              <span>Skill: </span>{" "}
              <span>
                <strong>Expert</strong>
              </span>
            </span>
          </p>
          <p>
            <span className='flex flex-col sm:flex-row'>
              <span>Specialization: </span>{" "}
              <span>
                <strong>Mechanical</strong>
              </span>
            </span>
          </p>
          <p>
            <span className='flex flex-col sm:flex-row'>
              <span>Location: </span>{" "}
              <span>
                <strong>Dhaka, Bangladesh</strong>
              </span>
            </span>
          </p>
          <p>
            Status: <strong>Online</strong>
          </p>
          <p className='text-xs sm:text-sm md:text-lg'>
            <strong>Morning 6 AM - 12 PM</strong>
          </p>
        </div>

        <button className='btn btn-primary btn-outline mt-4 w-max self-end hidden sm:flex'>
          Details
        </button>
      </div>
    </div>
  );
}
