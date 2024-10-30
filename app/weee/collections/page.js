"use client";

import WeeTable from "../../sections/table";
import React, { useState, useEffect } from "react";
import { Modal, Alert } from "flowbite-react";

import { HiDotsVertical, HiInformationCircle } from "react-icons/hi";

import { Menu, MenuItem, IconButton } from "@mui/material";

import WeeeInputs from "../../sections/weeeinput";
import WeeeButton from "../../sections/weeebutton";
import WeeeSpinner from "../../sections/weeespinner";
import WeeeSelect from "../../sections/weeeselect";

import {
  postCollection,
  fetchCollections,
  updateCollection,
} from "../../../app/api/collections/collections";
import { fetchRegions } from "../../../app/api/regions/regions";
import { fetchCategories } from "../../../app/api/categories/categories";

export default function Collections() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(false);
  const [data, setData] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);
  const [subcollectionCategories, setsubcollectionCategories] = useState([]);

  const [regionData, setRegionData] = useState(null);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");
  const [editError, setEditError] = useState("");

  const [collectionId, setCollectionId] = useState("");
  const [name, setName] = useState("");
  const [orderNUmber, setOrderNumber] = useState(null);
  const [weight, setWeight] = useState("");
  const [regionalOfficesId, setRegionalOfficesId] = useState("");
  const [collectionCategoryId, setcollectionCategoryId] = useState("");
  const [subcollectionCategoryId, setsubcollectionCategoryId] = useState([]);
  const [location, setLocation] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const ActionMenu = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = async () => {
      setEditModalOpen(true);
      setCollectionId(row.id);
      setName(row.name);
      setOrderNumber(row.orderNUmber);
      setWeight(row.weight);
      setRegionalOfficesId(row.regionalOfficesId);
      await loadRegionData();
    };

    const handleDelete = () => {
      setDeleteModalOpen(true);
      setCollectionId(row.id);
    };

    return (
      <div>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "action-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          size="small"
        >
          <HiDotsVertical />
        </IconButton>
        <Menu
          id="action-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "action-button",
          }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </div>
    );
  };

  async function loadData() {
    try {
      setloading(true);
      const result = await fetchCollections();
      const regions = await result.json();
      setData(regions);
    } catch (err) {
      setError(err.message);
    } finally {
      setloading(false);
    }
  }

  async function loadCategoriesData() {
    try {
      setloading(true);
      const result = await fetchCategories();
      const categories = await result.json();
      setCategoriesData(categories);
    } catch (err) {
      setError(err.message);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    loadData();
    loadCategoriesData();
  }, []);

  const filteredRows =
    data && data.result
      ? data.result.filter(
          (row) =>
            row.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.image.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.weight.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  async function loadRegionData() {
    try {
      setloading(true);
      const result = await fetchRegions();
      const regions = await result.json();
      setRegionData(regions);
    } catch (err) {
      setAddError(err.message);
    } finally {
      setloading(false);
    }
  }

  const handleOpenModal = async () => {
    setAddModalOpen(true);
    await loadRegionData();
  };

  const handleCloseModal = (shouldReload) => {
    setAddModalOpen(false);
    setAddError("");
    if (shouldReload) {
      loadData();
    }
  };

  const handleCloseEditModal = (shouldReload) => {
    setEditModalOpen(false);
    setEditError("");
    setCollectionId("");
    setName("");
    setOrderNumber(null);
    setWeight("");
    setRegionalOfficesId("");
    if (shouldReload) {
      loadData();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (error) {
        setAddError("");
      }
      setloading(true);
      await postCollection({
        name: name,
        orderNUmber: orderNUmber,
        weight: weight,
        regionalOfficesId: regionalOfficesId,
        coordinates: location,
        collectionCategoryId: collectionCategoryId,
      });
      handleCloseModal(true);
    } catch (error) {
      setAddError(error.message);
      console.error("Post Region error:", error);
    } finally {
      setloading(false);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      if (error) {
        setAddError("");
      }
      setloading(true);
      await updateCollection(
        {
          name: name,
          orderNUmber: "orderNUmber",
          weight: weight,
          regionalOfficesId: "regionalOfficesId",
        },
        collectionId
      );
      handleCloseModal(true);
    } catch (error) {
      setAddError(error.message);
      console.error("Post Region error:", error);
    } finally {
      setloading(false);
    }
  };

  const handleCategoryValueChange = (newValue) => {
    const selectedCategory = categoriesData.result.find(
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
          <h1 className="mb-2 text-lg font-semibold">Collection Centers</h1>
          <section className="flex flex-col sm:flex-row justify-center items-center w-full mb-4">
            <div className="mb-2 w-full sm:w-[30%]">
              <input
                type="search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="Search"
                required
                value={searchQuery}
                disabled={loading}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-grow" />
            <WeeeButton
              loading={false}
              buttonlabel={"Add Collection"}
              small={true}
              btnaction={() => handleOpenModal()}
              makefull={false}
            />
          </section>
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
            <WeeTable
              columns={[
                {
                  field: "name",
                  headerName: "Name",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "orderNumber",
                  headerName: "Order Number",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "createdDate",
                  headerName: "Created Date",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "weight",
                  headerName: "Weight",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "coordinates",
                  headerName: "Location",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "actions",
                  headerName: "Actions",
                  flex: 0.5,
                  minWidth: 150,
                  renderCell: (params) => <ActionMenu row={params.row} />,
                },
              ]}
              rows={filteredRows}
            />
          )}
        </div>
      </section>
      <Modal
        dismissible
        show={addModalOpen}
        onClose={() => handleCloseModal(false)}
      >
        <Modal.Header>Add Collection</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-start items-center mb-4"
          >
            {/* {regionData && (
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

            {categoriesData && (
              <div className="w-full mb-2">
                <WeeeSelect
                  weeeinputlabel={"Category Name"}
                  value={collectionCategoryId}
                  onValueChange={handleCategoryValueChange}
                  placeholder={"Select Category..."}
                  required={true}
                  btndisabled={loading}
                  small={true}
                  selectData={categoriesData.result.map((element, index) => {
                    return {
                      key: element.id,
                      label: element.name,
                    };
                  })}
                />
              </div>
            )}

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

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Weight (Kg)"}
                value={weight}
                onValueChange={setWeight}
                placeholder={"Weight (Kg)"}
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
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="user_avatar"
              >
                Upload file
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
              />
              <div
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="user_avatar_help"
              >
                A picture of the collected item.
              </div>
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
        show={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <Modal.Header>Edit Collection</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleEditSubmit}
            className="w-full flex flex-col justify-start items-center mb-4"
          >
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
            )}

            {categoriesData && (
              <div className="w-full mb-2">
                <WeeeSelect
                  weeeinputlabel={"Category Name"}
                  value={collectionCategoryId}
                  onValueChange={setcollectionCategoryId}
                  placeholder={"Select Category..."}
                  required={true}
                  btndisabled={loading}
                  small={true}
                  selectData={categoriesData.result.map((element, index) => {
                    return {
                      key: element.id,
                      label: element.regionName,
                    };
                  })}
                />
              </div>
            )}

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

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Order Number"}
                value={orderNUmber}
                onValueChange={setOrderNumber}
                placeholder={"Order Number"}
                inputtype={"number"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Weight"}
                value={weight}
                onValueChange={setWeight}
                placeholder={"Weight"}
                inputtype={"text"}
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
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="user_avatar"
              >
                Upload file
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
              />
              <div
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="user_avatar_help"
              >
                A profile picture is useful to confirm your are logged into your
                account
              </div>
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
                btnaction={() => handleCloseEditModal(false)}
                alternate={true}
                makefull={false}
              />
            </section>
          </form>
          {editError && (
            <Alert
              color="failure"
              icon={HiInformationCircle}
              onDismiss={() => setEditError("")}
            >
              <span className="font-medium">Error! </span>
              {editError}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <Modal.Header>Delete Collection</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Collection?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
              btnaction={() => setDeleteModalOpen(false)}
              alternate={true}
              makefull={false}
            />
          </section>
        </Modal.Footer>
      </Modal>
    </>
  );
}
