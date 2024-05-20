// import { auth } from "@/auth";

import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// export default auth((req: any) => {
//   console.log("ROUTE:", req.nextUrl.pathname);
// });

// Optionally, don't invoke Middleware on some paths
// invokes the above function when path is found
// TODO I don't need this for my use case - so I need to go about removing this
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
