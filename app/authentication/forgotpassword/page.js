"use client";

import { useState } from "react";

import WeeeInputs from "../../sections/weeeinput";
import WeeeButton from "../../sections/weeebutton";

export default function WillowsForgortPassword() {
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section className="flex justify-center items-center w-full h-full">
      <section className="bg-white rounded-lg w-full">
        <h1 className="text-start font-bold text-2xl text-black mb-2">
          Reset your password
        </h1>
        <span className="text-center text-sm font-medium text-gray-900">
          Enter your email address and we&apos;ll send you a verification code.
        </span>
        <form className="flex flex-col gap-4 mt-6 mb-6 p-0">
          <WeeeInputs
            weeeinputlabel={"Email Address"}
            value={email}
            onValueChange={setEmail}
            placeholder={"john.doe@company.com"}
            inputtype={"email"}
            required={true}
            btndisabled={loading}
          />
          <WeeeButton loading={loading} buttonlabel={"Reset Password"} />
        </form>
      </section>
    </section>
  );
}
