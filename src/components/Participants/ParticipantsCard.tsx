import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, BookOpen } from "lucide-react";
import FriendActionButton from "../friend/FriendActionButtons";
import useFriendShipActions from "@/hooks/useFriendShipActions";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

interface ParticipantsCardProps {
  user: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    role: "student" | "tutor" | "admin";
    subject?: string;
    experienceLevel: "Beginner" | "Intermediate" | "Expert";
    studyMode: boolean;
    ratingAverage: number;
  };
  isFriend?: boolean;
  isRequested?: boolean;
  isReceived?: boolean;
  onActionSuccess?: () => void;
}

export default function ParticipantsCard({
  user,
  isFriend = false,
  isRequested = false,
  isReceived = false,
  onActionSuccess,
}: ParticipantsCardProps) {
  const { sendFriendRequest, acceptFriendRequest, deleteRequest, unfriend } =
    useFriendShipActions(user?._id);
  const navigate = useNavigate();

  const {
    auth: { loading, user: currentUser, token },
  } = useAuth();

  return (
    <Card className='flex flex-col'>
      <CardContent className='flex-1 space-y-4 p-5'>
        <div className='flex justify-center'>
          <img
            src={user.image || "/avatar.svg"}
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
      <CardFooter className='flex p-4 pt-0'>
        <Link to={`/participant/${user._id}`} className='w-full'>
          <Button
            variant='default'
            className='hover:shadow-md hover:-translate-y-0.5 active:translate-0 hover:cursor-pointer'
          >
            View Details
          </Button>
        </Link>

        <div>
          {!isFriend && !isRequested && !isReceived && (
            <FriendActionButton
              action='send'
              onClick={() => {
                if (!loading || !token || !currentUser) {
                  return navigate("/signin", {
                    state: "/participants",
                    replace: true,
                  });
                } else {
                  sendFriendRequest.mutate(user._id, {
                    onSuccess: onActionSuccess,
                  });
                }
              }}
              isLoading={sendFriendRequest.isPending}
            />
          )}

          {isReceived && (
            <FriendActionButton
              action='accept'
              onClick={() =>
                acceptFriendRequest.mutate(user._id, {
                  onSuccess: onActionSuccess,
                })
              }
              isLoading={acceptFriendRequest.isPending}
            />
          )}

          {isRequested && (
            <FriendActionButton
              action='cancel'
              onClick={() =>
                deleteRequest.mutate(user._id, {
                  onSuccess: onActionSuccess,
                })
              }
              isLoading={deleteRequest.isPending}
            />
          )}

          {isFriend && (
            <FriendActionButton
              action='unfriend'
              onClick={() =>
                unfriend.mutate(user._id, {
                  onSuccess: onActionSuccess,
                })
              }
              isLoading={unfriend.isPending}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
