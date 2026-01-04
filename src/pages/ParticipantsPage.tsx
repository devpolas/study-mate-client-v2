import ParticipantsCard from "@/components/Participants/ParticipantsCard";
import ParticipantsCardSkeleton from "@/components/SkeletonCard/ParticipantsCardSkeleton";
import { useAuth } from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useFriendShipActions from "@/hooks/useFriendShipActions";
import type { User } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export default function ParticipantsPage() {
  const axiosPublic = useAxiosPublic();
  const { allFriend, allFriendRequest } = useFriendShipActions();
  const {
    auth: { user: currentUser },
  } = useAuth();

  //fetch all user
  const { data: users, isLoading } = useQuery({
    queryKey: ["participant"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data?.data?.users;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Fetch current user's friends
  const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends", currentUser?._id],
    queryFn: () => allFriend(currentUser?._id || ""),
    enabled: !!currentUser?._id, // only run if user exists
  });

  const { data: friendRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["friendRequests", currentUser?._id],
    queryFn: () => allFriendRequest(currentUser?._id || ""),
    enabled: !!currentUser?._id,
  });

  return (
    <>
      <h1 className='mb-6 font-bold text-2xl'>All Participants</h1>
      {isLoading ? (
        <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {Array.from({ length: 10 }, (_, i) => (
            <ParticipantsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {users.map((user: User) => (
            <ParticipantsCard key={user.slug} user={user} />
          ))}
        </div>
      )}
    </>
  );
}
