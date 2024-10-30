"use client";

import "../globals.css";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WeeeButton from "../sections/weeebutton";
import Cookies from "js-cookie";

import logo from "../../public/assets/REALLOGO-removebg-preview.png";
import { logIn } from "../../app/api/auth/auth";

function Landing() {
  const router = useRouter();

  // const [currentOption, setCurrentOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNavigation = async (currentOption) => {
    if (!loading) {
      if (currentOption === 0 || currentOption === 1) {
        router.push("/authentication");
      } else {
        try {
          if (error) {
            setError("");
          }
          setLoading(true);
          const response = await logIn({
            email: "anonymous@weee.com",
            password: "Abc123***",
          });
          const data = await response.json();
          localStorage.setItem("userData", JSON.stringify(data));
          Cookies.set("userData", JSON.stringify(data), {
            expires: 7,
          });
        } catch (error) {
          setError(error.message);
          console.error("Login error:", error);
        } finally {
          setLoading(false);
          router.push("/weee/quickCollection");
        }
      }
    } else {
      alert("Still loading...");
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full overflow-hidden">
      <div className="flex justify-center items-center bg-primary overflow-hidden">
        <section className="hidden justify-center items-center absolute left-0 lg:flex xl:flex lg:w-1/2 xl:w-2/3  h-full p-6">
          <div className="w-full h-full flex justify-center items-center rounded-lg bg-primary-100">
            <Image src={logo} alt="WEEE CENTER LOGO" height={100} />
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
                      Collect as Cooporate
                    </div>
                    <div className="w-full">
                      <p className="text-sm">
                        A sustainable solution for large companies to recycle
                        old materials responsibly, requires an account for easy
                        management.
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
                  id="collect-individual"
                  name="hosting"
                  value="collect-individual"
                  className="hidden peer"
                ></input>
                <label
                  htmlFor="collect-individual"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-primary-100"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold text-black">
                      Collect as Individual
                    </div>
                    <div className="w-full">
                      <p className="text-sm">
                        An eco-friendly service for individuals to easily
                        recycle personal items and contribute to a cleaner
                        environment, account setup required.
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
              <li className="w-full" onClick={() => handleNavigation(2)}>
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
                      Quick Collection
                    </div>
                    <div className="w-full">
                      <p className="text-sm">
                        A hassle-free recycling service for fast disposal of
                        items, no account required, just schedule and we&apos;ll
                        handle the rest.
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
