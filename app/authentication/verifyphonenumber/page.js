"use client";

import { Button, TextInput } from "flowbite-react";

export default function WillowsVerifyPhone() {
  return (
    <section className="bg-white rounded-lg w-full">
      <h1 className="text-center font-bold text-xl text-black dark:text-white">
        VERIFY PHONE NUMBER
      </h1>
      <span className="text-center text-sm text-black dark:text-white">
        Didn&apos;t recieve a code?{" "}
        <a className="willow-links cursor-pointer">Resend</a>
      </span>
      <form className="flex flex-col gap-4 mt-2 p-0">
        <div className="w-full">
          <TextInput
            id="email1"
            type="number"
            placeholder="Verification Code"
            required
          />
        </div>
        <Button type="submit" className="bg-primary hover:!bg-primary-500">
          Verify Phone Number
        </Button>
      </form>
    </section>
  );
}
