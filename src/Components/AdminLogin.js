import React, { useState, useEffect } from "react";
import { 
  Users, 
  Lock, 
  ShieldCheck, 
  LogIn 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();
  const [login, setLogin] = useState({
    name: "",
    role: "",
    password: "",
  });
  const [logindata, setLoginData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    type: null,
    message: ""
  });

  // Notification display duration
  useEffect(() => {
    let timer;
    if (notification.message) {
      timer = setTimeout(() => {
        setNotification({ type: null, message: "" });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    const fetchAdminLogins = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://frontend-assignment-backend.onrender.com/adminlogin");
        if (!response.ok) {
          throw new Error("Failed to fetch admin login");
        }
        const data = await response.json();
        const normalizedData = data.map((role) => ({
          ...role,
          id: String(role.id),
        }));
        setLoginData(normalizedData);
      } catch (error) {
        setNotification({
          type: "error",
          message: `Failed to load users: ${error.message}`
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminLogins();
  }, []);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setLogin(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!login.name || !login.role || !login.password) {
      setNotification({
        type: "error",
        message: "Please fill all the fields"
      });
      return;
    }

    const validUser = logindata.find(
      (user) =>
        user.name === login.name &&
        user.role === login.role &&
        user.password === login.password
    );

    if (validUser) {
        localStorage.setItem('name',login.name);
        localStorage.setItem('jwtToken',validUser.jwtToken);
      setNotification({
        type: "success",
        message: "Login successful"
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      
    } else {
      setNotification({
        type: "error",
        message: "Unauthorized access or incorrect credentials"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Notification Banner */}
      {notification.message && (
        <div 
          className={`fixed top-0 left-0 w-full p-4 text-center z-50 
            ${notification.type === 'error' 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
            }`}
        >
          {notification.message}
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
            <ShieldCheck 
              className="mx-auto h-12 w-auto text-blue-600" 
              strokeWidth={1.5} 
            />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            noValidate
          >
            {/* Name Input */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users 
                    className="h-5 w-5 text-gray-400" 
                    aria-hidden="true" 
                  />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={login.name}
                  onChange={handleInput}
                  placeholder="Enter your name"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    sm:text-sm transition duration-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock 
                    className="h-5 w-5 text-gray-400" 
                    aria-hidden="true" 
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={login.password}
                  onChange={handleInput}
                  placeholder="Enter your password"
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    sm:text-sm transition duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-gray-400" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-gray-400" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label 
                htmlFor="role" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  required
                  value={login.role}
                  onChange={handleInput}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    sm:text-sm appearance-none transition duration-300"
                >
                  <option value="">Select a role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg 
                    className="fill-current h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center space-x-4">
              <button
                type="button"
                onClick={() => {
                  // Placeholder for cancel action
                  console.log("Cancel clicked");
                }}
                className="w-full text-gray-600 py-2 px-4 border border-gray-300 rounded-md 
                  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:ring-offset-2 transition duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <svg 
                    className="animate-spin h-5 w-5 mr-3" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Login
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Optional: Privacy and Help Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <a 
            href="#" 
            className="hover:text-blue-500 transition duration-300"
          >
            Forgot Password?
          </a>
          <span className="mx-2">|</span>
          <a 
            href="#" 
            className="hover:text-blue-500 transition duration-300"
          >
            Need Help?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
