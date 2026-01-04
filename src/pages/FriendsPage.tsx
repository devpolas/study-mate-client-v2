import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FriendCard } from "@/components/friend/FriendCard";
import type { User } from "@/types/auth";

export default function FriendsPage() {
  const friends: User[] = [];
  const sentRequests: User[] = [];
  const receivedRequests: User[] = [];

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
          {friends.length === 0 ? (
            <Empty text='No friends yet' />
          ) : (
            friends.map((f) => <FriendCard key={f._id} user={f} />)
          )}
        </TabsContent>

        <TabsContent value='sent' className='space-y-2 sm:space-y-4'>
          {sentRequests.length === 0 ? (
            <Empty text='No sent requests' />
          ) : (
            sentRequests.map((r) => (
              <FriendCard
                key={r._id}
                user={r}
                actions={
                  <Button size='sm' variant='destructive'>
                    Cancel
                  </Button>
                }
              />
            ))
          )}
        </TabsContent>

        <TabsContent value='received' className='space-y-2 sm:space-y-4'>
          {receivedRequests.length === 0 ? (
            <Empty text='No incoming requests' />
          ) : (
            receivedRequests.map((r) => (
              <FriendCard
                key={r._id}
                user={r}
                actions={
                  <>
                    <Button size='sm'>Accept</Button>
                    <Button size='sm' variant='outline'>
                      Reject
                    </Button>
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
