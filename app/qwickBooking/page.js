"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Modal, Alert } from "flowbite-react";

import { HiInformationCircle, HiCheckCircle } from "react-icons/hi";

import WeeeInputs from "../sections/weeeinput";
import WeeeButton from "../sections/weeebutton";
import WeeeSelect from "../sections/weeeselect";

import { postQuickCollection } from "../api/collections/collections";

export default function QuickCollections() {
  const [loading, setloading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [subcollectionCategories, setsubcollectionCategories] = useState([]);
  const [regionData, setRegionData] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reference, setreference] = useState("");
  const [otp, setOtp] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [orderNUmber, setOrderNumber] = useState(null);
  const [weight, setWeight] = useState("");
  const [regionalOfficesId, setRegionalOfficesId] = useState("");
  const [agentId, setAgentId] = useState("");
  const [collectionCategoryId, setcollectionCategoryId] = useState("");
  const [subcollectionCategoryId, setsubcollectionCategoryId] = useState([]);
  const [location, setLocation] = useState("");
  const [myFOrmData, setMyFormData] = useState(null);

  const router = useRouter();

  async function loadCategoriesData() {
    try {
      setloading(true);
      // const result = await fetchCategories();
      // const categories = await result.json();
      // setCategoriesData(categories.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setloading(false);
    }
  }

  async function loadRegionData() {
    try {
      setloading(true);
      // const result = await fetchRegions();
      // const agents = await result.json();
      // setRegionData(agents);
    } catch (err) {
      setAddError(err.message);
    } finally {
      setloading(false);
    }
  }

  async function loadAgentData() {
    try {
      setloading(true);
      // const result = await fetchUsersByType(1);
      // const agents = await result.json();
      // setAgentData(agents);
    } catch (err) {
      setError(err.message);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    loadCategoriesData();
    loadRegionData();
    loadAgentData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("orderNumber", "orderNUmber");
    formData.append("weight", weight);
    formData.append("regionalOfficesId", "regionalOfficesId");
    formData.append("coordinates", location);
    formData.append("collectionCategoryId", collectionCategoryId);
    formData.append("agentId", "agentId");
    formData.append("imageFile", imageFile);
    setMyFormData(formData);
    setCurrentStep(1);
  };

  const handleGenerateOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      if (error) {
        setAddError("");
      }
      setloading(true);
      // const result = await generateOTP(
      //   {
      //     email: email,
      //     phone: "0712345678",
      //   },
      //   2
      // );
      // const reference = await result.json();
      // setreference(reference.result);
      // setCurrentStep(2);
    } catch (error) {
      setAddError(error.message);
      console.error("Post Generate OTP error:", error);
    } finally {
      setloading(false);
    }
  };

  const sendRequest = async () => {
    try {
      if (error) {
        setAddError("");
      }
      setloading(true);
      // myFOrmData.append("reference", reference);
      // await postQuickCollection(myFOrmData);
      // setCurrentStep(3);
    } catch (error) {
      setAddError(error.message);
      console.error("Post Quick COllect error:", error);
    } finally {
      setMyFormData(null);
      setloading(false);
    }
  };

  const handleValidateOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      if (error) {
        setAddError("");
      }
      setloading(true);
      // await validateOTP(
      //   {
      //     reference: reference,
      //     otpValue: otp,
      //   },
      //   2
      // );
      // await sendRequest();
      // setCurrentStep(3);
    } catch (error) {
      setAddError(error.message);
      console.error("Post Validate OTP:", error);
    } finally {
      setloading(false);
    }
  };

  // const handleCategoryValueChange = (newValue) => {
  //   setcollectionCategoryId(newValue);
  //   setsubcollectionCategories(newValue.subCategories);
  // };

  const handleCategoryValueChange = (newValue) => {
    const selectedCategory = categoriesData.find(
      (category) => category.id === newValue
    );

    // Ensure selectedCategory is valid and has subcategories
    if (selectedCategory && selectedCategory.subCategories) {
      setsubcollectionCategories(selectedCategory.subCategories);
    } else {
      setsubcollectionCategories([]);
    }

    setcollectionCategoryId(newValue);
  };

  return (
    <>
      <section className="flex justify-start items-center flex-col flex-grow w-full rounded">
        <div className="w-full bg-white p-2 md:p-4 rounded-lg">
          <h1 className="mb-2 text-lg font-semibold">Quick Collection</h1>
          <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse mb-6">
            <li className="flex items-center text-primary-600">
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-primary-600 rounded-full shrink-0 dark:border-primary-500">
                1
              </span>
              <span className="hidden md:flex">Quick Collect</span>
              <svg
                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            </li>
            <li
              className={`${
                currentStep >= 1 ? "text-primary-600" : ""
              } flex items-center`}
            >
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                2
              </span>
              <span className="hidden md:flex">Generate OTP</span>
              <svg
                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            </li>
            <li
              className={`${
                currentStep >= 2 ? "text-primary-600" : ""
              } flex items-center`}
            >
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                2
              </span>
              <span className="hidden md:flex"> Validate OTP</span>
              <svg
                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            </li>
            <li
              className={`${
                currentStep == 3 ? "text-primary-600" : ""
              } flex items-center`}
            >
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                4
              </span>
              <span className="hidden md:flex">Complete</span>
            </li>
          </ol>

          {currentStep == 0 && (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-start items-center mb-4"
            >
              {/* {agentData && (
                <div className="w-full mb-2">
                  <WeeeSelect
                    weeeinputlabel={"Agent Name"}
                    value={agentId}
                    onValueChange={setAgentId}
                    placeholder={"Select Agent..."}
                    required={true}
                    btndisabled={loading}
                    small={true}
                    selectData={agentData.result.map((element, index) => {
                      return {
                        key: element.id,
                        label: element.email,
                      };
                    })}
                  />
                </div>
              )}

              {regionData && (
                <div className="w-full mb-2">
                  <WeeeSelect
                    weeeinputlabel={"Region Name"}
                    value={regionalOfficesId}
                    onValueChange={setRegionalOfficesId}
                    placeholder={"Select Region..."}
                    required={true}
                    btndisabled={loading}
                    small={true}
                    selectData={regionData.result.map((element, index) => {
                      return {
                        key: element.id,
                        label: element.regionName,
                      };
                    })}
                  />
                </div>
              )} */}
              <div className="w-full mb-2">
                <WeeeSelect
                  weeeinputlabel={"Category Name"}
                  value={collectionCategoryId}
                  onValueChange={handleCategoryValueChange}
                  placeholder={"Select Category..."}
                  required={true}
                  btndisabled={loading || !categoriesData}
                  small={true}
                  selectData={categoriesData.map((element, index) => {
                    return {
                      key: element.id,
                      label: element.name,
                    };
                  })}
                />
              </div>

              <div className="w-full mb-2">
                <WeeeSelect
                  weeeinputlabel={"Subcategory Name"}
                  value={subcollectionCategoryId}
                  onValueChange={setsubcollectionCategoryId}
                  placeholder={"Select Subcategory..."}
                  required={true}
                  btndisabled={loading || !subcollectionCategories}
                  small={true}
                  selectData={subcollectionCategories.map((element, index) => {
                    return {
                      key: element.id,
                      label: element.name,
                    };
                  })}
                />
              </div>
              <div className="w-full mb-2">
                <WeeeInputs
                  weeeinputlabel={"Item to be disposed"}
                  value={name}
                  onValueChange={setName}
                  placeholder={"Item to be disposed"}
                  inputtype={"text"}
                  required={true}
                  btndisabled={loading}
                  small={true}
                />
              </div>
              <div className="w-full mb-2">
                <WeeeInputs
                  weeeinputlabel={"Estimated Weight (Kg)"}
                  value={weight}
                  onValueChange={setWeight}
                  placeholder={"Estimated Weight (Kg)"}
                  inputtype={"number"}
                  required={true}
                  btndisabled={loading}
                  small={true}
                />
              </div>
              <div className="w-full mb-2">
                <WeeeInputs
                  weeeinputlabel={"Location"}
                  value={location}
                  onValueChange={setLocation}
                  placeholder={"Location"}
                  inputtype={"text"}
                  required={true}
                  btndisabled={loading}
                  small={true}
                />
              </div>
              <div className="w-full mb-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="user_avatar"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <div
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="user_avatar_help"
                >
                  A picture of the collected item.
                </div>
              </div>
              <section className="w-full flex justify-end items-center space-x-2">
                <WeeeButton
                  loading={loading}
                  buttonlabel={"Change Booking Method"}
                  small={true}
                  btnaction={() => router.push("/landing")}
                  alternate={true}
                  makefull={false}
                />
                <WeeeButton
                  loading={loading}
                  buttonlabel={"Next"}
                  small={true}
                  makefull={false}
                />
              </section>
            </form>
          )}
          {currentStep == 1 && (
            <form
              onSubmit={handleGenerateOtpSubmit}
              className="w-full flex flex-col justify-start items-center mb-4"
            >
              <div className="w-full mb-2">
                <WeeeInputs
                  weeeinputlabel={"Email"}
                  value={email}
                  onValueChange={setEmail}
                  placeholder={"Email"}
                  inputtype={"email"}
                  required={true}
                  btndisabled={loading}
                  small={true}
                />
              </div>

              <section className="w-full flex justify-end items-center space-x-2">
                <WeeeButton
                  loading={loading}
                  buttonlabel={"Back"}
                  small={true}
                  btnaction={() => setCurrentStep(currentStep - 1)}
                  alternate={true}
                  makefull={false}
                />
                <WeeeButton
                  loading={loading}
                  buttonlabel={"Next"}
                  small={true}
                  makefull={false}
                />
              </section>
            </form>
          )}
          {currentStep == 2 && (
            <form
              onSubmit={handleValidateOtpSubmit}
              className="w-full flex flex-col justify-start items-center mb-4"
            >
              <div className="w-full mb-2">
                <WeeeInputs
                  weeeinputlabel={"OTP"}
                  value={otp}
                  onValueChange={setOtp}
                  placeholder={"OTP"}
                  inputtype={"number"}
                  required={true}
                  btndisabled={loading}
                  small={true}
                />
              </div>

              <section className="w-full flex justify-end items-center space-x-2">
                <WeeeButton
                  loading={loading}
                  buttonlabel={"Back"}
                  small={true}
                  btnaction={() => setCurrentStep(currentStep - 1)}
                  alternate={true}
                  makefull={false}
                />
                <WeeeButton
                  loading={loading}
                  buttonlabel={"Complete"}
                  small={true}
                  makefull={false}
                />
              </section>
            </form>
          )}
          {currentStep == 3 && (
            <div className="w-full mb-2">
              <Alert color="success" icon={HiCheckCircle}>
                <span className="font-medium">Success! </span>
                Booking request submitted successfully
              </Alert>
              <section className="w-full flex justify-end items-center space-x-2 mt-4">
                <WeeeButton
                  loading={loading}
                  buttonlabel={"View Booking Options"}
                  small={true}
                  btnaction={() => router.push("/landing")}
                  alternate={true}
                  makefull={false}
                />
              </section>
            </div>
          )}

          {addError && (
            <Alert
              color="failure"
              icon={HiInformationCircle}
              onDismiss={() => setAddError("")}
            >
              <span className="font-medium">Error! </span>
              {addError}
            </Alert>
          )}
        </div>
      </section>
    </>
  );
}
