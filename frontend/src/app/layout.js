import { Roboto, Sora } from "next/font/google";
import "./globals.css";
import GlobalLayout from "../components/layout/GlobalLayout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata = {
  title: "DanceSing - Wellness Platform",
  description: "Movement, Music, and Mindfulness for older adults",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${sora.variable}`}>
      <body className="antialiased">
        <GlobalLayout>
          {children}
        </GlobalLayout>
      </body>
    </html>
  );
}
