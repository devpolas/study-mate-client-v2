export function FriendCardSkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='flex justify-between items-center gap-4 bg-card shadow-sm p-4 rounded-lg'>
        <div className='flex items-center gap-4 min-w-0'>
          <div className='bg-gray-300 rounded-full w-12 h-12' />

          <div className='flex flex-col gap-2 min-w-0'>
            <div className='bg-gray-300 rounded w-24 h-4' />
            <div className='bg-gray-200 rounded w-20 h-3' />
            <div className='flex items-center gap-2 mt-1'>
              <div className='bg-gray-300 rounded w-16 h-5'></div>
              <div className='bg-gray-200 rounded w-8 h-4'></div>
            </div>
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='bg-gray-300 rounded w-20 h-8' />
        </div>
      </div>
    </div>
  );
}
