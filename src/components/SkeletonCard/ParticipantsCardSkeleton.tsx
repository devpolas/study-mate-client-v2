import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ParticipantsCardSkeleton() {
  return (
    <Card className='flex flex-col'>
      <CardContent className='flex-1 space-y-4 p-5'>
        <div className='flex justify-center'>
          <Skeleton className='rounded-full w-20 h-20' />
        </div>
        <div className='space-y-2 text-center'>
          <Skeleton className='mx-auto w-36 h-5' />
          <Skeleton className='mx-auto rounded-full w-20 h-4' />
        </div>
        <div className='flex justify-center'>
          <Skeleton className='w-28 h-4' />
        </div>
        <div className='flex justify-center gap-2'>
          <Skeleton className='rounded-full w-24 h-4' />
          <Skeleton className='rounded-full w-20 h-4' />
        </div>
        <div className='flex justify-center'>
          <Skeleton className='w-16 h-4' />
        </div>
      </CardContent>
      <CardFooter className='flex gap-2 p-4 pt-0'>
        <Skeleton className='rounded-md w-full h-10' />
        <Skeleton className='rounded-md w-full h-10' />
      </CardFooter>
    </Card>
  );
}
