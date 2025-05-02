import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/chates/*'])
const isadminRoute = createRouteMatcher(['/admin/*'])
export default clerkMiddleware(async (auth,req) => {
  // Check if the request is for a protected route
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
  // Check if the request is for an admin route
  if (isadminRoute(req)) {
    await auth.protect((has)=>{
      return has({role:'admin'})
    })
  }
  
} 
)
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}