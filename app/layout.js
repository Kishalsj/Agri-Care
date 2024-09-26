import Script from 'next/script';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { ToastContainer, Flip } from 'react-toastify';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { HotelProvider } from '@/components/contexts/HotelProvider';
import { AuthProvider } from '@/components/contexts/AuthProvider';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Checkins.ai',
  description:
    'Hotel bookings redefined at checkins.ai - your gateway to personalized travel experiences. Explore our curated accommodations, unlock wholesale rates, and enjoy a new level of affordability. Discover the future of hotel bookings today!',
};

async function fetchUser({ email, token }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/getUserDetailsById/user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
      const data = await response.json();
      console.log(data);
      return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user data');
  }
}

export default async function RootLayout({ children }) {

  let user = null;

    async function checkAuthentication() {
      const cookieStore = cookies();
      const isAuthenticated = cookieStore.get('isAuthenticated')?.value || false;

      if (isAuthenticated) {
        const email = cookieStore.get('email').value;
        const token = cookieStore.get('access_token').value;

        try {
          const userMeta = await fetchUser({ email, token });
          user = ([{ ...userMeta[0], token }]);
          return user;
        } catch (error) {
          console.error('Error fetching user data:', error);
          user = null;
          return null;
        }
      }
    }

    await checkAuthentication();

  return (
    <html lang="en" suppressHydrationWarning>
      <Head />
      {user ? <Body user={user}>{children}</Body> : <BodyUnathenicated>{children}</BodyUnathenicated>}
    </html>
  );
}

function Head() {
  return (
    <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-2LGWE7DTJL" />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-2LGWE7DTJL', {cookie_flags: 'SameSite=None;Secure'});
      `}
    </Script>
    </>
  );
}

function Body({ user, children }) {
  return (
    <body className={inter.className}>
      <AuthProvider value={user[0]}>
        <HotelProvider>
          <ToastContainer limit={10} transition={Flip} draggablePercent={60} containerId={2} />
          <Header />
          {children}
          <Footer />
        </HotelProvider>
      </AuthProvider>
      <SpeedInsights />
    </body>
  );
}

function BodyUnathenicated({ children }) {
  return (
    <body className={inter.className}>
        <HotelProvider>
          <ToastContainer limit={10} transition={Flip} draggablePercent={60} containerId={2} />
          <Header />
          {children}
          <Footer />
        </HotelProvider>
      <SpeedInsights />
    </body>
  );
}