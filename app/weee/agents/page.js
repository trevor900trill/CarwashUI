"use client";

import WeeTable from "../../sections/table";
import React, { useState, useEffect } from "react";

import { Modal, Alert } from "flowbite-react";

import { HiDotsVertical, HiInformationCircle } from "react-icons/hi";

import { Menu, MenuItem, IconButton } from "@mui/material";

import WeeeInputs from "../../sections/weeeinput";
import WeeeButton from "../../sections/weeebutton";
import WeeeSpinner from "../../sections/weeespinner";
import { fetchUsersByType, signUp } from "@/app/api/auth/auth";

export default function Agents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [firstName, setfirstName] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);

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
      handleClose();
      alert(`Edit row with id: ${rowId}`);
    };

    const handleDelete = () => {
      handleClose();
      alert(`Delete row with id: ${rowId}`);
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
      const result = await fetchUsersByType(1);
      const agents = await result.json();
      setData(agents);
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
            row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.email.toLowerCase().includes(searchQuery.toLowerCase())
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
        1
      );
      handleCloseModal(true);
    } catch (error) {
      setError(error.message);
      console.error("Create Agent error:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <section className="flex justify-start items-center flex-col flex-grow w-full rounded">
        <div className="w-full bg-white p-2 md:p-4 rounded-lg">
          <h1 className="mb-2 text-lg font-semibold">Agents</h1>
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
              buttonlabel={"Add Agent"}
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
                  field: "firstName",
                  headerName: "First Name",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "lastName",
                  headerName: "Last Name",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "userName",
                  headerName: "User Name",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "email",
                  headerName: "Email",
                  flex: 1,
                  minWidth: 150,
                },
                // {
                //   field: "phoneNumber",
                //   headerName: "Phone Number",
                //   flex: 1,
                //   minWidth: 150,
                // },
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
        <Modal.Header>Add Agent</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-start items-center mb-4"
          >
            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Email Address"}
                value={email}
                onValueChange={setemail}
                placeholder={"john.doe@company.com"}
                inputtype={"email"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"User Name"}
                value={userName}
                onValueChange={setuserName}
                placeholder={"User Name"}
                inputtype={"text"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"First Name"}
                value={firstName}
                onValueChange={setfirstName}
                placeholder={"First Name"}
                inputtype={"text"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Last Name"}
                value={lastName}
                onValueChange={setlastName}
                placeholder={"Last Name"}
                inputtype={"text"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Phone Number"}
                value={phoneNumber}
                onValueChange={setphoneNumber}
                placeholder={"Phone Number"}
                inputtype={"number"}
                required={true}
                btndisabled={loading}
                small={true}
              />
            </div>

            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Password"}
                value={password}
                onValueChange={setpassword}
                placeholder={"Password"}
                inputtype={"password"}
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
                btnaction={() => handleCloseModal(true)}
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
