import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useEffect, useId, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { CompleteProfileSkeleton } from "@/components/SkeletonCard/CompleteProfileSkeleton";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { MapPin } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { uploadImageToImgBB } from "@/utils/imageUpload";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUpdateProfile from "@/hooks/useUpdateProfile";

interface ProfileFormData {
  image: string;
  name: string;
  subject?: string;
  availability?: string;
  location?: string;
  studyMode: boolean;
  experienceLevel: "Beginner" | "Intermediate" | "Expert";
}

export default function CompleteProfile() {
  const id = useId();
  const [image, setProfileImage] = useState<File | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const axiosSecure = useAxiosSecure();
  const { updateProfile } = useUpdateProfile();
  const {
    isLoading: positionLoading,
    address,
    error: positionError,
    getPosition,
  } = useGeoLocation();

  const {
    fetchMe,
    auth: { loading, user },
  } = useAuth();

  useEffect(() => {
    fetchMe();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      subject: user?.subject || "",
      availability: user?.availability || "Morning 6:00 AM – 10:00 AM",
      location: user?.location || "",
      studyMode: user?.studyMode || false,
      experienceLevel: user?.experienceLevel || "Beginner",
    },
  });

  useEffect(() => {
    if (address) {
      setValue(
        "location",
        `${address.city || ""}, ${address.principalSubdivision || ""}, ${
          address.countryName || ""
        }`
      );
    }
  }, [address, setValue]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = (e.target.files && e.target.files[0]) || null;
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalImageUrl(url);
    }
    setProfileImage(file);
  }

  async function handleUpdateProfileImage() {
    if (image) {
      const url = await uploadImageToImgBB(id, image);
      console.log(url);
      if (url) {
        const response = await axiosSecure.patch("/users/updateMe", {
          image: url,
        });
        console.log(response);
        if (response.status === 200) {
          console.log("updated");
        }
      }
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    await updateProfile.mutate({ ...data });
  };

  if (loading || !user) {
    return <CompleteProfileSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 mx-auto max-w-5xl'
    >
      <Card>
        <CardContent className='flex flex-row items-center gap-6 p-6'>
          <img
            src={localImageUrl ? localImageUrl : user.image || "/avatar.png"}
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
        {user.authProvider === "mongodb" && (
          <CardFooter>
            <div className='flex gap-2'>
              <Input type='file' accept='image/*' onChange={handleChange} />
              <Button
                onClick={() =>
                  startTransition(async () => await handleUpdateProfileImage())
                }
                className='hover:cursor-pointer'
                size='default'
                variant='outline'
                type='button'
              >
                {isPending ? (
                  <Badge variant='outline'>
                    <Spinner />
                    Processing
                  </Badge>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
      <div className='gap-6 grid md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Personal Info</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex flex-col justify-between gap-1'>
              <span>Full Name</span>
              <Input
                {...register("name", {
                  required: "full name is required",
                  minLength: {
                    value: 3,
                    message: "full name must be 3 character",
                  },
                })}
                placeholder='Full Name'
              />
            </div>
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
            <div className='flex flex-col justify-between gap-1'>
              <span>Email</span>
              <Input value={user.email} disabled />
            </div>
            <div className='flex flex-col justify-between gap-1'>
              <span>Location</span>
              <div className='relative'>
                <Input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder='Location'
                  value={watch("location")}
                  onChange={(e) => setValue("location", e.target.value)}
                />

                {positionLoading ? (
                  <Spinner className='inline right-2 absolute my-auto h-full' />
                ) : (
                  <MapPin
                    onClick={getPosition}
                    className='inline right-2 absolute my-auto h-full hover:text-ring hover:cursor-pointer'
                  />
                )}
              </div>

              {positionError && (
                <p className='text-red-500 text-sm'>{positionError}</p>
              )}
              {errors.location && (
                <p className='text-red-500 text-sm'>
                  {errors.location.message}
                </p>
              )}
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
              <Input
                {...register("subject", { required: "subject is required" })}
                placeholder='Subject'
              />
              {errors.subject && (
                <p className='text-red-500 text-sm'>{errors.subject.message}</p>
              )}
            </div>
            <div className='flex sm:flex-row flex-col justify-between sm:items-center sm:gap-1'>
              <span>Availability</span>
              <Select
                value={watch("availability")}
                required={true}
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
              {errors.availability?.types?.required && (
                <p className='text-red-500 text-sm'>availability is required</p>
              )}
            </div>
            <div className='flex sm:flex-row flex-col justify-between sm:items-center sm:gap-1'>
              <span>Experience Level</span>
              <Select
                value={watch("experienceLevel")}
                required={true}
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
              {errors.experienceLevel?.types?.required && (
                <p className='text-red-500 text-sm'>
                  experience level is required
                </p>
              )}
            </div>
            <div className='flex justify-between items-center'>
              <span>Online Study Mode</span>
              <Switch
                className='hover:cursor-pointer'
                checked={watch("studyMode")}
                onCheckedChange={(v) => setValue("studyMode", v)}
              />
            </div>
          </CardContent>
        </Card>

        <Button
          variant='outline'
          disabled={updateProfile.isPending}
          type='submit'
          className='w-1/2 hover:cursor-pointer'
        >
          {updateProfile.isPending ? (
            <Badge variant='outline'>
              <Spinner />
              Processing
            </Badge>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </form>
  );
}
