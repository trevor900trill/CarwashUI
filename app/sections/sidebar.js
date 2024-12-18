"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../public/assets/LOGO2-nobg.webp";
import React, { useState, useEffect } from "react";
import { decodeAndCheckPermission } from "../api/utils/utils";

import "../globals.css";
import WeeeSpinner from "./weeespinner";

export default function Sidebar() {
  const pathname = usePathname();
  const [token, setToken] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const value = decodeAndCheckPermission();
    setToken(value);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center mt-10">
        <WeeeSpinner />
      </div>
    ); // Show a spinner while loading
  }

  return (
    <>
      <Image src={logo} alt="AUTOSPLASH LOGO" height={150} />
      <div className="h-full w-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {token?.some((obj) => obj.Permission === "Dashboard") ? (
            <li>
              <a
                href="/autosplash"
                className={`${
                  pathname === "/autosplash" ? "bg-gray-200" : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  fill="currentColor"
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 1920 1920"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M833.935 1063.327c28.913 170.315 64.038 348.198 83.464 384.79 27.557 51.84 92.047 71.944 144 44.387 51.84-27.558 71.717-92.273 44.16-144.113-19.426-36.593-146.937-165.46-271.624-285.064Zm-43.821-196.405c61.553 56.923 370.899 344.81 415.285 428.612 56.696 106.842 15.811 239.887-91.144 296.697-32.64 17.28-67.765 25.411-102.325 25.411-78.72 0-154.955-42.353-194.371-116.555-44.386-83.802-109.102-501.346-121.638-584.245-3.501-23.717 8.245-47.21 29.365-58.277 21.346-11.294 47.096-8.02 64.828 8.357ZM960.045 281.99c529.355 0 960 430.757 960 960 0 77.139-8.922 153.148-26.654 225.882l-10.39 43.144h-524.386v-112.942h434.258c9.487-50.71 14.231-103.115 14.231-156.084 0-467.125-380.047-847.06-847.059-847.06-467.125 0-847.059 379.935-847.059 847.06 0 52.97 4.744 105.374 14.118 156.084h487.454v112.942H36.977l-10.39-43.144C8.966 1395.137.044 1319.128.044 1241.99c0-529.243 430.645-960 960-960Zm542.547 390.686 79.85 79.85-112.716 112.715-79.85-79.85 112.716-112.715Zm-1085.184 0L530.123 785.39l-79.85 79.85L337.56 752.524l79.849-79.85Zm599.063-201.363v159.473H903.529V471.312h112.942Z"
                      fillRule="evenodd"
                    ></path>
                  </g>
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
}
