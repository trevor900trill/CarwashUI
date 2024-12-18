"use client";

import { Navbar } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import "../globals.css";
import { useLogout } from "../hooks/logoutHook";
import WeeeButton from "../sections/weeebutton";
import logo from "../../public/assets/LOGO2-nobg.webp";

const QwickCollectionLayout = ({ children }) => {
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
      <section className="flex min-h-screen w-full flex-col justify-start items-center lg:ml-auto bg-gray-100">
        <>
          <Navbar
            fluid
            rounded
            className="w-full fixed z-10 top-0 border-b border-gray-200 dark:border-gray-600 bg-white"
          >
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center justify-start">
                  <Image src={logo} alt="LOGO" height={70} />
                </div>
              </div>
            </div>
          </Navbar>
        </>

        <section className="p-4 px-0 lg:px-20 w-full mt-20">{children}</section>

        <section className="h-10 w-full flex flex-col justify-center items-center sm:flex-row sm:justify-between px-8 pr-20 pl-20">
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
          <p className="text-xs text-black">
            &copy; 2024 HoldingCompany solutions
          </p>
        </section>
      </section>
    </main>
  );
};

export default QwickCollectionLayout;
