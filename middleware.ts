import { auth } from "@/auth";

export default auth((req: any) => {
  console.log("ROUTE:", req.nextUrl.pathname);
});

// Optionally, don't invoke Middleware on some paths
// invokes the above function when path is found
// TODO I don't need this for my use case - so I need to go about removing this
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
