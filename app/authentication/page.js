"use client";

import { useState } from "react";
import Link from "next/link";
import { Alert, Label, Checkbox } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import WeeeInputs from "../sections/weeeinput";
import WeeeButton from "../sections/weeebutton";
import { logIn } from "../../app/api/auth/auth";
import "../globals.css";

function WillowsLogin() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (error) {
        setError("");
      }
      setloading(true);
      const response = await logIn({ email: email, password: password });
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify(data));
      Cookies.set("userData", JSON.stringify(data), { expires: 7 });
      router.push("/weee");
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full h-full">
      <section className="bg-white rounded-lg w-full">
        <h1 className="text-start font-bold text-2xl text-black mb-2">
          Sign in to WEEE Centre
        </h1>
        <span className="text-center text-sm font-medium text-gray-900">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/authentication/signup"
            className="willow-links cursor-pointer"
          >
            Sign Up
          </Link>
        </span>
        <form className="flex flex-col gap-4 mt-6 p-0" onSubmit={handleSubmit}>
          <WeeeInputs
            weeeinputlabel={"Email Address"}
            value={email}
            onValueChange={setEmail}
            placeholder={"john.doe@company.com"}
            inputtype={"email"}
            required={true}
            btndisabled={loading}
          />

          <WeeeInputs
            weeeinputlabel={"Password"}
            value={password}
            onValueChange={setPassword}
            placeholder={"Password"}
            inputtype={"password"}
            required={true}
            btndisabled={loading}
          />

          <div className="w-full flex items-center justify-between gap-2 w-full mb-2">
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label className="text-center text-sm font-medium">
                Remember me
              </Label>
            </div>
            <Link
              href="/authentication/forgotpassword"
              className="willow-links cursor-pointer text-sm text-primary font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <WeeeButton loading={loading} buttonlabel={"Log In"} />
        </form>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
            Or
          </span>
        </div>

        <div className="mb-6">
          <WeeeButton
            loading={loading}
            buttonlabel={"Change Collection Method"}
            alternate={true}
            btnaction={() => {
              router.push("/landing");
            }}
          />
        </div>

        {error && (
          <Alert
            color="failure"
            icon={HiInformationCircle}
            onDismiss={() => setError("")}
          >
            <span className="font-medium">Login Error! </span>
            {error}
          </Alert>
        )}
      </section>
    </section>
  );
}

export default WillowsLogin;
