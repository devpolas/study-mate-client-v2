import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, MapPin, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function AboutPage() {
  return (
    <div className='bg-card'>
      <section className='bg-accent'>
        <div className='mx-auto py-10 max-w-7xl sm:text-left text-center'>
          <h1 className='font-bold text-muted-foreground text-3xl leading-tight'>
            StudyMate — Connect, Collaborate, and Learn
          </h1>
          <p className='mt-6 max-w-3xl text-ring text-lg sm:text-xl'>
            StudyMate is a web platform designed to help students connect and
            collaborate for better learning outcomes. It enables users to find
            study partners based on subjects, learning preferences, or nearby
            locations, making education more interactive, engaging, and
            goal-oriented.
          </p>
          <Badge
            variant='outline'
            className='inline-block mt-6 px-2 py-1 rounded-full font-medium text-sm'
          >
            Interactive Learning Made Easy
          </Badge>
        </div>
      </section>

      <section className='bg-card'>
        <h1 className='mt-6 font-bold text-muted-foreground text-3xl text-center'>
          Our Features
        </h1>
        <div className='gap-6 grid sm:grid-cols-2 lg:grid-cols-4 mx-auto py-10 max-w-7xl'>
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader className='flex items-center gap-2'>
              <Users className='text-ring' size={28} />
              <CardTitle className='font-semibold text-muted-foreground text-lg'>
                Find Study Partners
              </CardTitle>
            </CardHeader>
            <CardContent className='text-ring text-sm'>
              Search for peers by subject, study mode, or nearby location and
              collaborate efficiently.
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader className='flex items-center gap-2'>
              <BookOpen className='text-ring' size={28} />
              <CardTitle className='font-semibold text-muted-foreground text-lg'>
                Organize Your Studies
              </CardTitle>
            </CardHeader>
            <CardContent className='text-ring text-sm'>
              Create schedules, track study sessions, and maintain consistency
              to achieve learning goals.
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader className='flex items-center gap-2'>
              <MapPin className='text-ring' size={28} />
              <CardTitle className='font-semibold text-muted-foreground text-lg'>
                Local Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent className='text-ring text-sm'>
              Find and connect with nearby students for offline study sessions
              or group learning.
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader className='flex items-center gap-2'>
              <Target className='text-ring' size={28} />
              <CardTitle className='font-semibold text-muted-foreground text-lg'>
                Goal-Oriented Learning
              </CardTitle>
            </CardHeader>
            <CardContent className='text-ring text-sm'>
              Set goals, monitor progress, and collaborate with peers to achieve
              academic success together.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='mx-auto py-10 max-w-7xl text-center'>
        <h2 className='font-bold text-muted-foreground text-3xl'>
          Our Mission
        </h2>
        <p className='mt-6 text-ring text-lg sm:text-xl leading-relaxed'>
          At StudyMate, we believe learning is better together. Our mission is
          to make education more interactive and engaging by connecting students
          with compatible peers, providing tools to track progress, and enabling
          collaborative study experiences both online and offline.
        </p>
      </section>

      <div className='bg-accent'>
        <section className='mx-auto py-10 max-w-7xl text-center'>
          <h2 className='font-bold text-muted-foreground text-3xl'>
            Start Collaborating Today
          </h2>
          <p className='mt-4 text-ring text-lg'>
            Join StudyMate and take your learning experience to the next level.
            Find peers, organize sessions, and achieve your academic goals
            faster.
          </p>
          <Link to='/'>
            <Button
              variant='outline'
              size='lg'
              className='mt-12 font-semibold transition hover:cursor-pointer'
            >
              Get Started
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
