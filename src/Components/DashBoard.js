import React, { useEffect, useState } from "react";
import {
  Menu,
  Users,
  Shield,
  Key,
  Bell,
  Search,
  Settings,
  X,
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
const DashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [roledata, setRoledata] = useState([]);
  const [permissiondata, setpermissiondata] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:5000/users").then((response) => response.json()),
      fetch("http://localhost:5000/roles").then((response) => response.json()),
      fetch("http://localhost:5000/permissions").then((response) => response.json()),
    ])
      .then(([users, roles,permissions]) => {
        setUserdata(users);
        setRoledata(roles);
        setpermissiondata(permissions)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Stats Cards */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <p className="text-xl sm:text-2xl font-bold">
                {userdata.length} {/* Display total users */}
              </p>
            )}

            {/* <p className="text-xl sm:text-2xl font-bold">{data.length}</p> */}
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Active Roles</h3>
            <p className="text-xl sm:text-2xl font-bold">{roledata.length}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Permissions</h3>
            <p className="text-xl sm:text-2xl font-bold">{permissiondata.length}</p>
          </div>
        </div>

        {/* Content Placeholder */}
        <div className="mt-6 bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {userdata.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-3 border rounded"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0"></div>
                <div className="ml-4 min-w-0">
                  <p className="text-sm font-medium truncate">
                    User Action {item.name}
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
