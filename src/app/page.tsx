"use client";
import Image from "next/image";
import { use, useState } from "react";

type IPData = {
  ip: string;
  location: string;
  time: string;
  isp: string;
};

export default function Home() {
  const [ipData, setIpData] = useState<IPData>({
    ip: "192.212.174.101",
    location: "Brooklyn, NY 10001",
    time: "UTC-05:00",
    isp: "SpaceX Starlink",
  });
  const handleClick = (e: any) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen">
      <section className="bg-[url('/pattern-bg-desktop.png')] bg-cover h-[280px]">
        <div className="flex flex-col justify-center items-center pt-5 gap-10">
          <h1 className="text-4xl font-semibold">IP Address Tracker</h1>
          <div className="flex w-full">
            <form
              action="#"
              className="flex justify-center items-center w-full gap-0"
            >
              <div className="join w-[35%]">
                <input
                  type="text"
                  placeholder="Search for any IP address or domain"
                  className="input w-full h-14 rounded-s-xl bg-white placeholder:text-gray-400 placeholder:ps-2 placeholder:text-lg text-black"
                />
                <button
                  className="btn btn-ghost bg-[#000000] hover:bg-[#3f3f3f] h-auto w-16 rounded-e-xl"
                  onClick={handleClick}
                >
                  <Image
                    src={"/icon-arrow.svg"}
                    alt="Arrow"
                    width={11}
                    height={14}
                  ></Image>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 z-10 w-[80%]">
        <div className="card w-full h-42 bg-white text-black card-xl shadow-sm">
          <div className="card-body flex flex-row justify-between items-center">
            <div>
              <h2 className="card-title">Xlarge Card</h2>
              <h2>{ipData.ip}</h2>
            </div>
            <div>
              <h2 className="card-title">Xlarge Card</h2>
              <h2>{ipData.location}</h2>
            </div>
            <div>
              <h2 className="card-title">Xlarge Card</h2>
              <h2>{ipData.time}</h2>
            </div>
            <div>
              <h2 className="card-title">Xlarge Card</h2>
              <h2>{ipData.isp}</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
