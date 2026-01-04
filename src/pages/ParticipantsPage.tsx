import ParticipantsCard from "@/components/Participants/ParticipantsCard";
import ParticipantsCardSkeleton from "@/components/SkeletonCard/ParticipantsCardSkeleton";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import type { User } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export default function ParticipantsPage() {
  const axiosPublic = useAxiosPublic();
  const { data: users, isLoading } = useQuery({
    queryKey: ["participant"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data?.data?.users;
    },
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
