import React, { useState, useEffect } from "react";
import {
  Menu,
  Users,
  Shield,
  Key,
  Bell,
  Search,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Layout = () => {
  const Navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [Logged, setLogged] = useState();

  useEffect(() => {
    setLogged(localStorage.getItem("name"));
  });
  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("jwtToken");

    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      Navigate("/login");
    }, 1000);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static w-64 bg-white shadow-lg h-full z-30
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">RBAC Admin</h1>
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "active" : "text-gray-700"
              }
            >
              <div className="flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 cursor-pointer">
                <Menu className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </div>
            </NavLink>

            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive ? "active" : "text-gray-700"
              }
            >
              <div className="flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 cursor-pointer">
                <Users className="w-5 h-5 mr-3" />
                User
              </div>
            </NavLink>

            <NavLink
              to="/role"
              className={({ isActive }) =>
                isActive ? "active" : "text-gray-700"
              }
            >
              <div className="flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 cursor-pointer">
                <Shield className="w-5 h-5 mr-3" />
                Role
              </div>
            </NavLink>

            <NavLink
              to="/permission"
              className={({ isActive }) =>
                isActive ? "active" : "text-gray-700"
              }
            >
              <div className="flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 cursor-pointer">
                <Key className="w-5 h-5 mr-3" />
                Permission
              </div>
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                className="p-2 rounded-full hover:bg-gray-100 lg:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center bg-gray-100 rounded-lg p-2 ml-2">
                <Search className="w-5 h-5 text-gray-500 min-w-[20px]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none ml-2 w-full max-w-[120px] sm:max-w-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-end">
              {Logged && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 hidden sm:inline">
                    Welcome: {Logged}
                  </span>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center px-3 py-2 text-red-500 hover:text-red-600 font-medium border border-red-500 rounded-lg hover:border-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
