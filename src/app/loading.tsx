import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col space-y-8 bg-deep-void p-8">
      {/* Hero Skeleton */}
      <Skeleton className="h-[60vh] w-full rounded-3xl" />
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
      
      {/* Content Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
