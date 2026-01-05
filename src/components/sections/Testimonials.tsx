import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Computer Science Student",
      text: "StudyMate helped me find the perfect study partner for my Data Structures course. We now study weekly and our grades improved!",
      rating: 5,
      avatar: "https://i.ibb.co.com/fG1ySqBt/2.webp",
    },
    {
      name: "Michael Lee",
      role: "Engineering Student",
      text: "The platform made studying much more interactive and fun. I love organizing sessions and collaborating locally.",
      rating: 4,
      avatar: "https://i.ibb.co.com/xq56qHSw/polas-cb.jpg",
    },
    {
      name: "Sara Khan",
      role: "Biology Student",
      text: "I can track my study progress and find peers in my area. StudyMate is a game-changer for collaborative learning.",
      rating: 5,
      avatar:
        "https://i.ibb.co.com/JTpLPmJ/Hailuo-Image-give-me-a-female-vet-expert-pr-438004477179936770.png",
    },
  ];

  return (
    <section className='bg-accent py-16'>
      <div className='mx-auto px-6 max-w-7xl text-center'>
        <h2 className='font-bold text-muted-foreground text-3xl sm:text-4xl'>
          What Our Users Say
        </h2>
        <p className='mx-auto mt-4 max-w-2xl text-ring text-lg'>
          Real feedback from students who improved their learning experience
          with StudyMate.
        </p>

        <div className='gap-8 grid sm:grid-cols-2 lg:grid-cols-3 mt-12'>
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className='hover:shadow-lg border transition-shadow duration-300'
            >
              <CardHeader className='flex items-center gap-4'>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className='border rounded-full w-14 h-14 object-cover'
                />
                <div className='text-left'>
                  <CardTitle className='font-semibold text-muted-foreground'>
                    {t.name}
                  </CardTitle>
                  <p className='text-ring text-sm'>{t.role}</p>
                </div>
              </CardHeader>
              <CardContent className='text-ring'>
                <p>{t.text}</p>
                <div className='flex justify-center gap-1 mt-2'>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className='text-destructive' size={18} />
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
