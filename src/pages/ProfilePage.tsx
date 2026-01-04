import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { ProfileSkeleton } from "@/components/SkeletonCard/ProfileSkeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatTimeDate } from "@/utils/formateDateTime";

export default function ProfilePage() {
  const {
    fetchMe,
    logout,
    auth: { loading, user },
  } = useAuth();

  useEffect(() => {
    fetchMe();
  }, []);

  if (loading || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <div className='space-y-6 mx-auto max-w-5xl'>
      <Card>
        <CardContent className='flex items-center gap-6 p-6'>
          <img
            src={user.image || "/avatar.png"}
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
            <span>Created At</span>
            <p>{formatTimeDate(user.createdAt)}</p>
          </div>
        </CardContent>
      </Card>
      <div className='flex justify-center items-center'>
        <Button
          onClick={logout}
          className='hover:cursor-pointer'
          size='default'
          variant='destructive'
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
