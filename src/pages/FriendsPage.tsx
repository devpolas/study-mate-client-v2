import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FriendCard } from "@/components/friend/FriendCard";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import useFriendShipActions from "@/hooks/useFriendShipActions";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/auth";
import { FriendCardSkeleton } from "@/components/SkeletonCard/FriendCardSkeleton";
import FriendActionButton from "@/components/friend/FriendActionButtons";

type FriendshipStatus = "pending" | "accepted" | "rejected";

interface Friendship {
  _id: string;
  requester: User;
  recipient: User;
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
}

export default function FriendsPage() {
  const {
    allFriend,
    allFriendRequest,
    acceptFriendRequest,
    deleteRequest,
    unfriend,
  } = useFriendShipActions();
  const {
    fetchMe,
    auth: { user: currentUser, loading: userLoading },
  } = useAuth();

  useEffect(() => {
    fetchMe();
  }, []);

  const { data: friends = [], isLoading: friendsLoading } = useQuery<
    Friendship[]
  >({
    queryKey: ["friends", currentUser?._id],
    queryFn: () => allFriend(currentUser!._id),
    enabled: !userLoading && !!currentUser?._id,
  });

  const { data: requests = [], isLoading: requestsLoading } = useQuery<
    Friendship[]
  >({
    queryKey: ["friendRequests", currentUser?._id],
    queryFn: () => allFriendRequest(currentUser!._id),
    enabled: !userLoading && !!currentUser?._id,
  });

  const loading = friendsLoading || requestsLoading;

  const sentRequests: Friendship[] = requests.filter(
    (r) => r.status === "pending" && r.requester._id === currentUser?._id
  );

  const receivedRequests: Friendship[] = requests.filter(
    (r) => r.status === "pending" && r.recipient._id === currentUser?._id
  );

  return (
    <div className='space-y-6 mx-auto max-w-4xl'>
      <h1 className='font-bold text-2xl'>Friends</h1>

      <Tabs defaultValue='friends'>
        <TabsList className='grid grid-cols-3 w-full'>
          <TabsTrigger className='hover:cursor-pointer' value='friends'>
            Friends
          </TabsTrigger>
          <TabsTrigger className='hover:cursor-pointer' value='sent'>
            Sent Requests
          </TabsTrigger>
          <TabsTrigger className='hover:cursor-pointer' value='received'>
            Received
          </TabsTrigger>
        </TabsList>

        <TabsContent value='friends' className='space-y-2 sm:space-y-4'>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <FriendCardSkeleton key={i} />
            ))
          ) : friends.length === 0 ? (
            <Empty text='No friends yet' />
          ) : (
            friends.map((f) => (
              <FriendCard
                key={f._id}
                user={
                  f.requester._id === currentUser?._id
                    ? f.recipient
                    : f.requester
                }
                actions={
                  <FriendActionButton
                    action='unfriend'
                    onClick={() => unfriend.mutate(f.requester._id)}
                    isLoading={unfriend.isPending}
                  />
                }
              />
            ))
          )}
        </TabsContent>

        <TabsContent value='sent' className='space-y-2 sm:space-y-4'>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <FriendCardSkeleton key={i} />
            ))
          ) : sentRequests.length === 0 ? (
            <Empty text='No sent requests' />
          ) : (
            sentRequests.map((r: Friendship) => (
              <FriendCard
                key={r._id}
                user={r.recipient}
                actions={
                  <FriendActionButton
                    action='cancel'
                    onClick={() => deleteRequest.mutate(r.recipient._id)}
                    isLoading={deleteRequest.isPending}
                  />
                }
              />
            ))
          )}
        </TabsContent>

        <TabsContent value='received' className='space-y-2 sm:space-y-4'>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <FriendCardSkeleton key={i} />
            ))
          ) : receivedRequests.length === 0 ? (
            <Empty text='No incoming requests' />
          ) : (
            receivedRequests.map((r: Friendship) => (
              <FriendCard
                key={r._id}
                user={r.requester}
                actions={
                  <>
                    <FriendActionButton
                      action='accept'
                      onClick={() =>
                        acceptFriendRequest.mutate(r.requester._id)
                      }
                      isLoading={acceptFriendRequest.isPending}
                    />
                    <FriendActionButton
                      action='cancel'
                      onClick={() => deleteRequest.mutate(r.recipient._id)}
                      isLoading={deleteRequest.isPending}
                    />
                  </>
                }
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className='py-10 text-muted-foreground text-center'>{text}</p>;
}
