import ParticipantsCard from "@/components/Participants/ParticipantsCard";
import ParticipantsCardSkeleton from "@/components/SkeletonCard/ParticipantsCardSkeleton";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useFriendShipActions from "@/hooks/useFriendShipActions";
import type { User } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Friendship {
  _id: string;
  requester: User;
  recipient: User;
  status: "pending" | "accepted";
}
interface Params {
  query: string;
  page: number;
  limit: number;
}

export interface GetAllUsersResponse {
  status?: "success" | "error";
  message?: string;
  page?: number;
  totalPages?: number;
  total?: number;
  data?: {
    users?: User[];
  };
}

export default function ParticipantsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

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
  const {
    data: participants = [],
    isLoading: participantsLoading,
    refetch: participantRefetch,
  } = useQuery({
    queryKey: ["participant", query, page],
    queryFn: async () => {
      const params: Params = { query, page, limit };
      const res = await axiosPublic.get("/users", { params });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  console.log(participants);

  // /api/v2/users?query=John&role=student&studyMode=true&experienceLevel=Beginner&page=1&limit=10&sort=name

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

  const loading = participantsLoading || friendsLoading || requestsLoading;

  const { totalPages }: GetAllUsersResponse = participants;

  function getPageNumbers(current: number, total: number, maxVisible = 5) {
    const pages: (number | string)[] = [];

    if (total <= maxVisible) {
      // All pages fit
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      const start = Math.max(current - 1, 2);
      const end = Math.min(current + 1, total - 1);

      if (start > 2) pages.push("..."); // left ellipsis

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < total - 1) pages.push("..."); // right ellipsis

      pages.push(total); // last page
    }

    return pages;
  }

  return (
    <div>
      <h1 className='mb-6 font-bold text-2xl'>All Participants</h1>

      <div className='flex sm:flex-row flex-col justify-between items-center sm:items-baseline gap-4 sm:gap-0 pb-8'>
        <div className='flex items-center gap-2 w-full max-w-sm'>
          <Input
            onChange={(e) => setQuery(e.target.value)}
            type='text'
            placeholder='search'
          />
        </div>
        <div></div>
      </div>

      {loading ? (
        <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {Array.from({ length: 10 }).map((_, i) => (
            <ParticipantsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {participants?.data?.users.map((participant: User) => {
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
                onActionSuccess={() => {
                  participantRefetch();
                  friendRefetch();
                  friendRequestsRefetch();
                }}
              />
            );
          })}
        </div>
      )}

      <div className='py-16'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className='hover:cursor-pointer'
                onClick={() => setPage(page > 1 ? page - 1 : 1)}
              />
            </PaginationItem>

            {getPageNumbers(page, Number(totalPages)).map((p, idx) => (
              <PaginationItem key={idx}>
                {typeof p === "number" ? (
                  <PaginationLink
                    className='hover:cursor-pointer'
                    isActive={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                className='hover:cursor-pointer'
                onClick={() =>
                  setPage(
                    page < Number(totalPages) ? page + 1 : Number(totalPages)
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
