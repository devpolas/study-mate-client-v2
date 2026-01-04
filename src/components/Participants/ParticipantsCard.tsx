import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, BookOpen } from "lucide-react";
import { Link } from "react-router";

interface ParticipantsCardProps {
  user: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    role: "student" | "tutor" | "admin";
    subject?: string;
    experienceLevel: "beginner" | "intermediate" | "expert";
    studyMode: boolean;
    ratingAverage: number;
  };
}

export default function ParticipantsCard({ user }: ParticipantsCardProps) {
  return (
    <Card className='flex flex-col hover:shadow-md transition hover:-translate-y-1'>
      <CardContent className='flex-1 space-y-4 p-5'>
        {/* Avatar */}
        <div className='flex justify-center'>
          <img
            src={user.image || "/avatar.png"}
            alt={user.name}
            className='border rounded-full w-20 h-20 object-cover'
          />
        </div>
        <div className='text-center'>
          <h3 className='font-semibold text-lg'>{user.name}</h3>
          <Badge variant='secondary' className='mt-1 capitalize'>
            {user.role}
          </Badge>
        </div>
        {user.subject && (
          <div className='flex justify-center items-center gap-2 text-sm'>
            <BookOpen className='w-4 h-4 text-muted-foreground' />
            <span>{user.subject}</span>
          </div>
        )}
        <div className='flex flex-wrap justify-center gap-2'>
          <Badge variant='outline' className='capitalize'>
            {user.experienceLevel}
          </Badge>

          <Badge variant={user.studyMode ? "default" : "secondary"}>
            {user.studyMode ? "Online" : "Offline"}
          </Badge>
        </div>
        <div className='flex justify-center items-center gap-1 text-sm'>
          <Star className='w-4 h-4 text-yellow-500' />
          <span>{user.ratingAverage.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0'>
        <Link to={`/profile/${user._id}`} className='w-full'>
          <Button className='w-full'>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
