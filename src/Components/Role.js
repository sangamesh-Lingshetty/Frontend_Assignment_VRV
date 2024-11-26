import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Menu,
  Users,
  Shield,
  Key,
  Bell,
  Search,
  Settings,
  Plus,
  Filter,
  MoreVertical,
} from "lucide-react";

export default function Role() {
  const [openBtn, setopenBtn] = useState(false);
  const [role, setrole] = useState({
    name: "",
    permissions: [],
  });

  const [roles, setroles] = useState([]);
  const [edit, setedit] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  const permissionsList = ["Read", "Write", "Delete", "Update"];

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  // Separate function to fetch roles
  const fetchRoles = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/roles")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch roles");
        return res.json();
      })
      .then((data) => {
        // Ensure all IDs are strings for consistency
        const normalizedData = data.map((role) => ({
          ...role,
          id: String(role.id),
        }));
        setroles(normalizedData);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`Failed to load roles: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
        setIsLoading(false);
      });
  };

  // Handle input changes for role name and permissions
  const inputdata = (e) => {
    const { name, value, checked } = e.target;

    if (name === "permissions") {
      setrole((prevState) => {
        // Add or remove the permission based on checkbox state
        const updatePermissions = checked
          ? [...prevState.permissions, value]
          : prevState.permissions.filter((permiss) => permiss !== value);

        return {
          ...prevState,
          permissions: updatePermissions,
        };
      });
    } else {
      setrole((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleroleBtn = () => {
    setopenBtn(true);
    setedit(null);
    setrole({ name: "", permissions: [] });
  };


  const hanlderoleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!role.name || role.permissions.length === 0) {
        // toast.error("Please fill in all fields");
        toast.error("Please fill in all fields:", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }

      const payload = {
        name: role.name,
        permissions: role.permissions,
      };

      if (edit) {
        // Editing an existing role
        const response = await fetch(`http://localhost:5000/roles/${edit}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: edit,
            ...payload,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to update role: ${errorText}`);
        }

        const updatedRole = await response.json();

        // Update roles state with the updated role
        setroles((prevRoles) =>
          prevRoles.map((r) =>
            String(r.id) === String(edit)
              ? { ...updatedRole, id: String(updatedRole.id) }
              : r
          )
        );

        
        toast.success("Role updated successfully:", {
          position: "top-right",
          autoClose: 2000,
        });
        
      } else {
        // Creating a new role
        const response = await fetch("http://localhost:5000/roles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to create role: ${errorText}`);
        }

        const createdRole = await response.json();

        // Add the new role to the list, ensuring string ID
        setroles((prevRoles) => [
          ...prevRoles,
          { ...createdRole, id: String(createdRole.id) },
        ]);

        toast.success("Role updated successfully:", {
          position: "top-right",
          autoClose: 2000,
        });
        
      }

      // Reset form state
      setrole({ name: "", permissions: [] });
      setopenBtn(false);
      setedit(null);

    } catch (error) {
      toast.error(`Error :  ${error.message} :`, {
        position: "top-right",
        autoClose: 2000,
      });

    } finally {
      setIsLoading(false);
    }
  };
 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`http://localhost:5000/roles/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete role: ${errorText}`);
      }
  
      // Remove the deleted role from the list
      setroles(prevRoles => 
        prevRoles.filter(role => String(role.id) !== String(id))
      );
  
      toast.success("Role delete successfully:", {
        position: "top-right",
        autoClose: 2000,
      });
      
    } catch (error) {
      toast.error(`failes to delelte role :  ${error.message} :`, {
        position: "top-right",
        autoClose: 2000,
      });
      
    } finally {
      setIsLoading(false);
    }
  };


  // State to manage dropdown menu toggle
  const [Toggle, setToggle] = useState(null);

  // Toggle dropdown menu for a specific role
  const toggleMenu = (id) => {
    setToggle((prev) => (prev === id ? null : id));
  };

  // Prepare role for editing
  const handleEdit = (selectedRole) => {
    setrole({
      name: selectedRole.name,
      permissions: selectedRole.permissions,
    });
    setedit(selectedRole.id);
    setopenBtn(true);
    setToggle(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Role button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <button
          onClick={handleroleBtn}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </button>
      </div>

      {/* No roles message */}
      {!IsLoading && roles.length === 0 && (
        <p className="text-gray-500 text-center">No roles available.</p>
      )}

      {/* Roles List or Form */}
      {!openBtn ? (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div
              key={String(role.id)}
              className="relative bg-white p-6 rounded-lg shadow space-y-4"
            >
              {/* Role details */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{role.name}</h3>
                  <p className="text-sm text-gray-500">
                    {role.permissions.length} permissions assigned
                  </p>
                </div>

                {/* Dropdown menu */}
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(role.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {Toggle === role.id && (
                    <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg p-2 w-32 z-10">
                      <button
                        onClick={() => handleEdit(role)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(role.id);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Permissions:</div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Role Creation/Edit Form
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h3 className="text-lg font-bold mb-4">
            {edit ? "Edit Role" : "Add New Role"}
          </h3>
          <form onSubmit={hanlderoleSubmit} className="space-y-4">
            {/* Role Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={role.name}
                onChange={inputdata}
                placeholder="Enter Role name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Permissions Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Permissions
              </label>
              <div className="mt-2">
                {permissionsList.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={permission}
                      name="permissions"
                      value={permission}
                      checked={role.permissions.includes(permission)}
                      onChange={inputdata}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor={permission} className="text-sm">
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setopenBtn(false)}
                className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={IsLoading}
                className={`px-4 py-2 ${
                  IsLoading ? "bg-gray-400" : "bg-blue-600"
                } text-white font-medium rounded-lg shadow`}
              >
                {edit ? "Update Role" : "Add Role"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
