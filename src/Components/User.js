import React, { useEffect, useState } from "react";
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
import { Form } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
  const [ToggleUser, setToggleuser] = useState(false);
  const [user, setuser] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });
  const [users, setUsers] = useState([]);
  const [edit, setedit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const handleAdduser = () => {
    setToggleuser(true);
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("http://localhost:5000/users")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch users");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       // Ensure all IDs are strings for consistency
  //       const normalizedData = data.map((user) => ({
  //         ...user,
  //         id: String(user.id),
  //       }));

  //       const filteredUsers = normalizedData.filter((user) => {
  //         const matchesRole =
  //           selectedRole === "All Roles" || user.role === selectedRole;
  //         const matchesStatus =
  //           selectedStatus === "All Status" || user.status === selectedStatus;
  //         return matchesRole && matchesStatus;
  //       });
  //       setUsers(filteredUsers);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       toast.error("Failed to load users: " + error.message);
  //       setIsLoading(false);
  //     });
  // }, [selectedRole, selectedStatus]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();

      // Normalize the data and apply filters
      const normalizedData = data.map((user) => ({
        ...user,
        id: String(user.id),
      }));

      const filteredUsers = normalizedData.filter((user) => {
        const matchesRole =
          selectedRole === "All Roles" || user.role === selectedRole;
        const matchesStatus =
          selectedStatus === "All Status" || user.status === selectedStatus;
        return matchesRole && matchesStatus;
      });

      setUsers(filteredUsers);
    } catch (error) {
      toast.error("Failed to load users: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedRole, selectedStatus]);

  const inputdata = (e) => {
    const { name, value } = e.target;
    setuser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // const hanlderSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     if (!user.name || !user.email || !user.role || !user.status) {
  //       // toast.error("Please fill in all fields");
  //       toast.error("Please fill in all fields", {
  //         position: "top-right",
  //         autoClose: 2000,
  //       });
  //       return;
  //     }

  //     if (edit) {
  //       const response = await fetch(`http://localhost:5000/users/${edit}`, {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           ...user,
  //           id: edit, // Ensure ID is included in the update
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Failed to update user: ${response.statusText}`);
  //       }

  //       const updatedUser = await response.json();
  //       setUsers((prevUsers) =>
  //         prevUsers.map((item) => (item.id === edit ? updatedUser : item))
  //       );
  //       // toast.success("User updated successfully");
  //       toast.success("User updated successfully", {
  //         position: "top-right",
  //         autoClose: 2000,
  //       });
  //     } else {
  //       const newUser = { ...user, id: Date.now() };
  //       const response = await fetch("http://localhost:5000/users", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(newUser),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Failed to create user: ${response.statusText}`);
  //       }

  //       const createdUser = await response.json();
  //       setUsers([...users, createdUser]);
  //       // toast.success("User added successfully");
  //       toast.success("User added successfully", {
  //         position: "top-right",
  //         autoClose: 2000,
  //       });
  //     }

  //     setuser({ name: "", email: "", role: "", status: "" });
  //     setedit(null);
  //     setTimeout(() => setToggleuser(false), 1000);
  //   } catch (error) {
  //     // toast.error(error.message);
  //     toast.error(`error ${error.message}`, {
  //       position: "top-right",
  //       autoClose: 2000,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleEdit = async (id) => {
  //   setIsLoading(true);
  //   try {
  //     // Convert id to string for comparison
  //     const stringId = String(id);

  //     // First try to find the user in the existing state
  //     const existingUser = users.find((u) => String(u.id) === stringId);

  //     if (existingUser) {
  //       // If we have the user in state, use that data
  //       setuser({
  //         name: existingUser.name,
  //         email: existingUser.email,
  //         role: existingUser.role,
  //         status: existingUser.status,
  //       });
  //       setedit(stringId);
  //       setToggleuser(true);
  //     } else {
  //       // If not in state, try to fetch from server
  //       const response = await fetch(`http://localhost:5000/users/${id}`);
  //       if (!response.ok) {
  //         throw new Error(`User not found (ID: ${id})`);
  //       }
  //       const data = await response.json();
  //       setuser({
  //         name: data.name,
  //         email: data.email,
  //         role: data.role,
  //         status: data.status,
  //       });
  //       setedit(stringId);
  //       setToggleuser(true);
  //     }
  //   } catch (error) {
  //     console.error("Error editing user:", error);
  //     toast.error(`error ${error.message}`, {
  //       position: "top-right",
  //       autoClose: 2000,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user.name || !user.email || !user.role || !user.status) {
        toast.error("Please fill in all fields", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }

      const url = edit
        ? `http://localhost:5000/users/${edit}`
        : "http://localhost:5000/users";

      const method = edit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...user,
          id: edit || Date.now().toString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${edit ? "update" : "create"} user`);
      }

      // Refresh the users list after successful submission
      await fetchUsers();

      toast.success(`User ${edit ? "updated" : "added"} successfully`, {
        position: "top-right",
        autoClose: 2000,
      });

      // Reset form and state
      setuser({ name: "", email: "", role: "", status: "" });
      setedit(null);
      setToggleuser(false);
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setIsLoading(true);
    try {
      const stringId = String(id);
      const response = await fetch(`http://localhost:5000/users/${stringId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch user (ID: ${stringId})`);
      }

      const userData = await response.json();
      setuser({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: userData.status,
      });
      setedit(stringId);
      setToggleuser(true);
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this permission?"))
  //     return;
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`http://localhost:5000/users/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete user");
  //     }

  //     setUsers(users.filter((user) => String(user.id) !== String(id)));
  //     toast.success("Role deleted successfully", {
  //       position: "top-right",
  //       autoClose: 2000,
  //     });
  //   } catch (error) {
  //     toast.error(`error ${error.message}`, {
  //       position: "top-right",
  //       autoClose: 2000,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setIsLoading(true);

    try {
      const stringId = String(id);
      const response = await fetch(`http://localhost:5000/users/${stringId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user (ID: ${stringId})`);
      }

      // Refresh the users list after successful deletion
      await fetchUsers();

      toast.success("User deleted successfully", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Management</h2>
          <button
            onClick={handleAdduser}
            disabled={isLoading}
            className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
        {!ToggleUser ? (
          <>
            <div className="flex flex-col items-center gap-4">
              {/* Filters Section */}
              <div className="flex flex-col gap-4 items-start bg-white p-4 rounded-lg shadow w-full">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm w-full md:w-auto"
                  >
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>User</option>
                    <option>Manager</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm w-full md:w-auto"
                  >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <button
                    onClick={() => {
                      setSelectedRole("All Roles");
                      setSelectedStatus("All Status");
                    }}
                    className="bg-gray-200 px-4 py-2 rounded-lg mt-2"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Table Section */}
              {/* Table Section */}
              {!isLoading && users.length === 0 && (
                <p className="text-gray-500 text-center">No users available.</p>
              )}
              <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((item) => (
                      <tr key={item} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="ml-4">
                              <div className="text-sm font-medium">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {item.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {/* Edit Button */}
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Edit
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h3 className="text-lg font-bold mb-4">Add New User</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={user.name}
                    onChange={(e) => inputdata(e)}
                    placeholder="Enter user's name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    required
                    onChange={(e) => inputdata(e)}
                    placeholder="Enter user's email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Role Field */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    required
                    name="role"
                    value={user.role}
                    onChange={(e) => inputdata(e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select a role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                {/* Status Field */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    required
                    name="status"
                    value={user.status}
                    onChange={(e) => inputdata(e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select a status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-between align-center">
                  <button
                    type="button"
                    onClick={() => setToggleuser(false)}
                    className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {edit ? "Update User" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default User;
