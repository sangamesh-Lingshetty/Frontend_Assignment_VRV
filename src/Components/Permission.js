import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function Permission() {
  const [permissionsData, setPermissionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddPermissionMode, setIsAddPermissionMode] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [input, setInput] = useState({
    name: "",
    description: "", // Added description
    access_level: "", // Added access level
  });

  // Fetch Permissions
  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/permissions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch permissions");
        return res.json();
      })
      .then((data) => {
        const normalizedData = data.map((permission) => ({
          ...permission,
          id: String(permission.id),
        }));
        setPermissionsData(normalizedData);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`Failed to load permissions: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
        setIsLoading(false);
      });
  };

  // Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Permission
  const submitPermission = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const method = editingPermission ? "PUT" : "POST";
    const url = editingPermission
      ? `http://localhost:5000/permissions/${editingPermission.id}`
      : "http://localhost:5000/permissions";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save permission");
        return res.json();
      })
      .then((data) => {
        if (editingPermission) {
          // Update existing permission
          setPermissionsData((prev) =>
            prev.map((perm) => (perm.id === data.id ? data : perm))
          );
          toast.success("Permission updated successfully", {
            position: "top-right",
            autoClose: 2000,
          });

        } else {
          // Add new permission
          setPermissionsData((prev) => [...prev, data]);
           toast.success("Permission Created successfully", {
            position: "top-right",
            autoClose: 2000,
          });
        }

        // Reset form
        setInput({ name: "", description: "", access_level: "" });
        setIsAddPermissionMode(false);
        setEditingPermission(null);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.success(`Failed to save permission: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
        setIsLoading(false);
      });
  };

  // Delete Permission
  const deletePermission = (permissionId) => {
    if (!window.confirm("Are you sure you want to delete this permission?"))
      return;

    setIsLoading(true);
    fetch(`http://localhost:5000/permissions/${permissionId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete permission");

        setPermissionsData((prev) =>
          prev.filter((perm) => perm.id !== permissionId)
        );
       
        toast.success("Permission deleted successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`Failed to delete permission: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
        setIsLoading(false);
      });
  };

  // Edit Permission
  const editPermission = (permission) => {
    setEditingPermission(permission);
    setInput({
      name: permission.name,
      description: permission.description || "",
      access_level: permission.access_level || "",
    });
    setIsAddPermissionMode(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Permission Management</h2>
        <button
          onClick={() => {
            setIsAddPermissionMode(true);
            setEditingPermission(null);
            setInput({ name: "", description: "", access_level: "" });
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Permission
        </button>
      </div>

      {isAddPermissionMode ? (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h3 className="text-lg font-bold mb-4">
            {editingPermission ? "Edit Permission" : "Add New Permission"}
          </h3>
          <form onSubmit={submitPermission} className="space-y-4">
            {/* Name Field */}
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
                value={input.name}
                onChange={handleInputChange}
                placeholder="Enter Permission name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                placeholder="Enter Permission description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>

            {/* Access Level Field */}
            <div>
              <label
                htmlFor="access_level"
                className="block text-sm font-medium text-gray-700"
              >
                Access Level
              </label>
              <select
                id="access_level"
                name="access_level"
                value={input.access_level}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              >
                <option value="">Select Access Level</option>
                <option value="read">Read</option>
                <option value="write">Write</option>
                <option value="delete">Delete</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsAddPermissionMode(false)}
                className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 ${
                  isLoading ? "bg-gray-400" : "bg-blue-600"
                } text-white font-medium rounded-lg shadow`}
              >
                {editingPermission ? "Update Permission" : "Add Permission"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Permission Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Access Level
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {permissionsData.map((permission) => (
                <tr key={permission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">
                    {permission.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {permission.description || "No description"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {permission.access_level || "Not specified"}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => editPermission(permission)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deletePermission(permission.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isLoading && permissionsData.length === 0 && (
            <p className="text-gray-500 text-center">
              No permissions available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
