import ReviewCard from "./ReviewCard";

const reviews = [
  {
    name: "Aisha Rahman",
    occupation: "Mathematics Teacher",
    image: "https://i.ibb.co/profile-example.jpg",
    description: "Aisha explains concepts very clearly and makes learning fun.",
    time: "2 days ago",
  },
  {
    name: "John Doe",
    occupation: "Physics Professor",
    image: "https://i.ibb.co/another-profile.jpg",
    description: "John is very patient and thorough with his explanations.",
    time: "5 days ago",
  },
  {
    name: "John Doe",
    occupation: "Physics Professor",
    image: "https://i.ibb.co/another-profile.jpg",
    description: "John is very patient and thorough with his explanations.",
    time: "5 days ago",
  },
];

export default function Reviews() {
  return (
    <div>
      <div className='flex flex-wrap justify-center pt-8'>
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </div>
    </div>
  );
}
