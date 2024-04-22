"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <p
      onClick={() => router.push("/")}
      className="text-2xl font-bold cursor-pointer"
      style={{ fontFamily: "Nico Moji" }}
    >
      oinayiq
    </p>
  );
};

export default Logo;
