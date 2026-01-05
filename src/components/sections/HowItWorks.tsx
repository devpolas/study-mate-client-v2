import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, MapPin } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Users className='text-indigo-600' size={28} />,
      title: "Find Study Partners",
      description:
        "Search for peers by subject, learning style, or location, and start collaborating effectively.",
    },
    {
      icon: <BookOpen className='text-indigo-600' size={28} />,
      title: "Organize Your Sessions",
      description:
        "Create study schedules, set reminders, and track your progress for consistent learning.",
    },
    {
      icon: <MapPin className='text-indigo-600' size={28} />,
      title: "Collaborate Locally",
      description:
        "Connect with nearby students for offline or hybrid study sessions and group learning.",
    },
  ];

  return (
    <section className='bg-gray-50 py-20'>
      <div className='mx-auto px-6 max-w-7xl text-center'>
        <h2 className='font-bold text-gray-800 text-3xl'>How It Works</h2>
        <p className='mx-auto mt-4 max-w-2xl text-gray-600 text-lg'>
          StudyMate makes collaborative learning simple and engaging. Follow
          these steps to start improving your study efficiency.
        </p>

        <div className='gap-8 grid sm:grid-cols-2 lg:grid-cols-3 mt-12'>
          {steps.map((step, i) => (
            <Card
              key={i}
              className='hover:shadow-lg border border-gray-200 transition-shadow duration-300'
            >
              <CardHeader className='flex items-center gap-4'>
                {step.icon}
                <CardTitle className='font-semibold text-gray-800 text-lg'>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-gray-600'>
                {step.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
