import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Connect With Study Partners",
    description:
      "Find students with similar subjects, learning styles, or nearby locations to collaborate efficiently.",
    image: "/hero/connect.svg",
  },
  {
    title: "Organize Your Learning",
    description:
      "Create study schedules, track sessions, and maintain consistency to achieve your goals faster.",
    image: "/hero/organize.svg",
  },
  {
    title: "Achieve Your Academic Goals",
    description:
      "Set learning objectives, monitor your progress, and work with peers to maximize your success.",
    image: "/hero/goals.svg",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative bg-gradient-to-r from-indigo-600 to-indigo-400 overflow-hidden text-white'>
      <div className='flex lg:flex-row flex-col lg:justify-between items-center gap-10 mx-auto px-6 py-24 max-w-7xl'>
        {/* Left Text */}
        <div className='space-y-6 lg:w-1/2 lg:text-left text-center'>
          <h1 className='font-bold text-4xl sm:text-5xl leading-tight'>
            {slides[currentSlide].title}
          </h1>
          <p className='max-w-lg text-indigo-100 text-lg sm:text-xl'>
            {slides[currentSlide].description}
          </p>
          <Link to='/signup'>
            <Button
              variant='default'
              className='bg-white hover:bg-gray-100 mt-4 px-6 py-3 rounded-lg font-semibold text-indigo-700 transition'
            >
              Get Started
            </Button>
          </Link>

          {/* Slide Indicators */}
          <div className='flex justify-center lg:justify-start gap-2 mt-6'>
            {slides.map((_, index) => (
              <button
                title='button'
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  currentSlide === index
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Image in Card */}
        <div className='flex justify-center lg:justify-end lg:w-1/2'>
          <Card className='bg-white/10 shadow-xl backdrop-blur-md border border-white/20 w-full max-w-md'>
            <CardContent className='flex justify-center items-center p-6'>
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className='w-full max-w-xs'
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Optional: Decorative Gradient Overlay */}
      <div className='top-0 left-0 absolute bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent w-full h-full pointer-events-none' />
    </section>
  );
}
