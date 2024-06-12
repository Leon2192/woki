import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-center mb-4">404</h1>
      <div className="mb-8">
        <Image src="/images/404.png" alt="404" width={300} height={300} />
      </div>
      <h2 className="text-3xl font-semibold text-center mb-2">
        Oops, it looks like the link was not found!
      </h2>
      <p className="text-lg text-center mb-6">
        But dont worry, you can try again.
      </p>
      <Link href="/">
        <button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 px-6 rounded-lg text-lg">
          Home
        </button>
      </Link>
    </main>
  );
}
