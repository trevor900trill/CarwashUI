"use client";

import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  Button,
  Drawer,
} from "flowbite-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HiMicrophone } from "react-icons/hi";

import Sidebar from "../sections/sidebar";

import "../globals.css";
import { useLogout } from "../hooks/logoutHook";

const HomeLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isColOpen, setIsColOpen] = useState(false);

  const pathname = usePathname();

  const segments = pathname.split("/").filter((segment) => segment);

  const logOut = useLogout();

  const toggleDropdown = () => {
    setIsColOpen(!isColOpen);
  };

  const handleLogOut = () => {
    logOut();
  };

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const [userProfile, setUserData] = useState({
    result: { profile: { email: "", firstName: "", lastName: "" } },
  });

  useEffect(() => {
    // Check if we are in the browser environment
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    }
  }, []);

  return (
    <main className="flex min-h-screen min-w-screen flex justify-start items-center bg-primary-100">
      <section className="min-h-screen bg-white lg:w-1/5 xl:w-[13%] hidden lg:flex xl:flex flex-col justify-start items-center border-r border-gray-200 lg:fixed left-0 top-0">
        <Sidebar />
      </section>
      <section className="flex min-h-screen w-screen lg:w-4/5 xl:w-[87%] flex-col justify-start items-center lg:ml-auto bg-gray-100">
        <>
          <Navbar
            fluid
            rounded
            className="w-full lg:w-4/5 xl:w-[87%] fixed z-10 top-0 border-b border-gray-200 dark:border-gray-600 bg-white"
          >
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center justify-start w-2/3">
                  <div
                    onClick={handleToggleDrawer}
                    className="relative lg:hidden xl:hidden h-full flex justify-center items-center cursor-pointer"
                  >
                    <svg
                      width="30px"
                      height="30px"
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
                          d="M19 12.75H5C4.80109 12.75 4.61032 12.671 4.46967 12.5303C4.32902 12.3897 4.25 12.1989 4.25 12C4.25 11.8011 4.32902 11.6103 4.46967 11.4697C4.61032 11.329 4.80109 11.25 5 11.25H19C19.1989 11.25 19.3897 11.329 19.5303 11.4697C19.671 11.6103 19.75 11.8011 19.75 12C19.75 12.1989 19.671 12.3897 19.5303 12.5303C19.3897 12.671 19.1989 12.75 19 12.75Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M19 8.25H5C4.80109 8.25 4.61032 8.17098 4.46967 8.03033C4.32902 7.88968 4.25 7.69891 4.25 7.5C4.25 7.30109 4.32902 7.11032 4.46967 6.96967C4.61032 6.82902 4.80109 6.75 5 6.75H19C19.1989 6.75 19.3897 6.82902 19.5303 6.96967C19.671 7.11032 19.75 7.30109 19.75 7.5C19.75 7.69891 19.671 7.88968 19.5303 8.03033C19.3897 8.17098 19.1989 8.25 19 8.25Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M19 17.25H5C4.80109 17.25 4.61032 17.171 4.46967 17.0303C4.32902 16.8897 4.25 16.6989 4.25 16.5C4.25 16.3011 4.32902 16.1103 4.46967 15.9697C4.61032 15.829 4.80109 15.75 5 15.75H19C19.1989 15.75 19.3897 15.829 19.5303 15.9697C19.671 16.1103 19.75 16.3011 19.75 16.5C19.75 16.6989 19.671 16.8897 19.5303 17.0303C19.3897 17.171 19.1989 17.25 19 17.25Z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                    <div className="border-l border-gray-300 h-8 mx-4" />
                  </div>
                  <nav
                    className="flex h-full w-32 sm:w-96 md:w-full lg:w-full xl:w-full overflow-scroll md:overflow-hidden lg:overflow-hidden xl:overflow-hidden"
                    aria-label="Breadcrumb"
                  >
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                      <li className="inline-flex items-center">
                        <a
                          href="/weee"
                          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-500"
                        >
                          Dashboard
                        </a>
                      </li>
                      {segments.slice(1).map((segment, index) => {
                        const href = `/weee/${segments
                          .slice(1, index + 2)
                          .join("/")}`;
                        const isLast = index === segments.length - 2;

                        return (
                          <li
                            key={href}
                            aria-current={isLast ? "page" : undefined}
                          >
                            <div className="flex items-center">
                              <svg
                                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 9 4-4-4-4"
                                />
                              </svg>
                              {isLast ? (
                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                                  {segment.charAt(0).toUpperCase() +
                                    segment.slice(1)}
                                </span>
                              ) : (
                                <a
                                  href={href}
                                  className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-500 md:ms-2"
                                >
                                  {segment.charAt(0).toUpperCase() +
                                    segment.slice(1)}
                                </a>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>
                </div>

                <div className="flex items-center justify-end w-1/3">
                  <div className="relative h-full flex justify-center items-center cursor-pointer">
                    <div className="relative h-full flex justify-center items-center cursor-pointer">
                      <svg
                        width="25px"
                        height="25px"
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
                            d="M18.7491 9.70957V9.00497C18.7491 5.13623 15.7274 2 12 2C8.27256 2 5.25087 5.13623 5.25087 9.00497V9.70957C5.25087 10.5552 5.00972 11.3818 4.5578 12.0854L3.45036 13.8095C2.43882 15.3843 3.21105 17.5249 4.97036 18.0229C9.57274 19.3257 14.4273 19.3257 19.0296 18.0229C20.789 17.5249 21.5612 15.3843 20.5496 13.8095L19.4422 12.0854C18.9903 11.3818 18.7491 10.5552 18.7491 9.70957Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          ></path>{" "}
                          <path
                            d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      {/* <div className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 border border-white border-2 flex items-center justify-center rounded-full">
                        <p className="text-xs">7</p>
                      </div> */}
                    </div>
                    <div className="border-l border-gray-300 h-8 mx-4" />
                  </div>
                  <div className="flex md:order-2 items-center">
                    <Dropdown
                      arrowIcon={false}
                      className="mr-4"
                      inline
                      label={
                        <>
                          <Avatar alt="User" className="h-2" rounded />
                          <h1 className="text-sm pl-2 hidden sm:flex md:flex  mt-0">
                            {userProfile.fullName}
                          </h1>
                        </>
                      }
                    >
                      <DropdownHeader>
                        <span className="block text-sm">
                          {userProfile.fullName}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {userProfile.email}
                        </span>
                      </DropdownHeader>
                      <DropdownItem>Edit Profile</DropdownItem>
                      <DropdownItem>Settings</DropdownItem>
                      <DropdownDivider />
                      <DropdownItem onClick={handleLogOut}>
                        Sign out
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </Navbar>
          <Drawer
            open={isOpen}
            onClose={handleToggleDrawer}
            position="left"
            className="bg-white"
          >
            <Drawer.Items className="flex flex-col justify-center items-center w-full pb-40">
              <div
                onClick={handleToggleDrawer}
                className="absolute top-0 right-0 text-white w-12 h-12 cursor-pointer flex items-center justify-center rounded hover:bg-coolgrey"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g stroke="#000000" strokeWidth="2">
                      {" "}
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path>{" "}
                      <path
                        strokeLinecap="round"
                        d="M9 15L15 9M15 15L9 9"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
              <Sidebar />
            </Drawer.Items>
          </Drawer>
        </>
        <section className="h-[60px]"></section>
        <section className="w-full pl-4 pr-4 mt-4 flex justify-center items-center">
          <div className="h-40 w-full mb-2 bg-primary rounded-lg p-2 md:p-10 flex flex-col justify-center items-start relative">
            <h2 className="text-center mb-0 text-2xl font-bold tracking-tight text-white">
              Welcome Back Trevor !
            </h2>
            <p className="text-start mb-0 text-md font-normal tracking-tight text-white">
              We have an event coming up on 31st October
            </p>
            <Button className="absolute right-2 top-2" size={"xs"}>
              <HiMicrophone className="h-5 w-5" />
              Announcements
            </Button>
          </div>
        </section>
        <section className="p-4 w-full">{children}</section>

        <section className="h-10 w-full flex flex-col justify-center items-center sm:flex-row sm:justify-between px-8">
          <div>
            <Link
              href="#"
              className="cursor-pointer text-sm text-primary mr-4 md-4 sm:md-0 text-xs"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="cursor-pointer text-sm text-primary text-xs"
            >
              Terms & Conditions
            </Link>
          </div>
          <p className="text-xs text-black">&copy; 2024 autosplash</p>
        </section>
      </section>
    </main>
  );
};

export default HomeLayout;
