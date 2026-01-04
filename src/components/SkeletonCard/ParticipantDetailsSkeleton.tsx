import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ParticipantDetailsSkeleton() {
  return (
    <div className='space-y-6 mx-auto max-w-5xl animate-pulse'>
      <Card>
        <CardContent className='flex items-center gap-6 p-6'>
          <Skeleton className='rounded-full w-24 h-24' />

          <div className='space-y-3'>
            <Skeleton className='w-56 h-6' />
            <Skeleton className='w-40 h-4' />
            <Skeleton className='w-28 h-3' />
          </div>
        </CardContent>
      </Card>

      <div className='gap-6 grid md:grid-cols-2'>
        {/* User Preferences */}
        <Card>
          <CardHeader>
            <Skeleton className='w-40 h-5' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Row />
            <Row />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className='w-44 h-5' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Row />
            <Row />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className='w-44 h-5' />
        </CardHeader>
        <CardContent className='space-y-4'>
          <Row />
          <Row />
          <Row />
        </CardContent>
      </Card>

      <div className='flex justify-center'>
        <Skeleton className='rounded-md w-40 h-10' />
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className='flex justify-between items-center'>
      <Skeleton className='w-32 h-4' />
      <Skeleton className='w-40 h-4' />
    </div>
  );
}
