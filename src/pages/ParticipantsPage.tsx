import ParticipantsCard from "@/components/Participants/ParticipantsCard";
import ParticipantsCardSkeleton from "@/components/SkeletonCard/ParticipantsCardSkeleton";
import { useAuth } from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useFriendShipActions from "@/hooks/useFriendShipActions";
import type { User } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface Friendship {
  _id: string;
  requester: User;
  recipient: User;
  status: "pending" | "accepted";
}

export default function ParticipantsPage() {
  const axiosPublic = useAxiosPublic();
  const { allFriend, allFriendRequest } = useFriendShipActions();
  const {
    fetchMe,
    auth: { user: currentUser, loading: userLoading },
  } = useAuth();

  useEffect(() => {
    fetchMe();
  }, []);

  // Fetch all users
  const { data: participants = [], isLoading: participantsLoading } = useQuery({
    queryKey: ["participant"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data?.data?.users;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Accepted friends
  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ["friends", currentUser?._id],
    queryFn: () => allFriend(currentUser!._id),
    enabled: !userLoading && !!currentUser?._id,
  });

  // Pending requests
  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["friendRequests", currentUser?._id],
    queryFn: () => allFriendRequest(currentUser!._id),
    enabled: !userLoading && !!currentUser?._id,
  });

  const loading = participantsLoading || friendsLoading || requestsLoading;

  return (
    <>
      <h1 className='mb-6 font-bold text-2xl'>All Participants</h1>

      {loading ? (
        <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {Array.from({ length: 10 }).map((_, i) => (
            <ParticipantsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {participants.map((participant: User) => {
            if (participant._id === currentUser?._id) return null;

            const isFriend = friends.some(
              (f: Friendship) =>
                f.status === "accepted" &&
                (f.requester._id === participant._id ||
                  f.recipient._id === participant._id)
            );

            const isRequested = requests.some(
              (r: Friendship) =>
                r.status === "pending" &&
                r.requester._id === currentUser?._id &&
                r.recipient._id === participant._id
            );

            const isReceived = requests.some(
              (r: Friendship) =>
                r.status === "pending" &&
                r.requester._id === participant._id &&
                r.recipient._id === currentUser?._id
            );

            return (
              <ParticipantsCard
                key={participant._id}
                user={participant}
                isFriend={isFriend}
                isRequested={isRequested}
                isReceived={isReceived}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
