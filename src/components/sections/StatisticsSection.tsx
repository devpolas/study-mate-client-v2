// StatisticsSection.tsx
import { Users, BookOpen, CheckCircle } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <Users className='w-10 h-10 text-ring' />,
    value: "5000+",
    label: "Students Connected",
  },
  {
    icon: <BookOpen className='w-10 h-10 text-ring' />,
    value: "2000+",
    label: "Study Sessions Organized",
  },
  {
    icon: <CheckCircle className='w-10 h-10 text-ring' />,
    value: "95%",
    label: "User Satisfaction Rate",
  },
];

export default function StatisticsSection() {
  return (
    <section className='bg-accent py-16'>
      <div className='mx-auto px-4 max-w-7xl text-center'>
        <h2 className='font-bold text-muted-foreground text-3xl sm:text-4xl'>
          Our Achievements
        </h2>
        <p className='mt-4 mb-12 text-ring'>
          StudyMate has helped thousands of students connect, collaborate, and
          achieve their learning goals.
        </p>

        <div className='gap-8 grid grid-cols-1 sm:grid-cols-3'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='flex flex-col justify-center items-center bg-card shadow-md hover:shadow-lg p-6 border rounded-xl transition-shadow duration-300'
            >
              <div className='mb-4'>{stat.icon}</div>
              <h3 className='font-bold text-destructive text-2xl'>
                {stat.value}
              </h3>
              <p className='mt-1 text-muted-foreground'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
