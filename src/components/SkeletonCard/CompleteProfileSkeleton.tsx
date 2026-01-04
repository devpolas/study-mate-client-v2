import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CompleteProfileSkeleton() {
  return (
    <div className='space-y-6 mx-auto max-w-5xl animate-pulse'>
      <Card>
        <CardContent className='flex items-center gap-6 p-6'>
          <Skeleton className='rounded-full w-24 h-24' />

          <div className='space-y-3'>
            <Skeleton className='w-48 h-6' />
            <Skeleton className='w-32 h-4' />
            <Skeleton className='w-24 h-3' />
          </div>
        </CardContent>
      </Card>
      <div className='gap-6 grid md:grid-cols-2'>
        <Card>
          <CardHeader>
            <Skeleton className='w-32 h-5' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className='w-40 h-5' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-10' />
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-full h-10' />
          </CardContent>
        </Card>
      </div>
      <Skeleton className='rounded-md w-full h-11' />
    </div>
  );
}
