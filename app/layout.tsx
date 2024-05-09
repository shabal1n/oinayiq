import { Nunito } from "next/font/google";

import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";
import Footer from "@/app/components/footer/Footer";

import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "oinaiyq",
  description: "Let's play a game",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-28 flex-grow">{children}</div>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  );
}

