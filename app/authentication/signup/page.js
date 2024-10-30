"use client";

import { useState } from "react";
import Link from "next/link";
import { Label, Alert, Checkbox } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { signUp } from "../../api/auth/auth";
import { useRouter } from "next/navigation";

import WeeeInputs from "../../sections/weeeinput";
import WeeeButton from "../../sections/weeebutton";

export default function WillowsSignUp() {
  const router = useRouter();

  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [firstName, setfirstName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (error) {
        setError("");
      }
      setloading(true);
      await signUp(
        {
          email: email,
          password: password,
          username: userName,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        },
        0
      );
      router.push("/authentication");
    } catch (error) {
      setError(error.message);
      console.error("Sign Up error:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg w-full my-14">
      <h1 className="text-start font-bold text-2xl text-black mb-2">
        Create a WEEE centre account
      </h1>
      <span className="text-center text-sm font-medium text-gray-900">
        Already have an account?{" "}
        <Link href="/authentication" className="willow-links cursor-pointer">
          Log In
        </Link>
      </span>
      <form
        className="flex flex-col gap-4 mt-6 p-0 mb-6"
        onSubmit={handleSubmit}
      >
        <WeeeInputs
          weeeinputlabel={"Email Address"}
          value={email}
          onValueChange={setemail}
          placeholder={"john.doe@company.com"}
          inputtype={"email"}
          required={true}
          btndisabled={loading}
        />

        <WeeeInputs
          weeeinputlabel={"User Name"}
          value={userName}
          onValueChange={setuserName}
          placeholder={"User Name"}
          inputtype={"text"}
          required={true}
          btndisabled={loading}
        />

        <WeeeInputs
          weeeinputlabel={"First Name"}
          value={firstName}
          onValueChange={setfirstName}
          placeholder={"First Name"}
          inputtype={"text"}
          required={true}
          btndisabled={loading}
        />

        <WeeeInputs
          weeeinputlabel={"Last Name"}
          value={lastName}
          onValueChange={setlastName}
          placeholder={"Last Name"}
          inputtype={"text"}
          required={true}
          btndisabled={loading}
        />

        <WeeeInputs
          weeeinputlabel={"Phone Number"}
          value={phoneNumber}
          onValueChange={setphoneNumber}
          placeholder={"Phone Number"}
          inputtype={"number"}
          required={true}
          btndisabled={loading}
        />

        <WeeeInputs
          weeeinputlabel={"Password"}
          value={password}
          onValueChange={setpassword}
          placeholder={"Password"}
          inputtype={"password"}
          required={true}
          btndisabled={loading}
        />
        <div className="w-full flex items-center justify-start gap-2 w-full">
          <div className="flex items-center gap-2">
            <Checkbox />
            <Label className="text-center text-sm font-medium">
              I agree with the{" "}
              <a className="willow-links">terms and conditions</a>
            </Label>
          </div>
        </div>
        <WeeeButton loading={loading} buttonlabel={"Create Account"} />
      </form>
      {error && (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          onDismiss={() => setError("")}
        >
          <span className="font-medium">Sign Up Error! </span>
          {error}
        </Alert>
      )}
    </section>
  );
}
