'use Client'

import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonLoader() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center">
      <Skeleton className="h-[100px] w-[100px] rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[260px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="space-y-2 flex items-center justify-center">
      <Skeleton className="h-8 w-[150px]" />
      </div>
    </div>
  )
}