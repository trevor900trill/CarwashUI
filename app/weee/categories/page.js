"use client";

import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Modal, Alert } from "flowbite-react";

import { HiInformationCircle } from "react-icons/hi";

import WeeeInputs from "../../sections/weeeinput";
import WeeeButton from "../../sections/weeebutton";
import WeeeSpinner from "../../sections/weeespinner";
import WeeeSelect from "../../sections/weeeselect";

import {
  postCategory,
  fetchCategories,
  updateSubCategory,
  postSubCategory,
} from "../../api/categories/categories";
import { formatDate } from "@/app/api/utils/utils";

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(false);
  const pathname = usePathname();
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");

  const [data, setData] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState(null);
  const [currentSubCategoryId, setCurrentSubCategoryId] = useState(null);

  const [name, setName] = useState("");
  const [subCategoryName, setsubCategoryName] = useState("");
  const [categoryId, setcategoryId] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addSubModalOpen, setSubAddModalOpen] = useState(false);
  const [editSubModalOpen, setSubEditSubModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (error) {
        setAddError("");
      }
      setloading(true);
      await postCategory({
        name: name,
      });
      handleCloseModal(true);
    } catch (error) {
      setAddError(error.message);
      console.error("Post category error:", error);
    } finally {
      setloading(false);
    }
  };

  const handleSubSubmit = async (event) => {
    event.preventDefault();
    try {
      if (error) {
        setAddError("");
      }
      setloading(true);
      await postSubCategory({
        categoryId: categoryId,
        name: subCategoryName,
      });
      handleCloseModal(true);
    } catch (error) {
      setAddError(error.message);
      console.error("Post sub category error:", error);
    } finally {
      setloading(false);
    }
  };

  const handleSubUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      if (error) {
        setAddError("");
      }
      setloading(true);
      await updateSubCategory(
        {
          id: currentCategoryId,
          name: subCategoryName,
        },
        currentSubCategoryId
      );
      handleCloseModal(true);
    } catch (error) {
      setAddError(error.message);
      console.error("Post sub category error:", error);
    } finally {
      setloading(false);
    }
  };

  async function loadData() {
    try {
      setloading(true);
      const result = await fetchCategories();
      const categories = await result.json();
      setData(categories);
      if (currentCategoryId === null) {
        setSubCategories(categories.result[0].subCategories);
        setCurrentCategoryId(categories.result[0].id);
        setCurrentCategoryName(categories.result[0].name);
      } else {
        if (categories.result.length !== 0) {
          let t = categories.result.find(
            (element) => element.id === currentCategoryId
          );
          if (t !== undefined) {
            setSubCategories(t.subCategories);
            setCurrentCategoryName(t.name);
          } else {
            setSubCategories(categories.result[0].subCategories);
            setCurrentCategoryId(categories.result[0].id);
            setCurrentCategoryName(categories.result[0].name);
          }
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setloading(false);
    }
  }

  const handleOpenSubCategoryModal = () => {
    setSubAddModalOpen(true);
    setcategoryId(currentCategoryId);
  };

  const handleOpenSubEditCategoryModal = (subcategory) => {
    setSubEditSubModalOpen(true);
    setcategoryId(currentCategoryId);
    setsubCategoryName(subcategory.name);
    setCurrentSubCategoryId(subcategory.id);
  };

  const handleCloseModal = (shouldReload) => {
    setAddModalOpen(false);
    setSubAddModalOpen(false);
    setSubEditSubModalOpen(false);
    setAddError("");
    if (shouldReload) {
      loadData();
    }
  };

  const handleCategoryChange = (category) => {
    setSubCategories(category.subCategories);
    setCurrentCategoryId(category.id);
    setCurrentCategoryName(category.name);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredRows = data && data.result ? data.result : [];

  const filteredSubRows =
    subCategories && subCategories.length !== 0
      ? subCategories.filter((row) =>
          row.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  return (
    <>
      <section className="flex justify-start items-center flex-col flex-grow w-full rounded">
        <div className="w-full bg-white p-2 md:p-4 rounded-lg">
          <h1 className="mb-2 text-lg font-semibold">Categories</h1>
          {loading || !data ? (
            <section className="w-full flex justify-center items-center mt-4 mb-4 h-12">
              <WeeeSpinner />
            </section>
          ) : error ? (
            <Alert
              color="failure"
              icon={HiInformationCircle}
              onDismiss={() => setError("")}
            >
              <span className="font-medium">Error! </span>
              {error}
            </Alert>
          ) : (
            <section className="grid grid-cols-1 lg:grid-cols-3 lg:grid-cols-4 gap-4 border rounded p-2">
              <section className="hidden col-span-1 lg:flex flex-col justify-start align-center border-r pr-2">
                <WeeeButton
                  loading={loading}
                  buttonlabel={"Add Category"}
                  small={true}
                  btnaction={() => setAddModalOpen(true)}
                  alternate={false}
                  makefull={true}
                />
                {loading || !filteredRows ? (
                  <section className="w-full flex justify-center items-center mt-4 mb-4 h-12">
                    <WeeeSpinner />
                  </section>
                ) : error ? (
                  <Alert
                    color="failure"
                    icon={HiInformationCircle}
                    onDismiss={() => setError("")}
                  >
                    <span className="font-medium">Error! </span>
                    {error}
                  </Alert>
                ) : (
                  <ul className="space-y-2 font-medium">
                    {filteredRows.map((element, index) => (
                      <li
                        key={index}
                        onClick={() => handleCategoryChange(element)}
                      >
                        <div
                          className={`${
                            currentCategoryId === element.id
                              ? "bg-gray-200 text-black"
                              : "bg-white"
                          } flex items-center justify-between p-2 text-gray-900 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-black group mt-2`}
                        >
                          <span className="ms-3">{element.name}</span>
                          <svg
                            fill="currentColor"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 24 24"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="M15.5,11.3L9.9,5.6c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l4.9,4.9l-4.9,4.9c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l5.7-5.7c0,0,0,0,0,0C15.9,12.3,15.9,11.7,15.5,11.3z"></path>
                            </g>
                          </svg>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              <section className="col-span-1 lg:col-span-3">
                <section className="flex justify-center items-center flex-col w-full">
                  <div className="w-full bg-white flex flex-col md:flex-row justify-between items-center">
                    <section className="flex flex-col items-center justify-start md:items-start">
                      <h1 className="text-lg font-semibold mb-0">
                        List of {currentCategoryName} materials
                      </h1>
                      <p className="text-gray-400 font-sm text-sm">
                        Here&apos;s the full list below
                      </p>
                    </section>
                    <section className="flex flex-col md:flex-row md:h-10 w-full md:w-auto justify-center items-center">
                      <WeeeInputs
                        weeeinputlabel={""}
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        placeholder={"Search"}
                        inputtype={"search"}
                        required={false}
                        btndisabled={loading}
                        small={true}
                      />
                      <div className="ml-2">
                        <WeeeButton
                          loading={loading}
                          buttonlabel={"Add Sub Category"}
                          small={true}
                          btnaction={() => handleOpenSubCategoryModal()}
                          alternate={true}
                          makefull={true}
                        />
                      </div>
                    </section>
                  </div>
                  <div className="w-full bg-white p-2 md:p-4 flex justify-center items-center mt-4">
                    {loading || !filteredSubRows ? (
                      <section className="w-full flex justify-center items-center mt-4 mb-4 h-12">
                        <WeeeSpinner />
                      </section>
                    ) : filteredSubRows.length === 0 ? (
                      <section className="flex flex-col items-center justify-center w-full h-full bg-white">
                        <svg
                          fill="#000000"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="64px"
                          height="64px"
                          viewBox="0 0 462.035 462.035"
                          stroke="#000000"
                          strokeWidth="0.0046203500000000005"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <g>
                              <path d="M457.83,158.441c-0.021-0.028-0.033-0.058-0.057-0.087l-50.184-62.48c-0.564-0.701-1.201-1.305-1.879-1.845 c-2.16-2.562-5.355-4.225-8.967-4.225H65.292c-3.615,0-6.804,1.661-8.965,4.225c-0.678,0.54-1.316,1.138-1.885,1.845l-50.178,62.48 c-0.023,0.029-0.034,0.059-0.057,0.087C1.655,160.602,0,163.787,0,167.39v193.07c0,6.5,5.27,11.771,11.77,11.771h438.496 c6.5,0,11.77-5.271,11.77-11.771V167.39C462.037,163.787,460.381,160.602,457.83,158.441z M408.516,134.615l16.873,21.005h-16.873 V134.615z M384.975,113.345v42.274H296.84c-2.514,0-4.955,0.805-6.979,2.293l-58.837,43.299l-58.849-43.305 c-2.023-1.482-4.466-2.287-6.978-2.287H77.061v-42.274H384.975z M53.523,155.62H36.65l16.873-21.005V155.62z M438.498,348.69H23.54 V179.16h137.796l62.711,46.148c4.15,3.046,9.805,3.052,13.954-0.005l62.698-46.144h137.799V348.69L438.498,348.69z"></path>{" "}
                            </g>
                          </g>
                        </svg>
                        <h4>
                          No Subcategories under {currentCategoryName} materials
                        </h4>
                      </section>
                    ) : (
                      <ul className="space-y-2 font-medium w-full">
                        {filteredSubRows.map((element, index) => (
                          <li
                            key={index}
                            className="flex justify-start items-center w-full min-h-20 border-t"
                          >
                            <section className="mr-2">
                              <div className="rounded-lg bg-gray-200 flex justify-center items-center p-2 w-10">
                                <svg
                                  width="20px"
                                  height="20px"
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
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M10.9436 1.25H13.0564C14.8942 1.24998 16.3498 1.24997 17.489 1.40314C18.6614 1.56076 19.6104 1.89288 20.3588 2.64124C21.1071 3.38961 21.4392 4.33856 21.5969 5.51098C21.75 6.65019 21.75 8.10583 21.75 9.94359V14.0564C21.75 15.8942 21.75 17.3498 21.5969 18.489C21.4392 19.6614 21.1071 20.6104 20.3588 21.3588C19.6104 22.1071 18.6614 22.4392 17.489 22.5969C16.3498 22.75 14.8942 22.75 13.0564 22.75H10.9436C9.10583 22.75 7.65019 22.75 6.51098 22.5969C5.33856 22.4392 4.38961 22.1071 3.64124 21.3588C2.89288 20.6104 2.56076 19.6614 2.40314 18.489C2.24997 17.3498 2.24998 15.8942 2.25 14.0564V9.94358C2.24998 8.10582 2.24997 6.65019 2.40314 5.51098C2.56076 4.33856 2.89288 3.38961 3.64124 2.64124C4.38961 1.89288 5.33856 1.56076 6.51098 1.40314C7.65019 1.24997 9.10582 1.24998 10.9436 1.25ZM6.71085 2.88976C5.70476 3.02502 5.12511 3.27869 4.7019 3.7019C4.27869 4.12511 4.02502 4.70476 3.88976 5.71085C3.75159 6.73851 3.75 8.09318 3.75 10V14C3.75 15.9068 3.75159 17.2615 3.88976 18.2892C4.02502 19.2952 4.27869 19.8749 4.7019 20.2981C5.12511 20.7213 5.70476 20.975 6.71085 21.1102C7.73851 21.2484 9.09318 21.25 11 21.25H13C14.9068 21.25 16.2615 21.2484 17.2892 21.1102C18.2952 20.975 18.8749 20.7213 19.2981 20.2981C19.7213 19.8749 19.975 19.2952 20.1102 18.2892C20.2484 17.2615 20.25 15.9068 20.25 14V10C20.25 8.09318 20.2484 6.73851 20.1102 5.71085C19.975 4.70476 19.7213 4.12511 19.2981 3.7019C18.8749 3.27869 18.2952 3.02502 17.2892 2.88976C16.2615 2.75159 14.9068 2.75 13 2.75H11C9.09318 2.75 7.73851 2.75159 6.71085 2.88976ZM7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12ZM7.25 16C7.25 15.5858 7.58579 15.25 8 15.25H13C13.4142 15.25 13.75 15.5858 13.75 16C13.75 16.4142 13.4142 16.75 13 16.75H8C7.58579 16.75 7.25 16.4142 7.25 16Z"
                                      fill="#000000"
                                    ></path>
                                  </g>
                                </svg>
                              </div>
                            </section>
                            <section className="flex-[2] flex flex-col items-start justify-center">
                              <h1 className="text-md font-semibold mb-0 text-left">
                                {element.name}
                              </h1>
                              <p className="text-gray-400 text-sm text-left">
                                {formatDate(element.createdDate)}
                              </p>
                            </section>
                            <section className="flex-[4] hidden md:flex overflow-hidden text-ellipsis whitespace-normal line-clamp-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Sed do eiusmod tempor incididunt ut labore
                              et dolore
                            </section>
                            <section className="flex-[1] flex justify-center items-center ml-8">
                              <div
                                className="rounded-lg bg-gray-200 flex justify-center items-center p-2 w-10 mr-2 cursor-pointer text-black hover:bg-primary hover:text-white"
                                onClick={() =>
                                  handleOpenSubEditCategoryModal(element)
                                }
                              >
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </g>
                                </svg>
                              </div>
                              <div className="rounded-lg bg-gray-200 flex justify-center items-center p-2 w-10 cursor-pointer text-black hover:bg-primary hover:text-white">
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="SVGRepo_bgCarrier" strokewidth="0"></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>{" "}
                                  </g>
                                </svg>
                              </div>
                            </section>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              </section>
            </section>
          )}
        </div>
      </section>
      <Modal
        dismissible
        show={addModalOpen}
        onClose={() => handleCloseModal(false)}
      >
        <Modal.Header>Add Category</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-start items-center mb-4"
          >
            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Name"}
                value={name}
                onValueChange={setName}
                placeholder={"Name"}
                inputtype={"text"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <section className="w-full flex justify-end items-center space-x-2">
              <WeeeButton
                loading={loading}
                buttonlabel={"Submit"}
                small={true}
                makefull={false}
              />
              <WeeeButton
                loading={loading}
                buttonlabel={"Cancel"}
                small={true}
                btnaction={() => handleCloseModal(false)}
                alternate={true}
                makefull={false}
              />
            </section>
          </form>
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
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={addSubModalOpen}
        onClose={() => handleCloseModal(false)}
      >
        <Modal.Header>Add Sub Category</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubSubmit}
            className="w-full flex flex-col justify-start items-center mb-4"
          >
            {data && (
              <div className="w-full mb-2">
                <WeeeSelect
                  weeeinputlabel={"Category Name"}
                  value={categoryId}
                  onValueChange={setcategoryId}
                  placeholder={"Select Category..."}
                  required={true}
                  btndisabled={loading}
                  small={true}
                  selectData={data.result.map((element, index) => {
                    return {
                      key: element.id,
                      label: element.name,
                    };
                  })}
                />
              </div>
            )}

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Sub Category Name"}
                value={subCategoryName}
                onValueChange={setsubCategoryName}
                placeholder={"Name"}
                inputtype={"text"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <section className="w-full flex justify-end items-center space-x-2">
              <WeeeButton
                loading={loading}
                buttonlabel={"Submit"}
                small={true}
                makefull={false}
              />
              <WeeeButton
                loading={loading}
                buttonlabel={"Cancel"}
                small={true}
                btnaction={() => handleCloseModal(false)}
                alternate={true}
                makefull={false}
              />
            </section>
          </form>
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
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={editSubModalOpen}
        onClose={() => handleCloseModal(false)}
      >
        <Modal.Header>Edit Sub Category</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubUpdateSubmit}
            className="w-full flex flex-col justify-start items-center mb-4"
          >
            {data && (
              <div className="w-full mb-2">
                <WeeeSelect
                  weeeinputlabel={"Category Name"}
                  value={categoryId}
                  onValueChange={setcategoryId}
                  placeholder={"Select Category..."}
                  required={true}
                  btndisabled={true}
                  small={true}
                  selectData={data.result.map((element, index) => {
                    return {
                      key: element.id,
                      label: element.name,
                    };
                  })}
                />
              </div>
            )}

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Sub Category Name"}
                value={subCategoryName}
                onValueChange={setsubCategoryName}
                placeholder={"Name"}
                inputtype={"text"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <section className="w-full flex justify-end items-center space-x-2">
              <WeeeButton
                loading={loading}
                buttonlabel={"Submit"}
                small={true}
                makefull={false}
              />
              <WeeeButton
                loading={loading}
                buttonlabel={"Cancel"}
                small={true}
                btnaction={() => handleCloseModal(false)}
                alternate={true}
                makefull={false}
              />
            </section>
          </form>
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
        </Modal.Body>
      </Modal>
    </>
  );
}
