import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Computer Science Student",
      text: "StudyMate helped me find the perfect study partner for my Data Structures course. We now study weekly and our grades improved!",
      rating: 5,
      avatar: "/avatars/alice.jpg",
    },
    {
      name: "Michael Lee",
      role: "Engineering Student",
      text: "The platform made studying much more interactive and fun. I love organizing sessions and collaborating locally.",
      rating: 4,
      avatar: "/avatars/michael.jpg",
    },
    {
      name: "Sara Khan",
      role: "Biology Student",
      text: "I can track my study progress and find peers in my area. StudyMate is a game-changer for collaborative learning.",
      rating: 5,
      avatar: "/avatars/sara.jpg",
    },
  ];

  return (
    <section className='bg-white py-20'>
      <div className='mx-auto px-6 max-w-7xl text-center'>
        <h2 className='font-bold text-gray-800 text-3xl'>What Our Users Say</h2>
        <p className='mx-auto mt-4 max-w-2xl text-gray-600 text-lg'>
          Real feedback from students who improved their learning experience
          with StudyMate.
        </p>

        <div className='gap-8 grid sm:grid-cols-2 lg:grid-cols-3 mt-12'>
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className='hover:shadow-lg border border-gray-200 transition-shadow duration-300'
            >
              <CardHeader className='flex items-center gap-4'>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className='border rounded-full w-12 h-12 object-cover'
                />
                <div className='text-left'>
                  <CardTitle className='font-semibold text-gray-800'>
                    {t.name}
                  </CardTitle>
                  <p className='text-gray-500 text-sm'>{t.role}</p>
                </div>
              </CardHeader>
              <CardContent className='text-gray-600'>
                <p>{t.text}</p>
                <div className='flex gap-1 mt-2'>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className='text-yellow-400' size={18} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
