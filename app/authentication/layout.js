"use client";

import "../globals.css";
import Image from "next/image";
import logo from "../../public/assets/REALLOGO-removebg-preview.png";

const AuthenticationLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full overflow-hidden">
      <div className="flex justify-center items-center bg-primary overflow-hidden">
        <section className="flex flex-col justify-start items-center absolute top-0 left-0 w-full lg:w-1/3 xl:w-1/3 h-full bg-white px-8 overflow-y-auto">
          {children}
        </section>
        <section className="hidden justify-center items-center absolute right-0 lg:flex xl:flex lg:w-2/3 xl:2/3 h-full p-6">
          <div className="w-full h-full flex justify-center items-center rounded-lg bg-primary-100">
            <Image src={logo} alt="WEEE CENTER LOGO" height={100} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthenticationLayout;
