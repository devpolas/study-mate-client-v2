import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const slides = [
  {
    title: "Connect With Study Partners",
    description:
      "Find students with similar subjects, learning styles, or nearby locations to collaborate efficiently.",
    image: "https://i.ibb.co.com/v4ry9Mqf/3.webp",
  },
  {
    title: "Organize Your Learning",
    description:
      "Create study schedules, track sessions, and stay consistent with your learning goals.",
    image: "https://i.ibb.co.com/jv3HZDd8/1.webp",
  },
  {
    title: "Achieve Your Academic Goals",
    description:
      "Set objectives, collaborate with peers, and reach success faster together.",
    image: "https://i.ibb.co.com/Vcf84xjw/45.webp",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className='relative flex items-center min-h-[60vh] overflow-hidden glass'>
      <div className='z-10 relative items-center gap-12 grid lg:grid-cols-2 mx-auto px-6 py-16 max-w-7xl'>
        <div className='space-y-6 lg:text-left text-center'>
          <h1 className='font-bold text-muted-foreground text-3xl sm:text-4xl leading-tight transition-all duration-700'>
            {slides[current].title}
          </h1>

          <p className='mx-auto lg:mx-0 max-w-xl text-ring text-lg sm:text-xl transition-opacity duration-700'>
            {slides[current].description}
          </p>

          <Link to='/signup'>
            <Button
              variant='outline'
              size='lg'
              className='font-semibold hover:cursor-pointer'
            >
              Get Started
            </Button>
          </Link>

          <div className='flex justify-center lg:justify-start gap-2 mt-6'>
            {slides.map((_, i) => (
              <Button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition ${
                  current === i ? "bg-white scale-125" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className='relative mx-auto w-full max-w-xl'>
          <div className='relative aspect-4/3 overflow-hidden'>
            {slides.map((slide, i) => (
              <Card
                key={i}
                className={`absolute inset-0 border-0 transition-all bg-transparent duration-700 ease-in-out ${
                  i === current
                    ? "opacity-100 translate-x-0 z-10"
                    : "opacity-0 translate-x-10 z-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className='bg-transparent rounded-md w-full h-full object-contain'
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
