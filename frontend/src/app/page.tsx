"use client";

import Image from "next/image";
import Map from "./components/map";
import NavBar from "./components/NavBar";
import Search from "./components/Search";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="relative flex-grow">
        {/* Map container */}
        <div className='w-full h-full'>
          <Map />
          <div className="absolute w-full h-full top-0">
          <Search />
          </div>
        </div>
        {/* Search overlay */}

      </div>
    </div>
  );
}
