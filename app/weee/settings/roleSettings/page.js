"use client";

import React, { useState, useRef, useEffect } from "react";
import { Modal, Alert } from "flowbite-react";

import { HiDotsVertical, HiInformationCircle } from "react-icons/hi";

import { Menu, MenuItem, IconButton } from "@mui/material";

import WeeTable from "../../../sections/table";
import WeeeInputs from "../../../sections/weeeinput";
import WeeeButton from "../../../sections/weeebutton";
import WeeeSpinner from "../../../sections/weeespinner";

import {
  postRole,
  fetchAllRoles,
  deleteRole,
  updateRole,
} from "../../../../app/api/settings/roles";

export default function RoleSettings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");

  const [roleName, setRoleName] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
      const result = await fetchAllRoles();
      const roles = await result.json();
      setData(roles);
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
      ? data.result.filter((row) =>
          row.roleName.toLowerCase().includes(searchQuery.toLowerCase())
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
      await postRole({
        roleName: roleName,
      });
      handleCloseModal(true);
    } catch (error) {
      setAddError(error.message);
      console.error("Post Role error:", error);
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
      await updateRole({
        roleName: roleName,
      });
      handleCloseModal(true);
    } catch (error) {
      setAddError(error.message);
      console.error("Edit Role error:", error);
    } finally {
      setloading(false);
    }
  };

  const handleDeleteSubmit = async (id) => {
    try {
      if (error) {
        setAddError("");
      }
      setloading(true);
      await deleteRole(id);
      handleCloseModal(true);
    } catch (error) {
      setAddError(error.message);
      console.error("Delete Role error:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <section className="flex justify-start items-center flex-col flex-grow w-full rounded">
        <div className="w-full bg-white rounded-lg">
          <h1 className="mb-2 text-lg font-semibold">Role Settings</h1>
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
              buttonlabel={"Add Role"}
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
                  field: "roleName",
                  headerName: "Role Name",
                  flex: 1,
                  minWidth: 200,
                },
                {
                  field: "actions",
                  headerName: "Actions",
                  flex: 1,
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
        <Modal.Header>Add Role</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-start items-center mb-4"
          >
            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Role Name"}
                value={roleName}
                onValueChange={setRoleName}
                placeholder={"Role Name"}
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
        show={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <Modal.Header>Edit Role</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleEditSubmit}
            className="w-full flex flex-col justify-start items-center mb-4"
          >
            <div className="w-full mb-2">
              <WeeeInputs
                weeeinputlabel={"Role Name"}
                value={roleName}
                onValueChange={setRoleName}
                placeholder={"Role Name"}
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
                btnaction={() => setEditModalOpen(false)}
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
        show={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <Modal.Header>Delete Role</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Role?
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
              btnaction={() => handleDeleteSubmit("id")}
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
