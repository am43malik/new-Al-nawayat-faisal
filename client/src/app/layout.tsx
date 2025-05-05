// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.scss";
// import { ThemeProvider } from "next-themes";
// import ClientProviders from "@/lib/ClientProviders";
// import { Toaster } from "react-hot-toast";
// import ReduxProvider from "@/redux/persist-provider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://alnawayath.com"),
//   title: {
//     default:
//       "AL-Nawayath - the place where fashion finds a home and comfort meets style",
//     template: "%s | AL-Nawayath",
//   },
//   description:
//     "Discover our vibrant world of on-trend clothing, meticulously designed to enhance your wardrobe with the ideal balance of style and quality.",
//   keywords: [],
//   alternates: {
//     canonical: "https://alnawayath.com",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   openGraph: {
//     title:
//       "AL-Nawayath - the place where fashion finds a home and comfort meets style",
//     description:
//       "Discover our vibrant world of on-trend clothing, meticulously designed to enhance your wardrobe with the ideal balance of style and quality.",
//     url: "https://alnawayath.com",
//     siteName: "AL-Nawayath",
//     type: "website",
//     locale: "en_IN",
//     images: [
//       {
//         url: "/opengraph-image.png",
//         width: 1200,
//         height: 630,
//         alt: "AL-Nawayath",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@AL-Nawayath",
//     creator: "@AL-Nawayath",
//     title:
//       "AL-Nawayath - the place where fashion finds a home and comfort meets style",
//     description:
//       "Discover our vibrant world of on-trend clothing, meticulously designed to enhance your wardrobe with the ideal balance of style and quality.",
//     images: {
//       url: "/twitter-image.png",
//       alt: "AL-Nawayath",
//     },
//   },
//   verification: {
//     // google: "your-google-site-verification-code",
//     // // Add other verification codes if needed
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider
//           attribute="class"
//           enableSystem={false}
//           defaultTheme="light"
//         >
//           <ReduxProvider>
//             <ClientProviders>{children}</ClientProviders>
//           </ReduxProvider>
//           <Toaster
//             position="bottom-right"
//             reverseOrder={false}
//             gutter={8}
//             containerClassName=""
//             containerStyle={{}}
//           />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from "next-themes";
import ClientProviders from "@/lib/ClientProviders";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/persist-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://quickmart.com"),
  title: {
    default:
      "QuickMart - Your go-to destination for fast, fresh, and reliable grocery delivery",
    template: "%s | QuickMart",
  },
  description:
    "Shop for fresh groceries and daily essentials with QuickMart. Experience lightning-fast delivery, competitive pricing, and a wide selection of quality products—right at your doorstep.",
  keywords: [
    "online grocery",
    "quick delivery",
    "fresh produce",
    "grocery store",
    "daily essentials",
    "home delivery",
    "QuickMart",
  ],
  alternates: {
    canonical: "https://quickmart.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "QuickMart - Your go-to destination for fast, fresh, and reliable grocery delivery",
    description:
      "Shop for fresh groceries and daily essentials with QuickMart. Experience lightning-fast delivery, competitive pricing, and a wide selection of quality products—right at your doorstep.",
    url: "https://quickmart.com",
    siteName: "QuickMart",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "QuickMart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@QuickMart",
    creator: "@QuickMart",
    title:
      "QuickMart - Your go-to destination for fast, fresh, and reliable grocery delivery",
    description:
      "Shop for fresh groceries and daily essentials with QuickMart. Experience lightning-fast delivery, competitive pricing, and a wide selection of quality products—right at your doorstep.",
    images: {
      url: "/twitter-image.png",
      alt: "QuickMart",
    },
  },
  verification: {
    // google: "your-google-site-verification-code",
    // Add other verification codes if needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <ReduxProvider>
            <ClientProviders>{children}</ClientProviders>
          </ReduxProvider>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
