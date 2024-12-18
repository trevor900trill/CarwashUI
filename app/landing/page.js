"use client";

import "../globals.css";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WeeeButton from "../sections/weeebutton";
import Cookies from "js-cookie";

import logo from "../../public/assets/LOGO2-nobg.webp";
import { logIn } from "../../app/api/auth/auth";

function Landing() {
  const router = useRouter();

  const handleNavigation = async (currentOption) => {
    if (currentOption === 0) {
      router.push("/authentication");
    } else {
      router.push("/qwickBooking");
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full overflow-hidden">
      <div className="flex justify-center items-center bg-primary overflow-hidden">
        <section className="hidden justify-center items-center absolute left-0 lg:flex xl:flex lg:w-1/2 xl:w-2/3  h-full p-6">
          <div className="w-full h-full flex justify-center items-center rounded-lg bg-primary-100">
            <Image src={logo} alt="AUTO SPLASH LOGO" height={300} />
          </div>
        </section>
        <section className="flex flex-col justify-start items-center absolute top-0 right-0 w-full lg:w-1/2 xl:w-1/3 h-full bg-white px-8 overflow-y-auto">
          <main className="flex flex-col w-full min-h-screen justify-start items-start bg-white pt-10 pb-10">
            <h1 className="text-3xl font-semibold">
              Hi there,<br></br>What would you like to do?
            </h1>
            <ul className="space-y-2 flex flex-col justify-start items-center w-full h-full mt-10">
              <li className="w-full" onClick={() => handleNavigation(0)}>
                <input
                  type="radio"
                  id="collect-cooporate"
                  name="hosting"
                  value="collect-cooporate"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="collect-cooporate"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-primary-100"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold text-black">
                      Member Booking
                    </div>
                    <div className="w-full">
                      <p className="text-sm">
                        An efficient car wash booking service tailored for
                        regulars, create an account for quick scheduling,
                        exclusive perks, and personalized service every time.
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 ms-3 rtl:rotate-180 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
              <li className="w-full" onClick={() => handleNavigation(1)}>
                <input
                  type="radio"
                  id="collect-quick"
                  name="hosting"
                  value="collect-quick"
                  className="hidden peer"
                ></input>
                <label
                  htmlFor="collect-quick"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-primary-100"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold text-black">
                      Quick Booking
                    </div>
                    <div className="w-full">
                      <p className="text-sm">
                        A hassle-free car wash booking service for quick and
                        easy scheduling, no account needed. Just book, and we'll
                        take care of the rest.
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 ms-3 rtl:rotate-180 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
            </ul>
          </main>
        </section>
      </div>
    </main>
  );
}

export default Landing;
