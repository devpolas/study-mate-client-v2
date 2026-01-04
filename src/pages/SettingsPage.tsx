import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { ProfileSkeleton } from "@/components/SkeletonCard/ProfileSkeleton";
import { Badge } from "@/components/ui/badge";

interface ProfileFormData {
  name: string;
  subject?: string;
  availability?: string;
  location?: string;
  studyMode: boolean;
  experienceLevel: "beginner" | "intermediate" | "expert";
}

export default function ProfilePage() {
  const {
    fetchMe,
    auth: { loading, user },
  } = useAuth();

  useEffect(() => {
    fetchMe();
  }, []);

  const { register, handleSubmit, setValue, watch } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      subject: user?.subject || "",
      availability: user?.availability || "",
      location: user?.location || "",
      studyMode: user?.studyMode || false,
      experienceLevel: user?.experienceLevel || "beginner",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("UPDATE PROFILE:", data);
    // dispatch(updateProfileThunk(data))
  };
  if (loading || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <div className='space-y-6 mx-auto max-w-5xl'>
      <Card>
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
      </Card>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='gap-6 grid md:grid-cols-2'
      >
        <Card>
          <CardHeader>
            <CardTitle>Personal Info</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex flex-col justify-between gap-1'>
              <span>Full Name</span>
              <Input
                {...register("name", { required: true, minLength: 3 })}
                placeholder='Full Name'
              />
            </div>
            <div className='flex flex-col justify-between gap-1'>
              <span>Email</span>
              <Input value={user.email} disabled />
            </div>
            <div className='flex flex-col justify-between gap-1'>
              <span>Location</span>
              <Input {...register("location")} placeholder='Location' />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Study Preferences</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex flex-col justify-between gap-1'>
              <span>Subject</span>
              <Input {...register("subject")} placeholder='Subject' />
            </div>
            <div className='flex sm:flex-row flex-col justify-between sm:items-center sm:gap-1'>
              <span>Availability</span>
              <Select
                value={watch("availability")}
                onValueChange={(v: string) =>
                  setValue("availability", v as ProfileFormData["availability"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Availability' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Morning 6:00 AM – 10:00 AM'>
                    Morning 6:00 AM – 10:00 AM
                  </SelectItem>
                  <SelectItem value='Lunch 12:00 PM – 2:00 PM'>
                    Lunch 12:00 PM – 2:00 PM
                  </SelectItem>
                  <SelectItem value='Afternoon 2:00 PM – 6:00 PM'>
                    Afternoon 2:00 PM – 6:00 PM
                  </SelectItem>
                  <SelectItem value='Evening 6:00 PM – 9:00 PM'>
                    Evening 6:00 PM – 9:00 PM
                  </SelectItem>
                  <SelectItem value='Night 9:00 PM – 12:00 AM'>
                    Night 9:00 PM – 12:00 AM
                  </SelectItem>
                  <SelectItem value='Late Night 12:00 AM – 6:00 AM'>
                    Late Night 12:00 AM – 6:00 AM
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex sm:flex-row flex-col justify-between sm:items-center sm:gap-1'>
              <span>Experience Level</span>
              <Select
                value={watch("experienceLevel")}
                onValueChange={(v: string) =>
                  setValue(
                    "experienceLevel",
                    v as ProfileFormData["experienceLevel"]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Experience Level' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='beginner'>Beginner</SelectItem>
                  <SelectItem value='intermediate'>Intermediate</SelectItem>
                  <SelectItem value='expert'>Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex justify-between items-center'>
              <span>Online Study Mode</span>
              <Switch
                checked={watch("studyMode")}
                onCheckedChange={(v) => setValue("studyMode", v)}
              />
            </div>
          </CardContent>
        </Card>

        <Button
          variant='outline'
          type='submit'
          className='w-1/2 hover:cursor-pointer'
        >
          Save Changes
        </Button>
      </form>
      {user.authProvider === "mongodb" && (
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Input type='password' placeholder='New Password' />
            <Input type='password' placeholder='Confirm Password' />
            <Button className='hover:cursor-pointer' variant='destructive'>
              Update Password
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
