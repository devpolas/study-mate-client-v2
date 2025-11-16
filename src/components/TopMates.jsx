import MateIntro from "./MateIntro";

export default function TopMates({ data = [] }) {
  const topMates = data.slice(0, 4);
  return (
    <>
      <h1 className='text-3xl sm:text-5xl pt-10 sm:pt-20 pb-12 sm:pb-12 font-bold text-primary text-center'>
        Top Study Partner's
      </h1>
      <div className='grid  gap-4 grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4'>
        {topMates.map((el) => (
          <MateIntro key={el._id} {...el} />
        ))}
      </div>
    </>
  );
}
