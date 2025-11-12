export default function HeroSection() {
  return (
    <div className='py-8'>
      <div
        className='hero min-h-[50vh]'
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/LDD4db4B/group-image.webp)",
          borderRadius: "10px",
        }}
      >
        <div className='hero-overlay rounded-[10px] bg-linear-to-r/increasing from-indigo-500/40 to-teal-400/50'></div>
        <div className='hero-content text-neutral-content text-center'>
          <div className='w-full'>
            <h1 className='mb-5 text-2xl sm:text-3xl md:text-5xl font-bold'>
              Hello Student's
            </h1>
            <p className='mb-5 text-sm sm:text-lg md:text-xl text-shadow-base-300'>
              Meet Study Mate, your smart study partner that keeps you
              organized, motivated, and ready to achieve your goals. Struggling
              to stay on track? Study Mate helps you plan better, focus deeper,
              and learn smarter — anytime, anywhere. Turn your study time into
              success time with a companion designed to make learning easier,
              efficient, and enjoyable. Study Mate — where smart learning
              begins.
            </p>
            <button className='btn btn-primary btn-soft'>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
