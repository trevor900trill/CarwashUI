"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../public/assets/REALLOGO-removebg-preview.png";
import React, { useState, useEffect } from "react";

import "../globals.css";
import WeeeSpinner from "./weeespinner";

export default function Sidebar() {
  const pathname = usePathname();

  const [userData, setUserData] = useState({
    result: { profile: { email: "", firstName: "", lastName: "" } },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        setUserData(JSON.parse(storedData));
        setLoading(false);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center mt-10">
        <WeeeSpinner />
      </div>
    );
  }

  return (
    <>
      <Image src={logo} alt="WEEE CENTER LOGO" height={150} />
      <div className="h-full w-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {userData !== null &&
          userData.result.profile.email === "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee/quickCollection"
                className={`${
                  pathname === "/weee/quickCollection"
                    ? "bg-gray-200"
                    : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>recycle-solid</title>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="invisible_box" data-name="invisible box">
                        <rect width="48" height="48" fill="none"></rect>
                      </g>
                      <g id="Q3_icons" data-name="Q3 icons">
                        <g>
                          <path d="M45.4,33l-3.9-6.2A2,2,0,1,0,38.1,29L42,35.2H25.5l2.4-2.5a2.1,2.1,0,0,0-.1-2.9A2,2,0,0,0,25,30l-5.6,5.8a2.1,2.1,0,0,0,0,2.8l5.7,5.8a1.9,1.9,0,0,0,2.8,0,1.9,1.9,0,0,0,0-2.8l-2.2-2.3H42a3.9,3.9,0,0,0,3.5-2.1A4.2,4.2,0,0,0,45.4,33Z"></path>
                          <path d="M19.8,14.6l4.1-7.5,7.6,11.8-3.2-.7a2.1,2.1,0,0,0-2.4,1.6,1.9,1.9,0,0,0,1.5,2.3l7.8,1.7h.4a2,2,0,0,0,1.1-.3,2,2,0,0,0,.8-1.3l1.7-8a2.1,2.1,0,0,0-1.6-2.4,2.1,2.1,0,0,0-2.4,1.6l-.6,3L27.3,4.9A3.9,3.9,0,0,0,24,3a4.2,4.2,0,0,0-3.4,1.8h0l-4.3,7.8a2,2,0,0,0,3.5,1.9Z"></path>
                          <path d="M16.3,19.8a1.8,1.8,0,0,0-.9-1.3,1.9,1.9,0,0,0-1.5-.3L6.1,19.7a2.1,2.1,0,0,0-1.5,2.4,1.9,1.9,0,0,0,2.3,1.5l2.6-.5L2.7,32.9a4.2,4.2,0,0,0-.2,4.3A3.9,3.9,0,0,0,6,39.3h7.1a2,2,0,1,0,0-4H6l7.2-10.3.6,3.7a2,2,0,0,0,2,1.6h.4a2.1,2.1,0,0,0,1.6-2.4Z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Quick Collection
                </span>
              </a>
            </li>
          ) : null}

          {userData !== null &&
          userData.result.profile.email !== "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee"
                className={`${
                  pathname === "/weee" ? "bg-gray-200" : "bg-white"
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

          {/* <li className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                aria-expanded={isColOpen}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  E-commerce
                </span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    isColOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${isColOpen ? "block" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li> */}
          {userData !== null &&
          userData.result.profile.email !== "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee/regions"
                className={`${
                  pathname === "/weee/regions" ? "bg-gray-200" : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="currentColor"
                      d="M192 128v704h384V128H192zm-32-64h448a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M256 256h256v64H256v-64zm0 192h256v64H256v-64zm0 192h256v64H256v-64zm384-128h128v64H640v-64zm0 128h128v64H640v-64zM64 832h896v64H64v-64z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M640 384v448h192V384H640zm-32-64h256a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H608a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32z"
                    ></path>
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Regional Centers
                </span>
              </a>
            </li>
          ) : null}

          {userData !== null &&
          userData.result.profile.email !== "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee/centerAdmins"
                className={`${
                  pathname === "/weee/centerAdmins" ? "bg-gray-200" : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M11.1 15.75C10.9019 15.7474 10.7126 15.6676 10.5725 15.5275C10.4324 15.3874 10.3526 15.1981 10.35 15V9.5C10.3584 8.51394 10.0023 7.55953 9.35 6.82C9.06417 6.48906 8.71135 6.22255 8.31487 6.0381C7.91838 5.85365 7.48726 5.75545 7.05 5.75C6.11686 5.81426 5.24677 6.2442 4.62885 6.94638C4.01093 7.64857 3.6951 8.56625 3.75 9.5V15C3.75 15.1989 3.67099 15.3897 3.53033 15.5303C3.38968 15.671 3.19892 15.75 3 15.75C2.80109 15.75 2.61033 15.671 2.46967 15.5303C2.32902 15.3897 2.25 15.1989 2.25 15V9.5C2.21642 8.83917 2.31434 8.17825 2.53808 7.55555C2.76182 6.93285 3.10694 6.36074 3.55342 5.87241C3.9999 5.38407 4.53887 4.98921 5.13908 4.71071C5.7393 4.43221 6.38882 4.27561 7.05 4.25C7.69863 4.25518 8.3388 4.39778 8.9283 4.6684C9.5178 4.93902 10.0432 5.33151 10.47 5.82C11.3684 6.83434 11.8599 8.14507 11.85 9.5V15C11.8474 15.1981 11.7676 15.3874 11.6275 15.5275C11.4874 15.6676 11.2981 15.7474 11.1 15.75Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      d="M21 15.75H3C2.80109 15.75 2.61032 15.671 2.46967 15.5303C2.32902 15.3897 2.25 15.1989 2.25 15C2.25 14.8011 2.32902 14.6103 2.46967 14.4697C2.61032 14.329 2.80109 14.25 3 14.25H20.25V9.5C20.2584 8.51394 19.9023 7.55953 19.25 6.82C18.9698 6.49525 18.625 6.2324 18.2376 6.04818C17.8502 5.86396 17.4288 5.76241 17 5.75C16.8011 5.75 16.6103 5.67098 16.4697 5.53033C16.329 5.38968 16.25 5.19891 16.25 5C16.25 4.80109 16.329 4.61032 16.4697 4.46967C16.6103 4.32902 16.8011 4.25 17 4.25C17.6488 4.25391 18.2894 4.39594 18.8791 4.66664C19.4688 4.93735 19.9941 5.33052 20.42 5.82C21.3003 6.84168 21.7737 8.15161 21.75 9.5V15C21.7474 15.1981 21.6676 15.3874 21.5275 15.5275C21.3874 15.6676 21.1981 15.7474 21 15.75Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      d="M12 22.75C11.8019 22.7474 11.6126 22.6676 11.4725 22.5275C11.3324 22.3874 11.2526 22.1981 11.25 22V15.75H3C2.80109 15.75 2.61032 15.671 2.46967 15.5303C2.32902 15.3897 2.25 15.1989 2.25 15C2.25 14.8011 2.32902 14.6103 2.46967 14.4697C2.61032 14.329 2.80109 14.25 3 14.25H12C12.1981 14.2526 12.3874 14.3324 12.5275 14.4725C12.6676 14.6126 12.7474 14.8019 12.75 15V22C12.7474 22.1981 12.6676 22.3874 12.5275 22.5275C12.3874 22.6676 12.1981 22.7474 12 22.75Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      d="M17.4 5.75H7.5C7.30109 5.75 7.11032 5.67098 6.96967 5.53033C6.82902 5.38968 6.75 5.19891 6.75 5C6.75 4.80109 6.82902 4.61032 6.96967 4.46967C7.11032 4.32902 7.30109 4.25 7.5 4.25H17.4C17.5989 4.25 17.7897 4.32902 17.9303 4.46967C18.071 4.61032 18.15 4.80109 18.15 5C18.15 5.19891 18.071 5.38968 17.9303 5.53033C17.7897 5.67098 17.5989 5.75 17.4 5.75Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      d="M16 9.75C15.8019 9.74741 15.6126 9.66756 15.4725 9.52747C15.3324 9.38737 15.2526 9.19811 15.25 9V2C15.2526 1.80189 15.3324 1.61263 15.4725 1.47253C15.6126 1.33244 15.8019 1.25259 16 1.25H21C21.1989 1.25 21.3897 1.32902 21.5303 1.46967C21.671 1.61032 21.75 1.80109 21.75 2C21.75 2.19891 21.671 2.38968 21.5303 2.53033C21.3897 2.67098 21.1989 2.75 21 2.75H16.75V9C16.7474 9.19811 16.6676 9.38737 16.5275 9.52747C16.3874 9.66756 16.1981 9.74741 16 9.75Z"
                      fill="currentColor"
                    ></path>{" "}
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Center Offices
                </span>
                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span> */}
              </a>
            </li>
          ) : null}

          {userData !== null &&
          userData.result.profile.email !== "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee/agents"
                className={`${
                  pathname === "/weee/agents" ? "bg-gray-200" : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M19 14C21.2091 14 23 16 23 17.5C23 18.3284 22.3284 19 21.5 19H21M17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5M5 14C2.79086 14 1 16 1 17.5C1 18.3284 1.67157 19 2.5 19H3M7 11C5.34315 11 4 9.65685 4 8C4 6.34315 5.34315 5 7 5M16.5 19H7.5C6.67157 19 6 18.3284 6 17.5C6 15 9 14 12 14C15 14 18 15 18 17.5C18 18.3284 17.3284 19 16.5 19ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Agents</span>
              </a>
            </li>
          ) : null}

          {userData !== null &&
          userData.result.profile.email !== "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee/collections"
                className={`${
                  pathname === "/weee/collections" ? "bg-gray-200" : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>recycle-solid</title>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="invisible_box" data-name="invisible box">
                        <rect width="48" height="48" fill="none"></rect>
                      </g>
                      <g id="Q3_icons" data-name="Q3 icons">
                        <g>
                          <path d="M45.4,33l-3.9-6.2A2,2,0,1,0,38.1,29L42,35.2H25.5l2.4-2.5a2.1,2.1,0,0,0-.1-2.9A2,2,0,0,0,25,30l-5.6,5.8a2.1,2.1,0,0,0,0,2.8l5.7,5.8a1.9,1.9,0,0,0,2.8,0,1.9,1.9,0,0,0,0-2.8l-2.2-2.3H42a3.9,3.9,0,0,0,3.5-2.1A4.2,4.2,0,0,0,45.4,33Z"></path>
                          <path d="M19.8,14.6l4.1-7.5,7.6,11.8-3.2-.7a2.1,2.1,0,0,0-2.4,1.6,1.9,1.9,0,0,0,1.5,2.3l7.8,1.7h.4a2,2,0,0,0,1.1-.3,2,2,0,0,0,.8-1.3l1.7-8a2.1,2.1,0,0,0-1.6-2.4,2.1,2.1,0,0,0-2.4,1.6l-.6,3L27.3,4.9A3.9,3.9,0,0,0,24,3a4.2,4.2,0,0,0-3.4,1.8h0l-4.3,7.8a2,2,0,0,0,3.5,1.9Z"></path>
                          <path d="M16.3,19.8a1.8,1.8,0,0,0-.9-1.3,1.9,1.9,0,0,0-1.5-.3L6.1,19.7a2.1,2.1,0,0,0-1.5,2.4,1.9,1.9,0,0,0,2.3,1.5l2.6-.5L2.7,32.9a4.2,4.2,0,0,0-.2,4.3A3.9,3.9,0,0,0,6,39.3h7.1a2,2,0,1,0,0-4H6l7.2-10.3.6,3.7a2,2,0,0,0,2,1.6h.4a2.1,2.1,0,0,0,1.6-2.4Z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Collection Centers
                </span>
              </a>
            </li>
          ) : null}

          {userData !== null &&
          userData.result.profile.email !== "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee/reports"
                className={`${
                  pathname === "/weee/reports" ? "bg-gray-200" : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
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
                      d="M3 3V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M21 21H3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M7 16L12.25 10.75L15.75 14.25L21 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </a>
            </li>
          ) : null}

          {userData !== null &&
          userData.result.profile.email !== "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee/users"
                className={`${
                  pathname === "/weee/users" ? "bg-gray-200" : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
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
                      d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>
          ) : null}

          {userData !== null &&
          userData.result.profile.email !== "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee/categories"
                className={`${
                  pathname === "/weee/categories" ? "bg-gray-200" : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>category</title>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="invisible_box" data-name="invisible box">
                        <rect width="48" height="48" fill="none"></rect>
                      </g>
                      <g id="icons_Q2" data-name="icons Q2">
                        <path d="M24,7.7,29.3,16H18.6L24,7.7M24,2a2.1,2.1,0,0,0-1.7,1L13.2,17a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H33a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-9-14A1.9,1.9,0,0,0,24,2Z"></path>
                        <path d="M43,43H29a2,2,0,0,1-2-2V27a2,2,0,0,1,2-2H43a2,2,0,0,1,2,2V41A2,2,0,0,1,43,43ZM31,39H41V29H31Z"></path>
                        <path d="M13,28a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-4A10,10,0,1,0,23,34,10,10,0,0,0,13,24Z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Categories
                </span>
              </a>
            </li>
          ) : null}

          {userData !== null &&
          userData.result.profile.email !== "anonymous@weee.com" ? (
            <li>
              <a
                href="/weee/settings"
                className={`${
                  pathname === "/weee/settings" ? "bg-gray-200" : "bg-white"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M14 5.28988H13C13 5.7323 13.2907 6.12213 13.7148 6.24833L14 5.28988ZM15.3302 5.84137L14.8538 6.72058C15.2429 6.93144 15.7243 6.86143 16.0373 6.54847L15.3302 5.84137ZM16.2426 4.92891L15.5355 4.2218V4.2218L16.2426 4.92891ZM17.6569 4.92891L16.9498 5.63601L16.9498 5.63602L17.6569 4.92891ZM19.0711 6.34312L19.7782 5.63602V5.63602L19.0711 6.34312ZM19.0711 7.75734L18.364 7.05023L19.0711 7.75734ZM18.1586 8.66978L17.4515 7.96268C17.1386 8.27563 17.0686 8.75709 17.2794 9.14621L18.1586 8.66978ZM18.7101 10L17.7517 10.2853C17.8779 10.7093 18.2677 11 18.7101 11V10ZM18.7101 14V13C18.2677 13 17.8779 13.2907 17.7517 13.7148L18.7101 14ZM18.1586 15.3302L17.2794 14.8538C17.0686 15.2429 17.1386 15.7244 17.4515 16.0373L18.1586 15.3302ZM19.0711 16.2427L19.7782 15.5356V15.5356L19.0711 16.2427ZM19.0711 17.6569L18.364 16.9498L18.364 16.9498L19.0711 17.6569ZM17.6569 19.0711L18.364 19.7782V19.7782L17.6569 19.0711ZM15.3302 18.1586L16.0373 17.4515C15.7243 17.1386 15.2429 17.0686 14.8538 17.2794L15.3302 18.1586ZM14 18.7101L13.7148 17.7517C13.2907 17.8779 13 18.2677 13 18.7101H14ZM10 18.7101H11C11 18.2677 10.7093 17.8779 10.2853 17.7517L10 18.7101ZM8.6698 18.1586L9.14623 17.2794C8.7571 17.0685 8.27565 17.1385 7.96269 17.4515L8.6698 18.1586ZM7.75736 19.071L7.05026 18.3639L7.05026 18.3639L7.75736 19.071ZM6.34315 19.071L5.63604 19.7782H5.63604L6.34315 19.071ZM4.92894 17.6568L4.22183 18.3639H4.22183L4.92894 17.6568ZM4.92894 16.2426L4.22183 15.5355H4.22183L4.92894 16.2426ZM5.84138 15.3302L6.54849 16.0373C6.86144 15.7243 6.93146 15.2429 6.7206 14.8537L5.84138 15.3302ZM5.28989 14L6.24835 13.7147C6.12215 13.2907 5.73231 13 5.28989 13V14ZM5.28989 10V11C5.73231 11 6.12215 10.7093 6.24835 10.2852L5.28989 10ZM5.84138 8.66982L6.7206 9.14625C6.93146 8.75712 6.86145 8.27567 6.54849 7.96272L5.84138 8.66982ZM4.92894 7.75738L4.22183 8.46449H4.22183L4.92894 7.75738ZM4.92894 6.34317L5.63605 7.05027H5.63605L4.92894 6.34317ZM6.34315 4.92895L7.05026 5.63606L7.05026 5.63606L6.34315 4.92895ZM7.75737 4.92895L8.46447 4.22185V4.22185L7.75737 4.92895ZM8.6698 5.84139L7.9627 6.54849C8.27565 6.86145 8.7571 6.93146 9.14623 6.7206L8.6698 5.84139ZM10 5.28988L10.2853 6.24833C10.7093 6.12213 11 5.7323 11 5.28988H10ZM11 2C9.89545 2 9.00002 2.89543 9.00002 4H11V4V2ZM13 2H11V4H13V2ZM15 4C15 2.89543 14.1046 2 13 2V4H15ZM15 5.28988V4H13V5.28988H15ZM15.8066 4.96215C15.3271 4.70233 14.8179 4.48994 14.2853 4.33143L13.7148 6.24833C14.1132 6.36691 14.4944 6.52587 14.8538 6.72058L15.8066 4.96215ZM15.5355 4.2218L14.6231 5.13426L16.0373 6.54847L16.9498 5.63602L15.5355 4.2218ZM18.364 4.2218C17.5829 3.44075 16.3166 3.44075 15.5355 4.2218L16.9498 5.63602V5.63601L18.364 4.2218ZM19.7782 5.63602L18.364 4.2218L16.9498 5.63602L18.364 7.05023L19.7782 5.63602ZM19.7782 8.46444C20.5592 7.68339 20.5592 6.41706 19.7782 5.63602L18.364 7.05023L18.364 7.05023L19.7782 8.46444ZM18.8657 9.37689L19.7782 8.46444L18.364 7.05023L17.4515 7.96268L18.8657 9.37689ZM19.6686 9.71475C19.5101 9.18211 19.2977 8.67285 19.0378 8.19335L17.2794 9.14621C17.4741 9.50555 17.6331 9.8868 17.7517 10.2853L19.6686 9.71475ZM18.7101 11H20V9H18.7101V11ZM20 11H22C22 9.89543 21.1046 9 20 9V11ZM20 11V13H22V11H20ZM20 13V15C21.1046 15 22 14.1046 22 13H20ZM20 13H18.7101V15H20V13ZM19.0378 15.8066C19.2977 15.3271 19.5101 14.8179 19.6686 14.2852L17.7517 13.7148C17.6331 14.1132 17.4741 14.4944 17.2794 14.8538L19.0378 15.8066ZM19.7782 15.5356L18.8657 14.6231L17.4515 16.0373L18.364 16.9498L19.7782 15.5356ZM19.7782 18.364C20.5592 17.5829 20.5592 16.3166 19.7782 15.5356L18.364 16.9498H18.364L19.7782 18.364ZM18.364 19.7782L19.7782 18.364L18.364 16.9498L16.9498 18.364L18.364 19.7782ZM15.5355 19.7782C16.3166 20.5592 17.5829 20.5592 18.364 19.7782L16.9498 18.364L15.5355 19.7782ZM14.6231 18.8657L15.5355 19.7782L16.9498 18.364L16.0373 17.4515L14.6231 18.8657ZM14.2853 19.6686C14.8179 19.5101 15.3271 19.2977 15.8066 19.0378L14.8538 17.2794C14.4944 17.4741 14.1132 17.6331 13.7148 17.7517L14.2853 19.6686ZM15 20V18.7101H13V20H15ZM13 22C14.1046 22 15 21.1046 15 20H13V22ZM11 22H13V20H11V22ZM9.00002 20C9.00002 21.1046 9.89545 22 11 22V20H9.00002ZM9.00002 18.7101V20H11V18.7101H9.00002ZM8.19337 19.0378C8.67287 19.2977 9.18213 19.5101 9.71477 19.6686L10.2853 17.7517C9.88681 17.6331 9.50557 17.4741 9.14623 17.2794L8.19337 19.0378ZM8.46447 19.7782L9.3769 18.8657L7.96269 17.4515L7.05026 18.3639L8.46447 19.7782ZM5.63604 19.7782C6.41709 20.5592 7.68342 20.5592 8.46447 19.7781L7.05026 18.3639L5.63604 19.7782ZM4.22183 18.3639L5.63604 19.7782L7.05026 18.3639L5.63604 16.9497L4.22183 18.3639ZM4.22183 15.5355C3.44078 16.3166 3.44078 17.5829 4.22183 18.3639L5.63604 16.9497V16.9497L4.22183 15.5355ZM5.13427 14.6231L4.22183 15.5355L5.63604 16.9497L6.54849 16.0373L5.13427 14.6231ZM4.33144 14.2852C4.48996 14.8179 4.70234 15.3271 4.96217 15.8066L6.7206 14.8537C6.52589 14.4944 6.36693 14.1132 6.24835 13.7147L4.33144 14.2852ZM5.28989 13H4V15H5.28989V13ZM4 13H4H2C2 14.1046 2.89543 15 4 15V13ZM4 13V11H2V13H4ZM4 11V9C2.89543 9 2 9.89543 2 11H4ZM4 11H5.28989V9H4V11ZM4.96217 8.1934C4.70235 8.67288 4.48996 9.18213 4.33144 9.71475L6.24835 10.2852C6.36693 9.88681 6.52589 9.50558 6.7206 9.14625L4.96217 8.1934ZM4.22183 8.46449L5.13428 9.37693L6.54849 7.96272L5.63605 7.05027L4.22183 8.46449ZM4.22183 5.63606C3.44078 6.41711 3.44079 7.68344 4.22183 8.46449L5.63605 7.05027L5.63605 7.05027L4.22183 5.63606ZM5.63605 4.22185L4.22183 5.63606L5.63605 7.05027L7.05026 5.63606L5.63605 4.22185ZM8.46447 4.22185C7.68343 3.4408 6.4171 3.4408 5.63605 4.22185L7.05026 5.63606V5.63606L8.46447 4.22185ZM9.37691 5.13428L8.46447 4.22185L7.05026 5.63606L7.9627 6.54849L9.37691 5.13428ZM9.71477 4.33143C9.18213 4.48995 8.67287 4.70234 8.19337 4.96218L9.14623 6.7206C9.50557 6.52588 9.88681 6.36692 10.2853 6.24833L9.71477 4.33143ZM9.00002 4V5.28988H11V4H9.00002Z"
                      fill="currentColor"
                    ></path>{" "}
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></circle>{" "}
                  </g>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
}
