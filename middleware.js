import { NextResponse } from "next/server";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function middleware(request) {
  const token = request.cookies.get("access_token")?.value || false;
  // If the user is not authenticated, redirect to the sign-in page
  try {
    await delay(1000);
    const response = await fetch(`${process.env.NEXT_PUBLIC_AXIOS_URL}/validation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ token: token}),
    });

    const data = await response.json();
    console.log(data);
    if (data.isValid) {
      // Continue with the next middleware or page rendering
      return NextResponse.next();
    } else {
      // Redirect to sign-in if the token is not valid
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  } catch (error) {
    console.error('Error:', error);
    // Redirect to sign-in in case of an error
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - /img (public img assets)
     * - robots.txt (search engine crawler file)
     * - favicon.ico (favicon file)
     * - sign-in | register | forgotpassword
     */
    "/((?!api|_next/static|_next/image|img|robots.txt|favicon.ico|sign-in|register|AboutUs|Careers|$|contact-us|FAQ|HelpCenter|hotel-details|hotel-listing|PriceGuarantee|review-booking|Reviews|TermsAndConditions).*)",
  ],
};
