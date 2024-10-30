"use client";

import WeeTable from "../../sections/table";
import React, { useState, useRef, useEffect } from "react";
import { Modal, Alert } from "flowbite-react";

import { HiDotsVertical, HiInformationCircle } from "react-icons/hi";

import { Menu, MenuItem, IconButton } from "@mui/material";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import WeeeInputs from "../../sections/weeeinput";
import WeeeButton from "../../sections/weeebutton";
import WeeeSpinner from "../../sections/weeespinner";
import { postRegion, fetchRegions } from "../../../app/api/regions/regions";

export default function Regions() {
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const mapRef = useRef(null);

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");

  const [regionName, setRegionName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [location, setLocation] = useState("");
  const [center, setCenter] = useState({ lat: 1.3107, lng: 36.825 });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setCenter({ lat: newLat, lng: newLng });
  };

  const ActionMenu = ({ rowId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = () => {
      setEditModalOpen(true);
    };

    const handleDelete = () => {
      setDeleteModalOpen(true);
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
      const result = await fetchRegions();
      const regions = await result.json();
      setData(regions);
    } catch (err) {
      setError(err.message);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredRows =
    data && data.result
      ? data.result.filter(
          (row) =>
            row.regionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.locationCoordinates
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : [];

  const handleCloseModal = (shouldReload) => {
    setAddModalOpen(false);
    setAddError("");
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
      await postRegion({
        regionName: regionName,
        email: email,
        phoneNumber: phoneNumber,
        locationCoordinates: location,
        latitude: center.lat.toString(),
        longitude: center.lng.toString(),
      });
      handleCloseModal(true);
    } catch (error) {
      setAddError(error.message);
      console.error("Post Region error:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <section className="flex justify-start items-center flex-col flex-grow w-full rounded">
        <div className="w-full bg-white p-2 md:p-4 rounded-lg">
          <h1 className="mb-2 text-lg font-semibold">Regional Centers</h1>
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
              buttonlabel={"Add Region"}
              small={true}
              btnaction={() => setAddModalOpen(true)}
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
                  field: "regionName",
                  headerName: "Region Name",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "email",
                  headerName: "Email",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "phoneNumber",
                  headerName: "Phone Number",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "locationCoordinates",
                  headerName: "Location",
                  flex: 1,
                  minWidth: 150,
                },
                {
                  field: "actions",
                  headerName: "Actions",
                  flex: 0.5,
                  minWidth: 150,
                  renderCell: (params) => <ActionMenu rowId={params.row.id} />,
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
        <Modal.Header>Add Region Office</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-start items-center mb-4"
          >
            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Region Name"}
                value={regionName}
                onValueChange={setRegionName}
                placeholder={"Region Name"}
                inputtype={"text"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Email address"}
                value={email}
                onValueChange={setEmail}
                placeholder={"john.doe@company.com"}
                inputtype={"email"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Phone Number"}
                value={phoneNumber}
                onValueChange={setPhoneNumber}
                placeholder={"Phone Number"}
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

            <div className="w-full grid grid-cols-2 gap-4 mb-4">
              <WeeeInputs
                weeeinputlabel={"Latitude"}
                value={center.lat}
                placeholder={"Latitude"}
                inputtype={"text"}
                required={false}
                btndisabled={true}
                small={true}
              />
              <WeeeInputs
                weeeinputlabel={"Longitude"}
                value={center.lng}
                placeholder={"Longitude"}
                inputtype={"text"}
                required={false}
                btndisabled={true}
                small={true}
              />
            </div>

            <div className="w-full h-40 rounded mb-4">
              <LoadScript googleMapsApiKey="AIzaSyDTAWQ2aQW3a4ZiPTR0c2VZ_EaHk-TUTZI">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={8}
                  onLoad={onMapLoad}
                  // onCenterChanged={handleCenterChanged}
                  onClick={handleMapClick}
                  className="rounded-lg max-h-80 flex justify-center items-center"
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
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
        <Modal.Header>Edit Region</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Edit Region Fields
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
              btnaction={() => setEditModalOpen(false)}
              alternate={true}
              makefull={false}
            />
          </section>
        </Modal.Footer>
      </Modal>
      <Modal
        dismissible
        show={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <Modal.Header>Delete Region</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Region?
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
