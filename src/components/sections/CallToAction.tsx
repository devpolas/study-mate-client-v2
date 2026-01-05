// CallToActionSection.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CallToAction() {
  return (
    <section className='bg-card py-16'>
      <div className='mx-auto px-4 max-w-5xl text-center'>
        <h2 className='font-bold text-muted-foreground text-4xl sm:text-5xl'>
          Ready to Boost Your Learning?
        </h2>
        <p className='mx-auto mt-4 max-w-2xl text-ring text-lg sm:text-xl'>
          Join StudyMate today and connect with study partners, organize
          sessions, and achieve your academic goals faster.
        </p>
        <Link to='/signup'>
          <Button
            className='mt-8 px-10 py-4 font-semibold text-lg hover:cursor-pointer'
            size='lg'
            variant='secondary'
          >
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
}
