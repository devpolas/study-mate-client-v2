import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router";

interface FriendCardProps {
  user: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    subject?: string;
    experienceLevel: "Beginner" | "Intermediate" | "Expert";
    ratingAverage: number;
  };
  actions?: React.ReactNode;
}

export function FriendCard({ user, actions }: FriendCardProps) {
  return (
    <Card>
      <CardContent className='flex justify-between items-center gap-4 p-4'>
        <Link
          to={`/participant/${user._id}`}
          className='flex items-center gap-4 hover:opacity-90 min-w-0'
        >
          <img
            src={user.image || "/avatar.png"}
            alt={user.name}
            className='border rounded-full w-12 h-12 object-cover'
          />

          <div className='min-w-0'>
            <p className='font-medium truncate'>{user.name}</p>

            {user.subject && (
              <p className='text-muted-foreground text-sm truncate'>
                {user.subject}
              </p>
            )}

            <div className='flex items-center gap-2 mt-1'>
              <Badge variant='outline' className='text-xs capitalize'>
                {user.experienceLevel}
              </Badge>

              <div className='flex items-center gap-1 text-xs'>
                <Star className='w-3.5 h-3.5 text-yellow-500' />
                <span>{user.ratingAverage.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </Link>
        {actions && <div className='flex gap-2'>{actions}</div>}
      </CardContent>
    </Card>
  );
}
