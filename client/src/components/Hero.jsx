import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import Button from "./Button";
import { aboutAPI } from "../services/api";
import circle from "../assets/userAsset/circle.png";
import cube from "../assets/userAsset/cube.png";
import dots from "../assets/userAsset/dots.png";
import plus from "../assets/userAsset/plus.png";
import zigzags from "../assets/userAsset/zigzags.png";
import { gsap } from "gsap";

const Hero = ({ setIsModel }) => {
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profile = useRef(null);
  const cubeRef = useRef(null);
  const dotsRef = useRef(null);
  const plusRef = useRef(null);
  const zigzagsRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await aboutAPI.getAbout();
      setAboutInfo(response.data.about);
    } catch (error) {
      console.error("Error fetching about info:", error);
      setError(
        `Failed to fetch about info: ${error.response?.data?.message || error.message}`,
      );
      setAboutInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        profile.current,
        {
          scale: 1,
        },
        {
          scale: 1.1,
          repeat: -1,
          filter: "grayScale(1)",
          yoyo: true,
          duration: 1,
        },
      );
      gsap.to(cubeRef.current, {
        y: 50,
        rotateY: 360,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
      });
      gsap.to(dotsRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });
      gsap.to(plusRef.current, {
        top: "2%",
        left: "48%",
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });
      gsap.to(zigzagsRef.current, {
        left: "5%",
        top: "2%",
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });
      gsap.to(circleRef.current, {
        left: "5%",
        bottom: "10%",
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });
    });
    return () => ctx.revert();
  }, []);

  if (loading) {
    return (
      <header className="relative flex flex-col justify-center items-center gap-16 px-4 py-2 mt-16 lg:gap-0 lg:pb-32 lg:px-28 lg:flex-row min-h-[400px]">
        <div className="text-center text-2xl text-gray-600">
          Loading about information...
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="relative flex flex-col justify-center items-center gap-16 px-4 py-2 mt-16 lg:gap-0 lg:pb-32 lg:px-28 lg:flex-row min-h-[400px]">
        <div className="text-center">
          <div className="text-2xl text-red-600 mb-4">
            Error loading about information:
          </div>
          <div className="text-lg text-gray-700 mb-6">{error}</div>
          <button
            onClick={fetchAboutInfo}
            className="bg-[#ff4500] text-white px-6 py-3 rounded-lg hover:bg-[#e03d00]"
          >
            Retry
          </button>
        </div>
      </header>
    );
  }

  if (!aboutInfo) {
    return (
      <header className="relative flex flex-col justify-center items-center gap-16 px-4 py-2 mt-16 lg:gap-0 lg:pb-32 lg:px-28 lg:flex-row min-h-[400px]">
        <div className="text-center">
          <div className="text-2xl text-gray-600 mb-4">
            No about information available
          </div>
          <div className="text-lg text-gray-700 mb-6">
            Please check the admin panel to add your information.
          </div>
        </div>
      </header>
    );
  }

  const displayName = aboutInfo.name;
  const displayTitle = aboutInfo.title;
  const displayDescription = aboutInfo.description;
  const displayImage = aboutInfo.profileImage;

  return (
    <header className="relative flex flex-col justify-between gap-16 px-4 py-2 mt-16 lg:gap-0 lg:pb-32 lg:px-28 lg:flex-row">
      <div className="flex flex-col justify-center w-full gap-5">
        <p className="text-4xl text-[#343d68]">Hi! {displayName}</p>
        <p className="text-4xl text-[#343d68]">
          I am a{" "}
          <TypeAnimation
            sequence={[
              displayTitle,
              4000,
              "Frontend Developer",
              5000,
              "Backend Developer",
              6000,
              "Full Stack Developer",
              7000,
            ]}
            wrapper="span"
            style={{ color: "#4e45d5" }}
            repeat={Infinity}
          />
        </p>
        <p className="mt-[112px]">{displayDescription}</p>
        <a href="#contact">
          <Button text={"Hire Me"} border={1} />
        </a>
      </div>
      <div className="relative p-10">
        <img
          src={displayImage}
          alt="Profile"
          className=""
          ref={profile}
          onError={(e) => {
            console.log(e);
          }}
        />
        <img
          src={circle}
          alt="circle"
          className="absolute bottom-0"
          ref={circleRef}
        />
        <img
          src={cube}
          alt="cube"
          className="absolute top-0 right-0"
          ref={cubeRef}
        />
        <img
          src={dots}
          alt="dots"
          className="absolute bottom-0 right-0"
          ref={dotsRef}
        />
        <img
          src={plus}
          alt="plus"
          className="absolute top-0 left-1/2"
          ref={plusRef}
        />
        <img
          src={zigzags}
          alt="zigzags"
          className="absolute top-0"
          ref={zigzagsRef}
        />
        <span className="absolute lg:-bottom-3 lg:left-2 text-[112px] text-[#e7e7e7] -bottom-64 lg:hidden">
          {displayName.toLowerCase()}
        </span>
      </div>
      <span className="absolute lg:-bottom-3 lg:left-2 text-[112px] text-[#e7e7e7] hidden lg:block">
        {displayName.toLowerCase()}
      </span>
    </header>
  );
};

export default Hero;
