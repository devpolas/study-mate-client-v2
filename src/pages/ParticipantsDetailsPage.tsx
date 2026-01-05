import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTimeDate } from "@/utils/formateDateTime";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { ParticipantDetailsSkeleton } from "@/components/SkeletonCard/ParticipantDetailsSkeleton";
import useFriendShipActions from "@/hooks/useFriendShipActions";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import FriendActionButton from "@/components/friend/FriendActionButtons";
import type { User } from "@/types/auth";

interface Friendship {
  _id: string;
  requester: User;
  recipient: User;
  status: "pending" | "accepted";
}

export default function ParticipantsDetailsPage() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { allFriend, allFriendRequest } = useFriendShipActions();
  const { isLoading, data: user } = useQuery({
    queryKey: ["participant", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/users/${id}`);
      return response.data?.data?.user;
    },
  });

  const {
    fetchMe,
    auth: { user: currentUser, loading: userLoading, token },
  } = useAuth();

  useEffect(() => {
    fetchMe();
  }, []);

  const { sendFriendRequest, acceptFriendRequest, deleteRequest, unfriend } =
    useFriendShipActions(currentUser?._id);

  // Accepted friends
  const {
    data: friends = [],
    isLoading: friendsLoading,
    refetch: friendRefetch,
  } = useQuery({
    queryKey: ["friends", currentUser?._id],
    queryFn: () => allFriend(currentUser!._id),
    enabled: !userLoading && !!currentUser?._id,
  });

  // Pending requests
  const {
    data: requests = [],
    isLoading: requestsLoading,
    refetch: friendRequestsRefetch,
  } = useQuery({
    queryKey: ["friendRequests", currentUser?._id],
    queryFn: () => allFriendRequest(currentUser!._id),
    enabled: !userLoading && !!currentUser?._id,
  });

  if (isLoading || !user) {
    return <ParticipantDetailsSkeleton />;
  }

  const isFriend = friends.some(
    (f: Friendship) =>
      f.status === "accepted" &&
      (f.requester._id === user._id || f.recipient._id === user._id)
  );

  const isRequested = requests.some(
    (r: Friendship) =>
      r.status === "pending" &&
      r.requester._id === currentUser?._id &&
      r.recipient._id === user._id
  );

  const isReceived = requests.some(
    (r: Friendship) =>
      r.status === "pending" &&
      r.requester._id === user._id &&
      r.recipient._id === currentUser?._id
  );

  const onActionSuccess = () => {
    friendRequestsRefetch();
    friendRefetch();
  };

  const isFriendShipLoading = friendsLoading || requestsLoading;

  return (
    <div className='space-y-6 mx-auto max-w-5xl'>
      <Card className='flex sm:flex-row flex-col items-center gap-4 sm:gap-8'>
        <CardContent className='flex items-center gap-6 p-6'>
          <img
            src={user.image || "/avatar.svg"}
            alt={user.name}
            className='border rounded-full w-24 h-24 object-cover'
          />
          <div>
            <h2 className='font-bold text-2xl'>{user.name}</h2>
            <p className='text-muted-foreground capitalize'>
              <Badge variant='secondary'>{user.role}</Badge> • ⭐{" "}
              {user.ratingAverage.toFixed(1)}
            </p>
            <p className='text-muted-foreground text-sm'>@{user.slug}</p>
          </div>
        </CardContent>
        <div className='flex'>
          {!isFriend && !isRequested && !isReceived && (
            <FriendActionButton
              action='send'
              onClick={() => {
                if (!userLoading && (!token || !currentUser)) {
                  navigate("/signin", {
                    state: { from: `/participant/${user._id}` },
                    replace: true,
                  });
                  return;
                }

                sendFriendRequest.mutate(user._id, {
                  onSuccess: onActionSuccess,
                });
              }}
              isLoading={sendFriendRequest.isPending || isFriendShipLoading}
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
              isLoading={acceptFriendRequest.isPending || isFriendShipLoading}
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
              isLoading={deleteRequest.isPending || isFriendShipLoading}
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
              isLoading={unfriend.isPending || isFriendShipLoading}
            />
          )}
        </div>
      </Card>

      <div className='gap-6 grid md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>User Preferences</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span>Subject</span>
              <p>{user.subject}</p>
            </div>
            <div className='flex justify-between items-center'>
              <span>Experience Level</span>
              <p>{user.experienceLevel}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Preferences</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span>Study Mode</span>
              <p>{user.studyMode ? "online" : "offline"}</p>
            </div>
            <div className='flex justify-between items-center'>
              <span>Availability</span>
              <p>{user.availability}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Contact Preferences</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex justify-between items-center'>
            <span>Location</span>
            <p>{user.location}</p>
          </div>
          <div className='flex justify-between items-center'>
            <span>Email</span>
            <p>{user.email}</p>
          </div>
          <div className='flex justify-between items-center'>
            <span>Joined at</span>
            <p>{formatTimeDate(user.createdAt)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
