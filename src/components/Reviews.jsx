import ReviewCard from "./ReviewCard";

const reviews = [
  {
    name: "Aisha Rahman",
    occupation: "Mathematics Teacher",
    image: "https://i.ibb.co.com/KxRQQfSR/reviewer1.webp",
    description: "Aisha explains concepts very clearly and makes learning fun.",
    time: "2 month ago",
  },
  {
    name: "John Doe",
    occupation: "Physics Professor",
    image: "https://i.ibb.co.com/4ZxmMxfj/reviewer2.webp",
    description: "John is very patient and thorough with his explanations.",
    time: "5 month ago",
  },
  {
    name: "Lina Gomez",
    occupation: "English Teacher",
    image: "https://i.ibb.co.com/SSFWPrz/reviewer3.webp",
    description:
      "Sara connects lessons with nature, making learning memorable.",
    time: "15 days ago",
  },
];

export default function Reviews() {
  return (
    <>
      <h1 className='text-3xl sm:text-5xl pt-10 sm:pt-20 pb-8 sm:pb-12 font-bold text-primary text-center'>
        Review's
      </h1>
      <div className='flex flex-wrap justify-center'>
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </div>
    </>
  );
}
