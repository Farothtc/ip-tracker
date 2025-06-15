"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

type IPData = {
  ip: string;
  region: string;
  city: string;
  postalCode: string;
  time: string;
  isp: string;
  lat: number;
  lng: number;
};

const MapNoSSR = dynamic(() => import("./components/MapNoSSR"), {
  ssr: false,
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [ipData, setIpData] = useState<IPData>({
    ip: "",
    region: "",
    city: "",
    postalCode: "",
    time: "",
    isp: "",
    lat: 51.505,
    lng: -0.09,
  });
  const [formData, setFormData] = useState({
    userInput: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchFirst = async () => {
      try {
        const firstRes = await axios.get("https://api.ipify.org?format=json");
        if (firstRes) {
          const userIP = firstRes.data.ip;
          const userGeo = `https://geo.ipify.org/api/v2/country,city?apiKey=at_n9MEFhzieAcbGWXa7TeI0rnbk2KTq&ipAddress=${userIP}`;
          try {
            const res = await axios.get(userGeo);
            setIpData((prev) => ({
              ...prev,
              ip: res.data.ip,
              region: res.data.location.region,
              city: res.data.location.city,
              postalCode: res.data.location.postalCode,
              time: res.data.location.timezone,
              isp: res.data.isp,
              lat: res.data.location.lat,
              lng: res.data.location.lng,
            }));
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFirst();
  }, []);

  const isIP = (e: string) => {
    const ipv4 =
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    const ipv6 = /^([a-fA-F0-9:]+:+)+[a-fA-F0-9]+$/;
    return ipv4.test(e) || ipv6.test(e);
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    const userInputGeo = formData.userInput;
    let searchGeo = "";
    if (isIP(userInputGeo)) {
      searchGeo = `https://geo.ipify.org/api/v2/country,city?apiKey=at_n9MEFhzieAcbGWXa7TeI0rnbk2KTq&ipAddress=${userInputGeo}`;
    } else {
      searchGeo = `https://geo.ipify.org/api/v2/country,city?apiKey=at_n9MEFhzieAcbGWXa7TeI0rnbk2KTq&domain=${userInputGeo}`;
    }
    try {
      const res = await axios.get(searchGeo);
      setIpData((prev) => ({
        ...prev,
        ip: res.data.ip,
        region: res.data.location.region,
        city: res.data.location.city,
        postalCode: res.data.location.postalCode,
        time: res.data.location.timezone,
        isp: res.data.isp,
        lat: res.data.location.lat,
        lng: res.data.location.lng,
      }));
      console.log(res.data.location.postalCode);
    } catch (err) {
      console.log(err);
    }
  };
  const cardTitle = "card-title text-sm text-gray-400 tracking-widest";
  const cardDataCss = "text-black font-semibold text-2xl";

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
                  name="userInput"
                  value={formData.userInput}
                  onChange={(e) =>
                    setFormData({ ...formData, userInput: e.target.value })
                  }
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
      <div
        className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[80%]"
        style={{ zIndex: 9999 }}
      >
        <div className="card w-full h-44 bg-white text-black card-xl shadow-sm">
          <div className="card-body flex flex-row justify-evenly items-start">
            <div className="flex flex-col gap-3">
              <h2 className={`${cardTitle}`}>IP ADDRESS</h2>
              {ipData.ip !== "" ? (
                <h2 className={`${cardDataCss}`}>{ipData.ip}</h2>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
            <hr className="w-0.5 h-full bg-gray-200 border-none mx-1" />
            <div className="flex flex-col gap-3">
              <h2 className={`${cardTitle}`}>LOCATION</h2>
              {ipData.region !== "" ? (
                <h2 className={`${cardDataCss}`}>
                  {ipData.region}, {ipData.city}
                  <br />
                  {ipData.postalCode}
                </h2>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
            <hr className="w-0.5 h-full bg-gray-200 border-none mx-1" />
            <div className="flex flex-col gap-3">
              <h2 className={`${cardTitle}`}>TIMEZONE</h2>
              {ipData.time !== "" ? (
                <h2 className={`${cardDataCss}`}>{"UTC" + ipData.time}</h2>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
            <hr className="w-0.5 h-full bg-gray-200 border-none mx-1" />
            <div className="flex flex-col gap-3">
              <h2 className={`${cardTitle}`}>ISP</h2>
              {ipData.isp !== "" ? (
                <h2 className={`${cardDataCss}`}>{ipData.isp}</h2>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
          </div>
        </div>
      </div>
      <section
        className="w-full -z-10"
        style={{ height: "calc(100dvh - 280px)" }}
      >
        <div className="w-full h-full overflow-hidden shadow-lg">
          {mounted && ipData.lat && ipData.lng && (
            <MapNoSSR
              lat={ipData.lat}
              lng={ipData.lng}
              ip={ipData.ip}
              city={ipData.city}
              region={ipData.region}
            />
          )}
        </div>
      </section>
    </main>
  );
}
